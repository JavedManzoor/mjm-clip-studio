import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do I save a clip from a YouTube video?',
    a: 'Paste a YouTube URL into the box on this page, click "Get Video", then drag the start and end sliders to select your clip. Pick your quality and click "Save Clip". Your browser will ask to share the tab — allow it, and the clip will be recorded in real-time and saved as a downloadable file.',
  },
  {
    q: 'How does the clip recording work?',
    a: 'MJM Clip Studio uses your browser\'s built-in Screen Capture API. When you click "Save Clip", it records the video playback in real-time as it plays through your selected range. The recording is done entirely in your browser — no server processing needed. The result is saved as a WebM video file.',
  },
  {
    q: 'What browsers are supported?',
    a: 'MJM Clip Studio works best in Google Chrome (version 104+) and Microsoft Edge. These browsers support the Screen Capture API with self-tab capture. Firefox and Safari have limited support for this feature.',
  },
  {
    q: 'Is MJM Clip Studio free to use?',
    a: 'Yes — MJM Clip Studio is completely free for clips up to 2 minutes long. No account required, no watermark added, and no limit on the number of clips you can export.',
  },
  {
    q: 'Can I trim YouTube videos for TikTok or Instagram Reels?',
    a: 'Yes. MJM Clip Studio exports clean MP4 files you can upload directly to TikTok, Instagram Reels, YouTube Shorts, or any other platform. You can also import the file into any video editor for further cropping or resizing.',
  },
  {
    q: 'What video formats does MJM Clip Studio support?',
    a: 'MJM Clip Studio exports in MP4 (H.264 video, AAC audio) — the most universally compatible format. Your clip will open in CapCut, Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, and any media player without conversion.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. MJM Clip Studio works in any modern mobile browser on iPhone or Android — no app to install. The clip will save to your phone\'s files or camera roll depending on your browser settings.',
  },
  {
    q: 'Is there a limit on how many clips I can save?',
    a: 'There is no limit on the number of clips. On the free plan each clip must be 2 minutes or shorter. Creator Pro plans allow clips up to 2 hours depending on quality.',
  },
  {
    q: 'What is the easiest way to cut a YouTube video online?',
    a: 'MJM Clip Studio. Paste your YouTube link, drag the sliders to your start and end points, and hit Save Clip. The whole process takes about 30 seconds and requires no account or software installation.',
  },
  {
    q: 'Can I save just the audio from a YouTube video?',
    a: 'Yes — select MP3 under the Audio Only section in the quality picker. MJM Clip Studio will extract just the audio from your selected clip and export it as an MP3 file. No video, smaller file size, perfect for podcasts, music clips, and speeches.',
  },
  {
    q: 'Can I export a specific part of a YouTube video as MP3?',
    a: 'Yes, and this is one of MJM Clip Studio\'s biggest advantages. Most YouTube to MP3 tools convert the entire video. MJM Clip Studio lets you set exact start and end timestamps and export only that section as MP3 — ideal for clipping a podcast highlight, a song section, or a specific quote.',
  },
  {
    q: 'Is it legal to use MJM Clip Studio?',
    a: 'MJM Clip Studio is a tool for saving content you own or have rights to — such as your own videos, Creative Commons content, or content you have explicit permission to use. We do not condone saving copyrighted content without permission.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition"
            >
              <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4">
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
