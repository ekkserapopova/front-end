import { FC } from "react"
import { Button } from "react-bootstrap"
import './Search.css'


interface SearchProps{
    value?:string
    setValue:(value:string) => void
    onSubmit?:()=>void
    buttonText?:string
    placeholderText?:string
}

const Search:FC<SearchProps>  = ({value, setValue, onSubmit, buttonText, placeholderText}) =>{
    return(
        <div className="input-form">
            <input onChange={(event => setValue(event.target.value))} value={value} className="input-field" type="search" placeholder={placeholderText}></input>
            <Button className="btn-search" type="submit" onClick={onSubmit}>{buttonText}</Button>
    </div>
    )
}

export default Search