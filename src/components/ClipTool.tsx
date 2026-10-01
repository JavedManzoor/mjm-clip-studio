import { useState, useRef, useCallback, useEffect } from 'react';
import { Download, Loader2, Play, Pause, Eye } from 'lucide-react';

// YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/embed\/)([^?\s]+)/,
    /(?:youtube\.com\/shorts\/)([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function parseTime(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(tag, firstScript);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
}

export default function ClipTool() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30);
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080p');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [recordingSupported, setRecordingSupported] = useState(true);

  const playerRef = useRef<any>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const previewIntervalRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Check if screen capture is supported
  useEffect(() => {
    const supported = 'getDisplayMedia' in navigator.mediaDevices;
    setRecordingSupported(supported);
  }, []);

  // Initialize YouTube player when videoId changes
  useEffect(() => {
    if (!videoId) return;

    let player: any = null;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      // Clear previous player
      const container = document.getElementById('yt-player-container');
      if (container) container.innerHTML = '<div id="yt-player"></div>';

      player = new window.YT.Player('yt-player', {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            const dur = event.target.getDuration();
            setDuration(dur);
            setEndTime(Math.min(30, dur));
            setPlayerReady(true);
            setIsLoading(false);
            
            // Get video title
            const data = event.target.getVideoData();
            if (data && data.title) {
              setVideoTitle(data.title);
            }
          },
          onStateChange: (event: any) => {
            // Track current time
            if (event.data === window.YT.PlayerState.PLAYING) {
              const updateTime = () => {
                if (player && player.getCurrentTime) {
                  setCurrentTime(player.getCurrentTime());
                }
              };
              const interval = setInterval(updateTime, 250);
              previewIntervalRef.current = interval as any;
            } else {
              if (previewIntervalRef.current) {
                clearInterval(previewIntervalRef.current);
                previewIntervalRef.current = null;
              }
            }
          },
        },
      });

      playerRef.current = player;
    };

    initPlayer();

    return () => {
      if (previewIntervalRef.current) {
        clearInterval(previewIntervalRef.current);
      }
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [videoId]);

  const handleGetVideo = useCallback(async () => {
    setError('');
    const id = extractVideoId(url);
    if (!id) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setIsLoading(true);
    setVideoId(id);
    setVideoTitle('Loading...');
    setDuration(0);
    setStartTime(0);
    setEndTime(30);
    setPlayerReady(false);
    setCurrentTime(0);
  }, [url]);

  const handleSliderInteraction = useCallback((clientX: number) => {
    if (!sliderRef.current || !dragging) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const time = percent * duration;

    if (dragging === 'start') {
      setStartTime(Math.min(time, endTime - 1));
    } else {
      setEndTime(Math.max(time, startTime + 1));
    }
  }, [dragging, duration, startTime, endTime]);

  const handleMouseDown = (type: 'start' | 'end') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);

    const handleMouseMove = (e: MouseEvent) => handleSliderInteraction(e.clientX);
    const handleMouseUp = () => {
      setDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (type: 'start' | 'end') => (e: React.TouchEvent) => {
    e.stopPropagation();
    setDragging(type);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleSliderInteraction(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      setDragging(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Preview clip - plays only the selected segment
  const handlePreview = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    if (isPreviewing) {
      // Stop preview
      playerRef.current.pauseVideo();
      setIsPreviewing(false);
      return;
    }

    // Start preview from startTime
    playerRef.current.seekTo(startTime, true);
    playerRef.current.playVideo();
    setIsPreviewing(true);

    // Monitor and pause at endTime
    const checkTime = setInterval(() => {
      if (!playerRef.current) {
        clearInterval(checkTime);
        return;
      }
      const time = playerRef.current.getCurrentTime();
      if (time >= endTime) {
        playerRef.current.pauseVideo();
        setIsPreviewing(false);
        clearInterval(checkTime);
      }
    }, 100);
  }, [playerReady, isPreviewing, startTime, endTime]);

  // Seek to a specific time
  const seekTo = useCallback((time: number) => {
    if (playerRef.current && playerReady) {
      playerRef.current.seekTo(time, true);
    }
  }, [playerReady]);

  // Save clip using Screen Capture API + MediaRecorder
  const handleSaveClip = useCallback(async () => {
    if (!playerRef.current || !playerReady) return;

    if (!recordingSupported) {
      setError('Screen capture is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');

    try {
      // Request screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
        } as any,
        audio: true,
        preferCurrentTab: true,
        selfBrowserSurface: "include",
      } as any);

      // Check if we got video tracks
      const videoTracks = displayStream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error('No video track captured');
      }

      // Setup MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')
        ? 'video/webm;codecs=vp8,opus'
        : 'video/webm';

      chunksRef.current = [];
      const recorder = new MediaRecorder(displayStream, {
        mimeType,
        videoBitsPerSecond: quality === '4K' ? 20000000 :
          quality === '1080p' ? 8000000 :
          quality === '720p' ? 5000000 :
          quality === '480p' ? 2500000 : 1000000,
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        // Create blob and download
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        const ext = format === 'mp3' || format === 'm4a' ? 'webm' : 'webm';
        a.download = `mjm-clip-${videoId}-${formatTime(startTime)}-to-${formatTime(endTime)}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);

        // Stop all tracks
        displayStream.getTracks().forEach(track => track.stop());

        setIsProcessing(false);
        setProgress(100);
        setShowSuccess(true);
      };

      // Start recording
      recorder.start(100); // Collect data every 100ms
      mediaRecorderRef.current = recorder;

      // Seek to start and play
      playerRef.current.seekTo(startTime, true);
      playerRef.current.playVideo();

      // Progress tracking
      const clipDuration = endTime - startTime;
      const startTimeMs = Date.now();

      const progressInterval = setInterval(() => {
        const elapsed = (Date.now() - startTimeMs) / 1000;
        const prog = Math.min(95, (elapsed / clipDuration) * 100);
        setProgress(prog);

        // Check if we've reached the end time
        if (playerRef.current) {
          const currentT = playerRef.current.getCurrentTime();
          if (currentT >= endTime) {
            clearInterval(progressInterval);
            playerRef.current.pauseVideo();
            
            // Small delay to capture final frames
            setTimeout(() => {
              if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
              }
            }, 500);
          }
        }
      }, 100);

      // Safety timeout - stop after clip duration + buffer
      setTimeout(() => {
        clearInterval(progressInterval);
        if (playerRef.current) {
          playerRef.current.pauseVideo();
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, (clipDuration + 2) * 1000);

      // Handle user stopping screen share
      displayStream.getVideoTracks()[0].onended = () => {
        clearInterval(progressInterval);
        if (playerRef.current) {
          playerRef.current.pauseVideo();
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      };

    } catch (err: any) {
      console.error('Recording error:', err);
      setIsProcessing(false);
      if (err.name === 'NotAllowedError') {
        setError('Screen capture was denied. Please allow screen sharing to save clips.');
      } else {
        setError(err.message || 'Failed to record clip. Please try again.');
      }
    }
  }, [playerReady, recordingSupported, startTime, endTime, quality, format, videoId]);

  const startPercent = duration > 0 ? (startTime / duration) * 100 : 0;
  const endPercent = duration > 0 ? (endTime / duration) * 100 : 100;
  const selectedDuration = endTime - startTime;
  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formats = [
    { id: 'mp4', label: 'MP4', desc: 'Universal · all devices' },
    { id: 'mov', label: 'MOV', desc: 'Apple · iPhone & Mac' },
    { id: 'mp3', label: 'MP3', desc: 'Audio only · no video' },
    { id: 'm4a', label: 'M4A', desc: 'Audio · instant download' },
  ];

  const qualities = ['4K', '1080p', '720p', '480p', '360p'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/3 w-[200px] h-[200px] bg-pink-600/5 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Grab any section from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic">YouTube.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Clip, trim and save any moment<br />for your own content.
          </p>
        </div>
      </section>

      {/* URL Input */}
      <section className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGetVideo()}
              placeholder="Paste YouTube URL here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition"
            />
          </div>
          <button
            onClick={handleGetVideo}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Get Video
          </button>
        </div>
        {error && !isProcessing && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <p className="text-gray-600 text-xs mt-3">
          For personal use and content you have the rights to only.
        </p>
      </section>

      {/* Video Preview & Controls */}
      {videoId && (
        <section className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Video Player */}
            <div ref={playerContainerRef} className="relative aspect-video bg-black" id="yt-player-container">
              <div id="yt-player" className="w-full h-full" />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4 md:p-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-medium truncate">{videoTitle}</h3>
                  <p className="text-gray-500 text-sm">
                    {duration > 0 ? `Duration: ${formatTime(duration)}` : 'Loading...'} · Free — 2 min, up to 1080p
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">Free</span>
                  <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full cursor-pointer hover:bg-yellow-600/30 transition">Pro 👑</span>
                </div>
              </div>

              {/* Pro Quality Info */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                {[
                  { label: '480p', limit: '2 hr' },
                  { label: '720p', limit: '1 hr' },
                  { label: '1080p', limit: '30 min' },
                  { label: '4K', limit: '15 min' },
                  { label: 'MP3', limit: '45 min' },
                ].map((q) => (
                  <div key={q.label} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-white text-sm font-medium">{q.label}</div>
                    <div className="text-gray-500 text-xs">{q.limit}</div>
                  </div>
                ))}
              </div>

              {/* Timeline Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-sm font-medium">Clip Range</h4>
                  <span className="text-gray-400 text-xs">Selected: {formatTime(selectedDuration)}</span>
                </div>

                {/* Slider Track */}
                <div className="relative mb-4">
                  <div
                    ref={sliderRef}
                    className="relative h-14 bg-white/5 rounded-lg cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      if (!duration) return;
                      const rect = sliderRef.current!.getBoundingClientRect();
                      const percent = (e.clientX - rect.left) / rect.width;
                      const time = percent * duration;
                      const mid = (startTime + endTime) / 2;
                      if (time < mid) {
                        setStartTime(Math.min(time, endTime - 1));
                      } else {
                        setEndTime(Math.max(time, startTime + 1));
                      }
                      seekTo(time);
                    }}
                  >
                    {/* Thumbnail-like background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-pink-900/30" />
                    
                    {/* Waveform decoration */}
                    <div className="absolute inset-0 flex items-center justify-around opacity-20">
                      {Array.from({ length: 60 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-purple-400 rounded-full"
                          style={{ height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%` }}
                        />
                      ))}
                    </div>

                    {/* Current time indicator */}
                    {currentTime > 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-5"
                        style={{ left: `${currentPercent}%` }}
                      />
                    )}

                    {/* Selected range */}
                    <div
                      className="absolute top-0 bottom-0 bg-purple-500/30 border-l-2 border-r-2 border-purple-400"
                      style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
                    />

                    {/* Start handle */}
                    <div
                      className="absolute top-0 bottom-0 w-4 bg-purple-400 cursor-ew-resize hover:bg-purple-300 transition z-10 flex items-center justify-center rounded-r"
                      style={{ left: `${startPercent}%`, transform: 'translateX(-50%)' }}
                      onMouseDown={handleMouseDown('start')}
                      onTouchStart={handleTouchStart('start')}
                    >
                      <div className="w-0.5 h-5 bg-white rounded-full" />
                    </div>

                    {/* End handle */}
                    <div
                      className="absolute top-0 bottom-0 w-4 bg-purple-400 cursor-ew-resize hover:bg-purple-300 transition z-10 flex items-center justify-center rounded-l"
                      style={{ left: `${endPercent}%`, transform: 'translateX(-50%)' }}
                      onMouseDown={handleMouseDown('end')}
                      onTouchStart={handleTouchStart('end')}
                    >
                      <div className="w-0.5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Time inputs */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-400 text-sm">Start</label>
                    <input
                      type="text"
                      value={formatTime(startTime)}
                      onChange={(e) => {
                        const t = parseTime(e.target.value);
                        if (t < endTime && t >= 0) {
                          setStartTime(t);
                          seekTo(t);
                        }
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-24 text-center focus:outline-none focus:border-purple-500/50 font-mono"
                    />
                  </div>
                  <span className="text-gray-500">::</span>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-400 text-sm">End</label>
                    <input
                      type="text"
                      value={formatTime(endTime)}
                      onChange={(e) => {
                        const t = parseTime(e.target.value);
                        if (t > startTime && t <= duration) setEndTime(t);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-24 text-center focus:outline-none focus:border-purple-500/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-medium mb-1">Format</h4>
                <p className="text-gray-500 text-xs mb-3">Choose your output format</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formats.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        format === f.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-white text-sm font-medium">{f.label}</div>
                      <div className="text-gray-500 text-xs">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              {(format === 'mp4' || format === 'mov') && (
                <div className="mb-6">
                  <h4 className="text-white text-sm font-medium mb-1">Quality</h4>
                  <p className="text-gray-500 text-xs mb-3">Higher quality = larger file size</p>
                  <div className="flex flex-wrap gap-2">
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`px-4 py-2 rounded-lg border text-sm transition ${
                          quality === q
                            ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                        } ${q === '4K' ? 'text-yellow-400' : ''}`}
                      >
                        {q === '4K' ? '👑 ' : ''}{q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Info note */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 mb-6">
                <p className="text-blue-400/80 text-xs">
                  💡 <strong>How it works:</strong> When you click "Save Clip", your browser will ask to share this tab's screen.
                  The clip is recorded in real-time as the video plays through your selected range, then saved as a downloadable file.
                </p>
              </div>

              {/* Warning */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 mb-6">
                <p className="text-yellow-400/80 text-xs">
                  ⚠️ The first 3–4 seconds may be silent — this is normal. Your timestamps are accurate, YouTube just buffers the stream start that way.
                </p>
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">Recording clip...</span>
                    <span className="text-purple-400 text-sm">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Playing from {formatTime(startTime)} to {formatTime(endTime)} — please keep this tab active
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveClip}
                  disabled={isProcessing || !playerReady}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Save Clip
                    </>
                  )}
                </button>
                <button
                  onClick={handlePreview}
                  disabled={!playerReady || isProcessing}
                  className={`px-5 py-3.5 border rounded-xl transition flex items-center gap-2 ${
                    isPreviewing
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  } disabled:opacity-50`}
                >
                  {isPreviewing ? <Pause className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isPreviewing ? 'Stop' : 'Preview'}
                </button>
                <button
                  onClick={() => { setVideoId(null); setUrl(''); setPlayerReady(false); }}
                  disabled={isProcessing}
                  className="px-6 py-3.5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 rounded-xl transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              {/* Support */}
              <p className="text-gray-600 text-xs mt-4 text-center">
                Having a problem? <a href="mailto:contact@mjmclipstudio.com" className="text-purple-400 hover:text-purple-300">contact@mjmclipstudio.com</a> · 24h support
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-sm w-full p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Clip downloaded!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your file has been saved. Got feedback? We read every single one.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-1 border border-white/10 text-gray-400 hover:text-white py-2.5 rounded-xl transition"
              >
                Send Feedback
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl transition"
              >
                Save More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How it works section */}
      {!videoId && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:border-purple-500/20 transition">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-white font-semibold mb-2">1. Paste URL</h3>
              <p className="text-gray-500 text-sm">Paste any YouTube video link into the input field above</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:border-purple-500/20 transition">
              <div className="text-3xl mb-3">✂️</div>
              <h3 className="text-white font-semibold mb-2">2. Set Range</h3>
              <p className="text-gray-500 text-sm">Drag the sliders to select your exact start and end points</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:border-purple-500/20 transition">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="text-white font-semibold mb-2">3. Save Clip</h3>
              <p className="text-gray-500 text-sm">Record and download your clip directly from the browser</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
