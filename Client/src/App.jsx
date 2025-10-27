import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Layout/Nav.jsx';
import Footer from './components/Layout/Footer.jsx';
import Home from './components/pages/Home.jsx';
import Affiliate from './components/pages/Affiliate.jsx';
import Vendor from './components/pages/Vendor.jsx';
import RealEstate from './components/pages/RealEstate.jsx';
import Faqs from './components/pages/Faqs.jsx';
import Register from './components/pages/Register.jsx';
import Login from './components/pages/Login.jsx';



const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Nav />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
