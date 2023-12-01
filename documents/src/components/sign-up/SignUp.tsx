import { FC } from "react"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import './SignUp.css'
// import { useNavigate } from "react-router-dom"


interface SignupProps{
    valueFirstName : string
    setvalueFirstName : (valueFirstName : string) => void
    valueSecondName : string
    setvalueSecondName : (valueSecondName : string) => void
    valueOtch : string
    setvalueOtch : (valueOtch : string) => void
    valuePassword : string
    valueEmail : string
    valuePasport : string
    setvaluePasport : (valuePasport : string) => void
    setvaluePassword : (valuePassword : string) => void
    setvalueEmail : (valueEmail : string) => void

}

const SignUp: FC<SignupProps> = ({valuePassword, valueEmail, valueFirstName, valueOtch, valuePasport, valueSecondName, setvalueFirstName, setvalueOtch, setvaluePasport, setvalueSecondName, setvalueEmail, setvaluePassword}) => {
    // const router = useNavigate()
    return(
        <>
            <Card className="sign-card">
                <div className="sign-card-content">
                    <div className="sign-text">Регистрация</div>
                    <div className="sign-input">
                        <input onChange={(event => setvalueSecondName(event.target.value))} placeholder="Фамилия" value={valueSecondName} className="sign-input-secondname" type="search"></input>
                        <input onChange={(event => setvalueFirstName(event.target.value))} placeholder="Имя" value={valueFirstName} className="sign-input-firstname" type="search"></input>
                        <input onChange={(event => setvalueOtch(event.target.value))} placeholder="Отчество" value={valueOtch} className="sign-input-otch" type="search"></input>
                        <input onChange={(event => setvaluePasport(event.target.value))} placeholder="Номер и серия паспорта" value={valuePasport} className="sign-input-pasport" type="search"></input>
                        <input onChange={(event => setvalueEmail(event.target.value))} placeholder="Email" value={valueEmail} className="sign-input-email" type="search"></input>
                        <input placeholder="Пароль" value={valuePassword} onChange={(event => setvaluePassword(event.target.value))} className="sign-input-password" type="search"></input>
                    </div>
                    <Button className="sign-btn">Зарегистрироваться</Button>
                    <div className="sign-to-login">Уже зарегистрированы? <Link to={"/front-end/login"} className="sign-link">Войти</Link></div>
                </div>
            </Card>
        </>
    )
}

export default SignUp