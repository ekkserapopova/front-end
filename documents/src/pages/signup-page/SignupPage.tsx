import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Navibar from "../../components/navbar/Navibar";
import SignUp from "../../components/sign-up/SignUp";


const SignupnPage:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [valueFirstName, setvalueFirstName] = useState('')
    const [valueSecondName, setvalueSecondName] = useState('')
    const [valueOtch, setvalueOtch] = useState('')
    const [valuePasport, setvaluePasport] = useState('')
    const [valuePassword, setvaluePassword] = useState('')
    const [valueEmail, setvalueEmail] = useState('')
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/' },
        { label: 'Регистрация', link: '' } 
      ];
    useEffect(() =>{
        console.log("use eff")
    }, [])
    return(
        <>
            <Navibar showSearch={false}/>
            <Breadcrumbs items={breadcrumbsItems}/>
            <SignUp valueEmail={valueEmail}
                    valuePassword={valuePassword}
                    valueFirstName={valueFirstName}
                    setvalueFirstName={(valueFirstName)=>setvalueFirstName(valueFirstName)}
                    valueOtch={valueOtch}
                    setvalueOtch={(valueOtch)=>setvalueOtch(valueOtch)}
                    valuePasport={valuePasport}
                    setvaluePasport={(valuePasport)=>setvaluePasport(valuePasport)}
                    valueSecondName={valueSecondName}
                    setvalueSecondName={(valueSecondName)=>setvalueSecondName(valueSecondName)}
                    setvalueEmail={(valueEmail)=>setvalueEmail(valueEmail)}
                    setvaluePassword={(valuePassword) => setvaluePassword(valuePassword)}/>
        </>
    )
}

export default SignupnPage