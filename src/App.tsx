import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Invoices } from './pages/Invoices';
import { Quotations } from './pages/Quotations';
import { Receipts } from './pages/Receipts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2B372A] pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;