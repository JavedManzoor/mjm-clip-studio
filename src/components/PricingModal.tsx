import { X } from 'lucide-react';
import { useState } from 'react';

interface PricingModalProps {
  onClose: () => void;
}

export default function PricingModal({ onClose }: PricingModalProps) {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-lg w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">👑</div>
          <h2 className="text-xl font-bold text-white">MJM Clip Studio Premium</h2>
          <p className="text-gray-400 text-sm mt-1">Save longer clips in higher quality</p>
        </div>

        <div className="space-y-4">
          {/* Free Plan */}
          <div className="border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">Free</h3>
              <span className="text-white font-bold">$0</span>
            </div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>✓ Clips up to 2 minutes long</li>
              <li>✓ 1080p max quality</li>
              <li>✓ Unlimited number of clips</li>
              <li>✓ No account needed</li>
            </ul>
            <div className="mt-3 text-center">
              <span className="text-purple-400 text-sm font-medium">Current Plan</span>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border border-purple-500/50 rounded-xl p-4 bg-purple-500/5">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-white">Premium</h3>
              <span className="text-white font-bold">
                {billing === 'yearly' ? '$3.99/mo' : '$5.99/mo'}
              </span>
            </div>
            {billing === 'yearly' && (
              <p className="text-gray-500 text-xs mb-2">billed $47.88/year</p>
            )}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setBilling('yearly')}
                className={`text-xs px-3 py-1 rounded-full transition ${billing === 'yearly' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Yearly
              </button>
              <button
                onClick={() => setBilling('monthly')}
                className={`text-xs px-3 py-1 rounded-full transition ${billing === 'monthly' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Monthly
              </button>
            </div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>✓ Clips up to 30 minutes long</li>
              <li>✓ Up to 4K quality</li>
              <li>✓ Unlimited number of clips</li>
              <li>✓ Priority processing</li>
              <li>✓ Early access to new features</li>
            </ul>
            <button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition">
              Upgrade — {billing === 'yearly' ? '$3.99/mo (billed yearly)' : '$5.99/mo'}
            </button>
          </div>

          {/* Enterprise */}
          <div className="border border-white/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">Enterprise</h3>
              <span className="text-gray-400 text-sm">Contact us</span>
            </div>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>✓ Custom clip limits</li>
              <li>✓ Dedicated support</li>
              <li>✓ Volume pricing</li>
              <li>✓ Custom integrations</li>
            </ul>
            <a href="mailto:contact@mjmclipstudio.com" className="block w-full mt-3 text-center border border-white/20 text-white font-semibold py-2.5 rounded-xl hover:bg-white/5 transition">
              Contact Us
            </a>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-4 text-center">
          ⚠️ Region-restricted, age-restricted, or private videos cannot be downloaded regardless of plan.
        </p>
      </div>
    </div>
  );
}
