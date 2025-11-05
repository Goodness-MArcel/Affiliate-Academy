// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import './index.css'
// import App from './App.jsx';
// import { UserProvider } from './context/userContext.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <UserProvider>
//         <App />
//     </UserProvider>
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
// import { UserProvider } from './context/userContext.jsx'
// import { AdminProvider } from './context/AdminContext.jsx'  // ← NEW
import { AuthProvider } from './context/AuthProvider.jsx'  // ← NEW

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AdminProvider>
      <UserProvider> */}
      <AuthProvider>
        <App />
      </AuthProvider>
      {/* </UserProvider>
    </AdminProvider> */}
  </StrictMode>,
)
