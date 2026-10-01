import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onPricingClick: () => void;
}

export default function Navbar({ onPricingClick }: NavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-80 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">MJM Clip Studio</span>
          <span className="sm:hidden">MJM</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm transition ${location.pathname === '/' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Clip Tool
          </Link>
          <Link
            to="/blog"
            className={`text-sm transition ${location.pathname === '/blog' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`text-sm transition ${location.pathname === '/about' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            About
          </Link>
          <button
            onClick={onPricingClick}
            className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full transition font-medium"
          >
            👑 Pro
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-400 hover:text-white transition"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0f0f0f] px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-2 ${location.pathname === '/' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            Clip Tool
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-2 ${location.pathname === '/blog' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm py-2 ${location.pathname === '/about' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            About
          </Link>
          <button
            onClick={() => { onPricingClick(); setMobileOpen(false); }}
            className="w-full text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition font-medium"
          >
            👑 Pro Plans
          </button>
        </div>
      )}
    </nav>
  );
}
