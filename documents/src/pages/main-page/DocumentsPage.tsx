import { FC, useEffect, useState } from "react"
import Navibar from "../../components/navbar/Navibar"
import { Documents, getDocumentsSearch} from "../../modules/get-documents"
import { Col, Row } from "react-bootstrap"
import Cards from "../../components/cards-list/Cards"
import './DocumentsPage.css'
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs"
// import SearchPrice from "../../components/filter-price/FilterPrice"
import { mockDocuments } from "../../modules/get-documents"
import Search from "../../components/search-form/Search"
import { AppDispatch, RootState } from "../../store/store"
import {useDispatch, useSelector} from 'react-redux'
import { setSeachValue } from "../../store/slices/searchSlice"
import { setSeachValueMin } from "../../store/slices/priceMinSlice"
import { setSeachValueMax } from "../../store/slices/priceMaxSlice"


const Page: FC = () => {
    const [documents, setDocuments] = useState<Documents[]>([])
    // const [searchValue, setSearchValue] = useState('')
    // const [searchValueMin, setsearchValueMin] = useState('')
    // const [searchValueMax, setsearchValueMax] = useState('')

    const dispatch: AppDispatch =  useDispatch()
    const searchValue = useSelector((state:RootState) => state.search.value)
    const searchValueMin = useSelector((state:RootState) => state.min_price.min_value)
    const searchValueMax = useSelector((state:RootState) => state.max_price.max_value)

    const handleSearchValueChange = (newValue:string) =>{
        dispatch(setSeachValue(newValue))
    }

    const handleSearchValueMin = (newValue:string) =>{
        dispatch(setSeachValueMin(newValue))
    }

    const handleSearchValueMax = (newValue:string) =>{
        dispatch(setSeachValueMax(newValue))
    }
    
    const searchDocumentsPrice = async()=>{
        try{
            // console.log('searchDocumentsPrice')
            const results = await getDocumentsSearch(searchValue, isNaN(Number(searchValueMax)) ? 0 : Number(searchValueMin), searchValueMax === '' ? 100000 : Number(searchValueMax))
            // console.log(searchValueMin, searchValueMax)
            setDocuments(results.results)
        } catch{
            setDocuments(mockDocuments)
        }

    }

    const breadcrumbsItems = [
        { label: 'Все документы', link:'' } // Link to the current page
      ];

    useEffect(() =>{
        searchDocumentsPrice()
    }, [])

    return (
        <>
           <Navibar draft={true}/>
            <Breadcrumbs items={breadcrumbsItems}/>

            <Search value={searchValue}
                    setValue={(searchValue) => handleSearchValueChange(searchValue)}
                    onSubmit={searchDocumentsPrice}
                    valueMax={isNaN(Number(searchValueMax)) ? searchValueMax.replace(/[^0-9]/g, '') : searchValueMax}
                    errorMax={isNaN(Number(searchValueMax)) ? true : false}
                    errorMin={isNaN(Number(searchValueMin)) ? true : false}
                    valueMin={isNaN(Number(searchValueMin)) ? searchValueMin.replace(/[^0-9]/g, '') : searchValueMin}
                    setValueMax={(searchValueMax) => handleSearchValueMax(searchValueMax)}
                    setValueMin={(searchValueMin) => handleSearchValueMin(searchValueMin)}
                    onSubmitPrice={searchDocumentsPrice}/>

           <Row md={4} className="row-main">
                {documents?.map((item, index) => (
                    <Col key={index} className="g-col">
                        <Cards {...item} />
                    </Col>
                ))}
                    </Row>
        </>
    )
}

export default Page