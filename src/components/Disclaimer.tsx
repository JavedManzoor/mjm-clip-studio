interface DisclaimerProps {
  onAgree: () => void;
}

export default function Disclaimer({ onAgree }: DisclaimerProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-lg w-full p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-4">Before you continue</h2>
        <p className="text-gray-300 mb-6">
          MJM Clip Studio is a tool for saving content you own or have the rights to.
        </p>
        <p className="text-gray-400 text-sm mb-6">By continuing you agree that:</p>
        <ul className="text-left text-gray-400 text-sm space-y-2 mb-8">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            You will only save content you own or have explicit permission to save
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            You are solely responsible for how you use this tool
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            MJM Clip Studio is not liable for any copyright infringement caused by your use
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            You have read and agree to our Terms of Service
          </li>
        </ul>
        <button
          onClick={onAgree}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
        >
          I agree, continue
        </button>
        <a href="/terms" className="text-gray-500 text-xs mt-4 block hover:text-gray-300 transition">
          Read full Terms of Service
        </a>
      </div>
    </div>
  );
}
