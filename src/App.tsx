import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Consign from '@/pages/Consign';
import Process from '@/pages/Process';
import ProductDetail from '@/pages/ProductDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consign" element={<Consign />} />
            <Route path="/process/:id" element={<Process />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="*"
              element={
                <div className="py-32 text-center">
                  <div className="text-6xl mb-6 opacity-30">404</div>
                  <h2 className="font-display text-3xl font-bold text-charcoal-300 mb-3">
                    页面未找到
                  </h2>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-champagne-400 hover:text-champagne-300 font-serif-body transition-colors"
                  >
                    ← 返回首页
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
