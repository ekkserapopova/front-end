
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/login-page/LoginPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from './store/slices/authSlice';
import DocumentsPage from './pages/main-page/DocumentsPage';
import DocumentPage from './pages/second-page/DocumentPage';
import SignupPage from './pages/signup-page/SignupPage';
//import { useCurrentRespId } from "./slices/RespSlices"

const cookies = new Cookies();
console.log(cookies.get('session_id'))
function App() {
  const dispatch = useDispatch();

  const getInitialUserInfo = async () => {
    console.log(cookies.getAll())
    try {
      const response: AxiosResponse = await axios.post('http://127.0.0.1:8000/getuser/',
      { 
        session_id: cookies.get('session_id'),
        
      }, 
      {withCredentials: true})

      console.log(response.data)
      dispatch(
        loginUser({
          user_id: response.data.id,
          is_authenticated: true,
          is_moderator: response.data.is_moderator,
        }))
      
    } 
    catch {
      console.log('Пользоатель не авторизован!!!')
    }
  }


  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo();
      // cookies.remove("sesseionid")
    }
  }, [])

  return (
    <div className='app'>
      <Router>
      <Routes>
        <Route path="/front-end" element={<DocumentsPage />} />
        <Route path="/front-end/:id" element={<DocumentPage />} />
        <Route path="/front-end/login" element={<LoginPage/>} />
        <Route path="/front-end/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
    </div>
    );
  }
  
export default App;