import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Scissors className="w-5 h-5 text-purple-400" />
              <span>MJM Clip Studio</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-md">
              Free YouTube clip tool for creators. Trim and save any moment from YouTube in seconds.
              No signup, no watermark, MP4 format.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Pages</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 text-sm hover:text-white transition">Clip Tool</Link></li>
              <li><Link to="/blog" className="text-gray-400 text-sm hover:text-white transition">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 text-sm hover:text-white transition">About</Link></li>
              <li><Link to="/terms" className="text-gray-400 text-sm hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contact@mjmclipstudio.com" className="text-gray-400 text-sm hover:text-white transition">contact@mjmclipstudio.com</a></li>
              <li><span className="text-gray-500 text-sm">24h support</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            © 2025 MJM Clip Studio. All rights reserved. For personal use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
