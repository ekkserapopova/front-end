import { FC, useState } from "react"
import { Button } from "react-bootstrap"
// import './Search.css'
import '../navbar/Search.css'
import { FaFilter } from "react-icons/fa";



interface SearchProps{
    value?:string
    setValue:(value:string) => void
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

const Search:FC<SearchProps>  = ({setValueMax, setValueMin, showSearch, valueMax, valueMin, placeholderTextMax="до", placeholderTextMin="от", onSubmitPrice, setValue,  value, onSubmit, buttonText="🔍", errorMax, errorMin, placeholderText='Найти документ'}) =>{
    const [filterVisible, setFilterVisible] = useState(false)
    const onSubmitFilter = () =>{
        console.log('clicked')
        setFilterVisible(!filterVisible)
    }
    return(
        <>
        {!showSearch &&
            <div className="input-form">
                <input onChange={(event => setValue && setValue(event.target.value))} value={value} className="input-field" type="search" placeholder={placeholderText}></input>
                <Button className="btn-search" type="submit" onClick={onSubmit}>{buttonText}</Button>
                <Button className="filter-btn" onClick={onSubmitFilter}><FaFilter className="icon" /></Button>
                {filterVisible &&

                     <div className="input-price">
                        <div className="price-word">Цена:</div>
                     <div className="input-field-price-min">
                         <input className="filter-input min" value={valueMin} onChange={(event =>setValueMin&& setValueMin(event.target.value))} placeholder={placeholderTextMin} type="search"></input>
                         {errorMin && <p className="errorTextMin">Введите число</p>}
                         {/* <p className="errorTextMin">Введите число</p> */}
                     </div>
                     <div className="input-field-price-max">
                         <input className="filter-input max" value={valueMax} onChange={(event => setValueMax&& setValueMax(event.target.value))} placeholder={placeholderTextMax} type="search"></input>
                         {errorMax && <p className="errorTextMax">Введите число</p>}
                         {/* <p className="errorTextMax">Введите число</p> */}
                     </div>
                     <Button className="filter-button" onClick={onSubmitPrice} type="submit">поиск</Button>
                 </div>
                }
                </div>
            }
            </>
    )
}

export default Search