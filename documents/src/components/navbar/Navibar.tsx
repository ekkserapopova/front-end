import { FC, useState } from "react";
import { Button, Nav,  Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import logo from './logo.png'
import './Navibar.css'
import './Search.css'
import '../filter-price//FilterPrice.css'
import { NavLink } from "react-router-dom";


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

const Navibar: FC<SearchProps> = ({value, setValue, onSubmit, buttonText="🔍", placeholderText='Найти документ',  valueMin, valueMax, setValueMin, setValueMax, placeholderTextMin, placeholderTextMax, showSearch=true, errorMax=false, errorMin=false, onSubmitPrice}) => {
    const [filterVisible, setFilterVisible] = useState(false)
    const onSubmitFilter = () =>{
        console.log('clicked')
        setFilterVisible(!filterVisible)
    }
    
    return (
    <Navbar className="navibar" collapseOnSelect expand="lg" variant="light" >
        <NavbarBrand className="navbar-brand-content">
            {/* <img src={logo} width={70} height={70}></img> */}
            <NavLink to={"/"}><div className="logo-1">Смена фамилии</div></NavLink>
        </NavbarBrand>
        <div className="nav-list">
            <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id="responsive-navbar-nav" className="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <NavLink to={"/"} className="link" >Главная</NavLink> */}
                    {/* <Link className="link" to={"/"} >Заявки</Link> */}
                </Nav>
            {showSearch &&
            <div className="input-form">
                <input onChange={(event => setValue(event.target.value))} value={value} className="input-field" type="search" placeholder={placeholderText}></input>
                <Button className="btn-search" type="submit" onClick={onSubmit}>{buttonText}</Button>
                <Button className="filter-btn" onClick={onSubmitFilter}>цена</Button>
                {filterVisible &&

                     <div className="input-price">
                     <div className="input-field-price-min">
                         <input className="filter-input min" value={valueMin} onChange={(event => setValueMin(event.target.value))} placeholder={placeholderTextMin} type="search"></input>
                         {errorMin && <p className="errorTextMin">Введите число</p>}
                         {/* <p className="errorTextMin">Введите число</p> */}
                     </div>
                     <div className="input-field-price-max">
                         <input className="filter-input max" value={valueMax} onChange={(event => setValueMax(event.target.value))} placeholder={placeholderTextMax} type="search"></input>
                         {errorMax && <p className="errorTextMax">Введите число</p>}
                         {/* <p className="errorTextMax">Введите число</p> */}
                     </div>
                     <Button className="filter-button" onClick={onSubmitPrice} type="submit">поиск</Button>
                 </div>
                }
            </div>
            }
            </NavbarCollapse>
            <div className="buttons-auth">
                <Button className="auth log-in">Войти</Button>
                <Button className="auth sign-in">Зарегистрироваться</Button>
            </div>
        </div>
    </Navbar>
    )
}

export default Navibar
