// // src/components/Admin/AdminProtectedRoute.jsx
// import React, { useState, useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// // import { supabase } from '../../../supabase';  // Adjust path if needed
// import { supabase } from '../../../supabase';

// export const AdminProtectedRoute = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = result
//   const location = useLocation();

//   useEffect(() => {
//     const checkAdmin = async () => {
//       try {
//         // Get current session
//         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
//         if (sessionError || !session?.user) {
//           setIsAdmin(false);
//           return;
//         }

//         // Check role in DB
//         const { data, error } = await supabase
//           .from('users')
//           .select('role')
//           .eq('id', session.user.id)
//           .single();

//         if (error || data?.role !== 'admin') {
//           setIsAdmin(false);
//         } else {
//           setIsAdmin(true);
//         }
//       } catch (err) {
//         console.error('Admin check failed:', err);
//         setIsAdmin(false);
//       }
//     };

//     checkAdmin();
//   }, []);

//   // Show spinner while checking
//   if (isAdmin === null) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-success" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-3">Verifying admin access...</p>
//       </div>
//     );
//   }

//   // Redirect if not admin
//   return isAdmin ? children : <Navigate to="/AdminLogin" replace state={{ from: location }} />;
// };