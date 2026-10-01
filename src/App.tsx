import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Disclaimer from './components/Disclaimer';
import TopBanner from './components/TopBanner';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Terms from './pages/Terms';
import PricingModal from './components/PricingModal';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
        {showDisclaimer && <Disclaimer onAgree={() => setShowDisclaimer(false)} />}
        <TopBanner />
        <Navbar onPricingClick={() => setShowPricing(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
      </div>
    </Router>
  );
}

export default App;
