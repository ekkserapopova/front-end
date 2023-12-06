import { FC } from "react";
import { Button, Nav,  Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import logo from './logo.png'
import './Navibar.css'
import './Search.css'
import '../filter-price//FilterPrice.css'
import { NavLink, useNavigate } from "react-router-dom";
// import setValueSearch from '../../pages/main-page/DocumentsPage'


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
    const router = useNavigate()
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
                    {/* <Link className="link" to={"/"} >Заявки</Link> */}
                </Nav>
            </NavbarCollapse>
            <div className="buttons-auth">
                <Button className="auth log-in" onClick={() => router(`/front-end/login`, {replace: true})}>Войти</Button>
                {/* <Button className="auth sign-in">Зарегистрироваться</Button> */}
            </div>
        </div>
    </Navbar>
    )
}

export default Navibar
