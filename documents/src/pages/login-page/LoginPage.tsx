import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import LogIn from "../../components/log-in/LogIn";
import Navibar from "../../components/navbar/Navibar";
// import {useDispatch, useSelector} from 'react-redux'
// import { RootState } from "../../store/store";



const LoginPage:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [valuePassword, setvaluePassword] = useState('')
    const [valueEmail, setvalueEmail] = useState('')
    // const dispatch = useDispatch()
    // const valueEmail = useSelector((state:RootState) => state.auth.user_id)

    // const handleValueEmail= (newValue:string) =>{
    //     dispatch(logIn(newValue))
    // }
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Авторизация', link: '' } 
      ];
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
                    setvaluePassword={(valuePassword) => setvaluePassword(valuePassword)}/>
        </>
    )
}

export default LoginPage