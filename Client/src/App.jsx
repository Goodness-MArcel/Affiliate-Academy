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
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import Dashboard from './components/Users/Dashboard.jsx';
import Profile from './components/Users/Profile.jsx';
import ProgramAccess from './components/Users/ProgramAccess.jsx';
import Estate from './components/Users/Estates.jsx';
import Product from './components/Users/Products.jsx';
import Payment from './components/Users/Payment.jsx';
import Invite from './components/Users/Invite.jsx';


const Layout = () => {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/404' ||
    location.pathname.startsWith('/dashboard');

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavAndFooter && <Nav />}
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/services" element={<Services />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Terms />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/program-access"
            element={
              <ProtectedRoute>
                <ProgramAccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/estate"
            element={
              <ProtectedRoute>
                <Estate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/invite"
            element={
              <ProtectedRoute>
                <Invite />
              </ProtectedRoute>
            }
          />
          


          {/* 404 Not Found */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
