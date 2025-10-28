import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './components/Layout/Nav.jsx';
import Footer from './components/Layout/Footer.jsx';
import Home from './components/pages/Home.jsx';
import Affiliate from './components/pages/Affiliate.jsx';
import Services from './components/pages/Services.jsx';
import RealEstate from './components/pages/RealEstate.jsx';
import Faqs from './components/pages/Faqs.jsx';
import Register from './components/pages/Register.jsx';
import Login from './components/pages/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Terms from './components/pages/Terms.jsx';
import Dashboard from './components/Users/Dashboard.jsx';
import Program from './components/Users/ProgramAccess.jsx';


const Layout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || 
                          location.pathname === '/register' || 
                          location.pathname === '/404' ||
                          location.pathname.startsWith('/dashboard');

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavAndFooter && <Nav />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/services" element={<Services />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Terms />} />
          {/* Dashboard and other protected routes can be added here */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/program-access" element={<Program />} />

          
          {/* 404 Not Found - Catch all unmatched routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
