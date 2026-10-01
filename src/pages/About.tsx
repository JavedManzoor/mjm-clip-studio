export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-4">
        <span className="text-purple-400 text-sm font-medium">About</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        The YouTube clip and trim tool for creators
      </h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          MJM Clip Studio is a free tool built for creators who need to work with specific moments from YouTube.
          Paste a link, set your start and end timestamps, and export exactly the segment you need —
          no software, no watermark, no fuss.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">What it does</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio is built specifically for clips. You set a start time and an end time,
          and only that segment is exported. It works for both video (MP4) and audio-only (MP3) clips —
          ideal for pulling a moment from a long-form video into your editing timeline.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Creator use cases</h2>
        <ul className="text-gray-400 space-y-3 mb-6">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            Clipping your own long-form content to share as shorts or reels
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            Pulling a reference clip into your editing project
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            Saving a section of a video you own the rights to for remixing or commentary
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            Extracting audio from a podcast or interview you recorded
          </li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Who built it</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio is an independent side project built and maintained by a solo developer.
          It is intended for creators working with content they own or have rights to.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Is it free?</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Yes. Clips up to 2 minutes are completely free. Sign in with Google to get started.
          Creator Pro plans with longer clip limits are available for extended functionality.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Contact</h2>
        <p className="text-gray-400 leading-relaxed">
          For questions or feedback, reach out at{' '}
          <a href="mailto:contact@mjmclipstudio.com" className="text-purple-400 hover:text-purple-300 transition">
            contact@mjmclipstudio.com
          </a>.
        </p>
      </div>
    </div>
  );
}
