import { FC } from "react";
import { Button, Nav,  Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import logo from './logo.png'
import './Navibar.css'
import './Search.css'
import '../filter-price//FilterPrice.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import axios from "axios"
import { logoutUser } from "../../store/slices/authSlice";
import {useDispatch} from 'react-redux'
import Cookies from "universal-cookie";
// import setValueSearch from '../../pages/main-page/DocumentsPage'

const cookies = new Cookies();
// console.log(cookies.get('session_id'))
interface SearchProps{
    value?:string
    setValue?:(value:string) => void
    onSubmit?:()=>void
    buttonText?:string
    placeholderText?:string

    showFilter?:boolean
    valueMin?:string
    valueMax?:string
    setValueMin?:(valueMin:string) => void
    setValueMax?:(valueMax:string) => void
    onSubmitPrice?:() => void
    placeholderTextMin?:string
    placeholderTextMax?:string
    buttonTextPrice?:string
    showSearch?: boolean
    errorMin?: boolean
    errorMax?: boolean
}

const Navibar: FC<SearchProps> = () => {
    // const resetSearch = () => {
    //     setValueSearch('')
    // }
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/logout', {
                session_id: cookies.get("session_id")
            });
            // const cookies = new Cookies()
            cookies.remove("session_id")
            cookies.remove("sesseionid")
            // cookies.set("session_id", session_id)
            dispatch(
                logoutUser()
            );
            // cookies.set("session_id", response.data["session_id"],)
            } catch (error) {
            console.error('Ошибка при авторизации:', error);
            }
      };
    const router = useNavigate()
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    return (
    <Navbar className="navibar" collapseOnSelect expand="lg" variant="light" >
        <NavbarBrand className="navbar-brand-content">
            {/* <img src={logo} width={70} height={70}></img> */}
            <NavLink to={"/front-end"} /*onClick={resetSearch}*/><div className="logo-1">Смена фамилии</div></NavLink>
        </NavbarBrand>
        <div className="nav-list">
            <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id="responsive-navbar-nav" className="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to={"/front-end"} className="link"  /*onClick={resetSearch}*/>Главная</NavLink>
                    {is_authenticated && <NavLink to={"/front-end"} className="link">Мои заявки</NavLink>}
                    {/* <Link className="link" to={"/"} >Заявки</Link> */}
                </Nav>
            </NavbarCollapse>
            <div className="buttons-auth">
                {is_authenticated 
                ? <Button className="auth log-in" onClick={logout}>Выйти</Button> 
                : <Button className="auth log-in" onClick={() => router(`/front-end/login`, {replace: true})}>Войти</Button>}
                
                {/* <Button className="auth sign-in">Зарегистрироваться</Button> */}
            </div>
        </div>
    </Navbar>
    )
}

export default Navibar
