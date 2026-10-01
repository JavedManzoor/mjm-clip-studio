export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-4">
        <span className="text-purple-400 text-sm font-medium">Legal</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-500 text-sm mb-8">Last updated: 2025</p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          By accessing or using MJM Clip Studio ("the Service"), you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use the Service.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio is a web-based tool that allows users to clip and trim segments from YouTube videos.
          The Service provides functionality to select specific time ranges from YouTube videos and export
          them in various formats (MP4, MOV, MP3, M4A).
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">3. User Responsibilities</h2>
        <p className="text-gray-400 leading-relaxed mb-4">You agree to:</p>
        <ul className="text-gray-400 space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Only use the Service to save content you own or have explicit permission to save
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Comply with all applicable laws and regulations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Not use the Service for any unlawful purpose
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Not attempt to circumvent any security measures
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Not redistribute content obtained through the Service without proper authorization
          </li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Copyright and Intellectual Property</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio does not claim ownership of any content processed through the Service.
          Users are solely responsible for ensuring they have the right to download and use any content
          they clip using the Service. We do not condone the saving of copyrighted content without permission.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Free and Paid Plans</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          The Service offers both free and paid tiers:
        </p>
        <ul className="text-gray-400 space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <strong className="text-white">Free Plan:</strong> Clips up to 2 minutes, up to 1080p quality, unlimited clips
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <strong className="text-white">Premium Plan:</strong> Clips up to 30 minutes, up to 4K quality, priority processing
          </li>
        </ul>
        <p className="text-gray-400 leading-relaxed mb-6">
          Paid plans are billed as specified at the time of purchase. Refunds are handled on a case-by-case basis.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          MJM Clip Studio is provided "as is" without warranties of any kind. We are not liable for:
        </p>
        <ul className="text-gray-400 space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Any copyright infringement caused by your use of the Service
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Any loss of data or interrupted service
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            Any damages arising from the use or inability to use the Service
          </li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">7. YouTube Terms of Service</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          By using MJM Clip Studio, you also agree to comply with YouTube's Terms of Service.
          Region-restricted, age-restricted, or private videos may not be accessible through the Service.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">8. Modifications to Service</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          We may also update these Terms of Service from time to time. Continued use of the Service
          after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">9. Contact</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          For questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:contact@mjmclipstudio.com" className="text-purple-400 hover:text-purple-300 transition">
            contact@mjmclipstudio.com
          </a>.
        </p>
      </div>
    </div>
  );
}
