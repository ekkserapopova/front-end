import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import DocumentPage from './pages/second-page/DocumentPage.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentsPage from './pages/main-page/DocumentsPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<DocumentsPage />} />
        <Route path="/:id" element={<DocumentPage />} />
        
      </Routes>
    </Router>
  // </React.StrictMode>,
)
