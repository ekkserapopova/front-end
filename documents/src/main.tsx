import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import DocumentPage from './pages/second-page/DocumentPage.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentsPage from './pages/main-page/DocumentsPage.tsx'
import LoginPage from './pages/login-page/LoginPage.tsx'
import SignupPage from './pages/signup-page/SignupPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/front-end" element={<DocumentsPage />} />
        <Route path="/front-end/:id" element={<DocumentPage />} />
        <Route path="/front-end/login" element={<LoginPage/>} />
        <Route path="/front-end/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  // </React.StrictMode>,
)
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import { store } from './example/store/store.ts'
// import { Provider } from "react-redux";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// )