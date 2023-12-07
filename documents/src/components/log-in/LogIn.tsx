import { FC } from "react"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import './LogIn.css'
// import { useNavigate } from "react-router-dom"


interface LoginProps{
    valuePassword : string
    valueEmail : string
    setvaluePassword : (valuePassword : string) => void
    setvalueEmail : (valueEmail : string) => void
    onSubmitAuth:()=>void

}

const LogIn: FC<LoginProps> = ({valuePassword, valueEmail, setvalueEmail, setvaluePassword, onSubmitAuth}) => {
    // const router = useNavigate()
    return(
        <>
            <Card className="auth-card">
                <div className="auth-card-content">
                    <div className="auth-text">Авторизация</div>
                    <div className="auth-input">
                        <input onChange={(event => setvalueEmail(event.target.value))} placeholder="Email" value={valueEmail} className="auth-input-email" type="search"></input>
                        <input placeholder="Пароль" value={valuePassword} onChange={(event => setvaluePassword(event.target.value))} className="auth-input-password" type="password"></input>
                    </div>
                    <Button className="auth-btn" onClick={onSubmitAuth}>Войти</Button>
                    <div className="auth-to-sign">Не зарегистрированы? <Link to={"/front-end/signup"} className="auth-link">Регистрация</Link></div>
                </div>
            </Card>
        </>
    )
}

export default LogIn