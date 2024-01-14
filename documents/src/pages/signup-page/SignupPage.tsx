import { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Navibar from "../../components/navbar/Navibar";
import SignUp from "../../components/sign-up/SignUp";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignupnPage:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [valueFirstName, setvalueFirstName] = useState('')
    const [valueSecondName, setvalueSecondName] = useState('')
    const [valueOtch, setvalueOtch] = useState('')
    const [valuePasport, setvaluePasport] = useState('')
    const [valuePassword, setvaluePassword] = useState('')
    const [valueEmail, setvalueEmail] = useState('')
    const navigation = useNavigate()

    const registration = async() =>{
        try{
            await axios.post('http://127.0.0.1:8000/user/', {
            email: valueEmail,
            password: valuePassword,
            first_name: valueFirstName,
            last_name: valueSecondName,
            otchestvo: valueOtch,
            pasport: valuePasport,
        })
        toast.success('Вы зарегистрированы')
        navigation('/front-end/login')

        } catch(error){
            toast.error('Ошибка регистрации')
            console.log('mistake reg')
        }
        
    }
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Регистрация', link: '' } 
      ];
    useEffect(() =>{
        console.log("use eff")
    }, [])
    return(
        <>
            <Navibar />
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
                    setvaluePassword={(valuePassword) => setvaluePassword(valuePassword)}
                    onClickReg={registration}/>
        </>
    )
}

export default SignupnPage