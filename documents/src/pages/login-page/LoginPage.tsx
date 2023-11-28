import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import LogIn from "../../components/log-in/LogIn";
import Navibar from "../../components/navbar/Navibar";


const LoginPage:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [valuePassword, setvaluePassword] = useState('')
    const [valueEmail, setvalueEmail] = useState('')
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/' },
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