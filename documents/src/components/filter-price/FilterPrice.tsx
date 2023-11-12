// import { FC } from "react"
// import { Button } from "react-bootstrap"
// import './FilterPrice.css'


// interface FilterProps{
//     setValueMin?:(valueMin:string) => void
//     setValueMax?:(valueMax:string) => void
//     onSubmitPrice?:() => void
//     placeholderTextMin?:string
//     placeholderTextMax?:string
//     buttonTextPrice?:string
//     showSearch?: boolean
//     errorMin?: boolean
//     errorMax?: boolean
//     showFilter?:boolean
//     valueMin?:string
//     valueMax?:string
// }

// const SearchPrice: FC<FilterProps> = ({valueMax, valueMin, onSubmitPrice, showFilter = true, setValueMin, setValueMax, placeholderTextMin = 'от', placeholderTextMax = 'до', errorMax=false, errorMin=false}) => {
//     return(
//     <>
//         {showFilter && 
//             <div className="input-price">
//             <div className="input-field-price-min">
//                 <input className="filter-input min" value={valueMin} onChange={(event => setValueMin(event.target.value))} placeholder={placeholderTextMin} type="search"></input>
//                 {errorMin && <p className="errorTextMin">Введите число</p>}
//                 {/* <p className="errorTextMin">Введите число</p> */}
//             </div>
//             <div className="input-field-price-max">
//                 <input className="filter-input max" value={valueMax} onChange={(event => setValueMax(event.target.value))} placeholder={placeholderTextMax} type="search"></input>
//                 {errorMax && <p className="errorTextMax">Введите число</p>}
//                 {/* <p className="errorTextMax">Введите число</p> */}
//             </div>
//             <Button className="filter-button" onClick={onSubmitPrice} type="submit">search</Button>
//         </div>
//        }
//     </>
//     )
// }

// export default SearchPrice
