import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import LogIn from "../../components/log-in/LogIn";
import Navibar from "../../components/navbar/Navibar";
import { loginUser } from "../../store/slices/authSlice";
import {useDispatch} from 'react-redux'
import axios from 'axios'
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
// import { RootState } from "../../store/store";


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,  
});

const LoginPage:FC = () =>{
    const [valuePassword, setvaluePassword] = useState('')
    const [valueEmail, setvalueEmail] = useState('')
    const navigation = useNavigate()
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Авторизация', link: '' } 
      ];
      const dispatch = useDispatch();

      const login = async () => {
        try {
            const response = await api.post('/login', {
                email: valueEmail,
                password: valuePassword,
            });
            // console.log(response)
            const userData = response.data;
            const cookies = new Cookies()
            const session_id = response.data["session_id"]
            cookies.set("session_id", session_id)
            dispatch(
                loginUser({
                user_id: userData.id,
                is_authenticated: true,
                is_moderator: userData.is_moderator,
                })
            );
            navigation('/front-end')
            } catch (error) {
                console.error('Ошибка при авторизации:', error);
            }
            
      };
    useEffect(() =>{
        console.log("use eff")
    }, [])
    return(
        <>
            <Navibar showSearch={false}/>
            <Breadcrumbs items={breadcrumbsItems}/>
            <LogIn valueEmail={valueEmail}
                    valuePassword={valuePassword}
                    setvalueEmail={(valueEmail)=>setvalueEmail(valueEmail)}
                    setvaluePassword={(valuePassword) => setvaluePassword(valuePassword)}
                    onSubmitAuth={login}/>
        </>
    )
}

export default LoginPage