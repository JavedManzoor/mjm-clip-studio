import { useState, useRef, useCallback } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface ClipToolProps {}

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

export default function ClipTool({}: ClipToolProps) {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [duration, setDuration] = useState(300); // default 5 min
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080p');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);

  const handleGetVideo = useCallback(async () => {
    setError('');
    const id = extractVideoId(url);
    if (!id) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setIsLoading(true);
    setVideoId(id);
    setVideoTitle('YouTube Video');
    setDuration(300);
    setStartTime(0);
    setEndTime(60);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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

  const handleSaveClip = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 3000);
  };

  const startPercent = (startTime / duration) * 100;
  const endPercent = (endTime / duration) * 100;
  const selectedDuration = endTime - startTime;

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
        {/* Background glow effect */}
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
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Get Video
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <p className="text-gray-600 text-xs mt-3">
          For personal use and content you have the rights to only.
        </p>
      </section>

      {/* Video Preview & Controls */}
      {videoId && (
        <section className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </div>

            {/* Video Info */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-medium">{videoTitle}</h3>
                  <p className="text-gray-500 text-sm">Free — 2 min, up to 1080p</p>
                </div>
                <div className="flex items-center gap-2">
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
                    className="relative h-12 bg-white/5 rounded-lg cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      const rect = sliderRef.current!.getBoundingClientRect();
                      const percent = (e.clientX - rect.left) / rect.width;
                      const time = percent * duration;
                      const mid = (startTime + endTime) / 2;
                      if (time < mid) {
                        setStartTime(Math.min(time, endTime - 1));
                      } else {
                        setEndTime(Math.max(time, startTime + 1));
                      }
                    }}
                  >
                    {/* Thumbnail background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
                    
                    {/* Selected range */}
                    <div
                      className="absolute top-0 bottom-0 bg-purple-500/30 border-l-2 border-r-2 border-purple-400"
                      style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
                    />
                    
                    {/* Start handle */}
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-purple-400 cursor-ew-resize hover:bg-purple-300 transition z-10 flex items-center justify-center"
                      style={{ left: `${startPercent}%`, transform: 'translateX(-50%)' }}
                      onMouseDown={handleMouseDown('start')}
                      onTouchStart={handleTouchStart('start')}
                    >
                      <div className="w-1 h-4 bg-white rounded-full" />
                    </div>
                    
                    {/* End handle */}
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-purple-400 cursor-ew-resize hover:bg-purple-300 transition z-10 flex items-center justify-center"
                      style={{ left: `${endPercent}%`, transform: 'translateX(-50%)' }}
                      onMouseDown={handleMouseDown('end')}
                      onTouchStart={handleTouchStart('end')}
                    >
                      <div className="w-1 h-4 bg-white rounded-full" />
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
                        if (t < endTime) setStartTime(t);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-24 text-center focus:outline-none focus:border-purple-500/50"
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
                        if (t > startTime) setEndTime(t);
                      }}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-24 text-center focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <h4 className="text-white text-sm font-medium mb-3">Format</h4>
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

              {/* Warning */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 mb-6">
                <p className="text-yellow-400/80 text-xs">
                  ⚠️ The first 3–4 seconds may be silent — this is normal. Your timestamps are accurate, YouTube just buffers the stream start that way.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveClip}
                  disabled={isProcessing}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Save Clip
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setVideoId(null); setUrl(''); }}
                  className="px-6 py-3.5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 rounded-xl transition"
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
              Your file is on its way. Got feedback? We read every single one.
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
              <p className="text-gray-500 text-sm">Choose format & quality, then download your clip instantly</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
