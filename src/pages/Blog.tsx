import { Link } from 'react-router-dom';

const posts = [
  {
    slug: 'clip-youtube-video',
    category: 'Guide',
    title: 'How to Clip a Specific Part of a YouTube Video (Free, No Software Needed)',
    excerpt: 'You watched a video and there\'s one perfect 30-second moment in it. You don\'t want the whole 45-minute video. You just want that one part. Here\'s how.',
    date: '2025',
  },
  {
    slug: 'clip-youtube-dj-set',
    category: 'Guide',
    title: 'How to Clip a Specific Song from a YouTube DJ Set',
    excerpt: 'Learn how to extract individual tracks from long DJ sets on YouTube using MJM Clip Studio.',
    date: '2025',
  },
  {
    slug: 'save-youtube-live-stream-clip',
    category: 'Guide',
    title: 'How to Save a Clip from a YouTube Live Stream',
    excerpt: 'Step-by-step guide to clipping moments from YouTube live streams and VODs.',
    date: '2025',
  },
  {
    slug: 'download-dj-mix-clip-youtube',
    category: 'Guide',
    title: 'How to Download a DJ Mix Clip from YouTube (MP4 or MP3)',
    excerpt: 'Extract specific sections of DJ mixes from YouTube in video or audio format.',
    date: '2025',
  },
  {
    slug: 'audio-video-desync-capcut-fix',
    category: 'Guide • Editing',
    title: 'Why Your Clip Loses Audio Sync in CapCut After Export (And How to Fix It)',
    excerpt: 'Common audio/video sync issues when importing clips into CapCut and proven solutions.',
    date: '2025',
  },
];

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-4">
        <span className="text-purple-400 text-sm font-medium">Guide • Free Tool</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        How to Clip a Specific Part of a YouTube Video
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Published by MJM Clip Studio — Updated 2025
      </p>

      {/* Main Article */}
      <article className="prose prose-invert max-w-none mb-16">
        <h2 className="text-xl font-bold text-white mt-8 mb-4">Why people need this</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          You watched a video and there's one perfect 30-second moment in it — a highlight reel clip,
          a funny reaction, a tutorial step you want to save, a quote you want to share. You don't want
          the whole 45-minute video. You just want <strong className="text-white">that one part</strong>.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          The problem? Most YouTube clip tools make you save the entire video first, then trim it separately.
          Others slap a watermark on your clip, cap you at 60 seconds, ask you to create an account, or require
          you to install desktop software. It's more friction than anyone should have to deal with for a 20-second clip.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">The easiest way: MJM Clip Studio</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          <strong className="text-white">MJM Clip Studio</strong> lets you export only the exact clip you want directly
          from YouTube — no full-video save, no watermark, no signup, no software. It runs entirely in your browser
          and works on desktop and mobile.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          The clip is trimmed and encoded on the server side, so the file you receive is a clean, ready-to-use MP4
          that opens in any editor or uploads to any platform.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">Step-by-step guide</h2>
        <ol className="text-gray-400 space-y-4 mb-6">
          <li className="flex gap-3">
            <span className="text-purple-400 font-bold">1.</span>
            <div>
              <strong className="text-white">Paste the YouTube URL</strong>
              <p className="mt-1">Go to the home page and paste the URL of the YouTube video into the input field. Click "Get Video".</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-400 font-bold">2.</span>
            <div>
              <strong className="text-white">Set your start and end time</strong>
              <p className="mt-1">Drag the left slider handle to your clip's start point and the right handle to the end. You can also type the exact timestamps in the fields below the slider for precision.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-400 font-bold">3.</span>
            <div>
              <strong className="text-white">Choose your quality</strong>
              <p className="mt-1">Select 1080p, 720p, 480p, or 360p from the quality tabs. Free clips are capped at 2 minutes.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-400 font-bold">4.</span>
            <div>
              <strong className="text-white">Save your clip</strong>
              <p className="mt-1">Click "Save Clip". MJM Clip Studio fetches and trims just that segment from YouTube and automatically saves the MP4 to your device in seconds.</p>
            </div>
          </li>
        </ol>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">Why MJM Clip Studio is different</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Most tools fetch the full video to their server, then trim it after. MJM Clip Studio works entirely
          in your browser using the Screen Capture API and MediaRecorder. When you click "Save Clip", it records
          the video playback in real-time as it plays through your selected range. No server processing, no
          uploads, no waiting — the clip is recorded and saved directly to your device.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">Common use cases</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-white font-medium mb-1">TikTok & Instagram Reels</h3>
            <p className="text-gray-400">Clip a funny or viral moment and post it directly. MP4 format uploads without conversion.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Podcast highlights</h3>
            <p className="text-gray-400">Save the best 60 seconds from a long podcast episode to share with friends.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Tutorial snippets</h3>
            <p className="text-gray-400">Clip just the step you keep rewinding to, so you can watch it offline or share it with a colleague.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Sports moments</h3>
            <p className="text-gray-400">Grab that goal, dunk, or race finish without saving the full match replay.</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">Export YouTube audio as MP3</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio doesn't just export video clips — you can also extract just the audio from any YouTube
          clip as an MP3 file. Common uses include saving a podcast segment you want to listen to offline,
          extracting a song clip, or grabbing a speech or quote as audio to share.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">FAQ</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-white font-medium mb-1">Can I do this on my phone?</h3>
            <p className="text-gray-400">Yes. MJM Clip Studio works in Safari on iPhone and Chrome on Android. No app installation required.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">What format is the exported clip?</h3>
            <p className="text-gray-400">All clips export as MP4 with H.264 video and AAC audio — the most compatible format for phones, editors, and social platforms.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Is it really free?</h3>
            <p className="text-gray-400">Yes. Clips up to 2 minutes are completely free with no account and no watermark.</p>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mt-8">
          <h3 className="text-white font-bold mb-2">Ready to grab your clip?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Paste your YouTube link and save just the part you want — free, in under 30 seconds.
          </p>
          <Link to="/" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition">
            Try MJM Clip Studio Free →
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(1).map((post) => (
            <div key={post.slug} className="border border-white/5 rounded-xl p-4 hover:border-white/10 transition cursor-pointer">
              <span className="text-purple-400 text-xs font-medium">{post.category}</span>
              <h3 className="text-white text-sm font-medium mt-1 mb-2">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
