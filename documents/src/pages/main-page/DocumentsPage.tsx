import { FC, useEffect, useState } from "react"
import Navibar from "../../components/navbar/Navibar"
import { Documents, getDocuments, getDocumentsSearch} from "../../modules/get-documents"
import { Col, Row } from "react-bootstrap"
import Cards from "../../components/cards-list/Cards"
import './DocumentsPage.css'
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs"
// import SearchPrice from "../../components/filter-price/FilterPrice"
import { mockDocuments } from "../../modules/get-documents"
import Search from "../../components/search-form/Search"


const Page: FC = () => {
    const [documents, setDocuments] = useState<Documents[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [searchValueMin, setsearchValueMin] = useState('')
    const [searchValueMax, setsearchValueMax] = useState('')
    
    const searchDocumentsPrice = async()=>{
        try{
            console.log('searchDocumentsPrice')
            const results = await getDocumentsSearch(searchValue, isNaN(Number(searchValueMax)) ? 0 : Number(searchValueMin), searchValueMax === '' ? 100000 : Number(searchValueMax))
            console.log(searchValueMin, searchValueMax)
            setDocuments(results.results)
        } catch{
            setDocuments(mockDocuments)
        }

    }
    const searchDocuments = async()=>{
        try{
            console.log('searchDocuments')
            const results = await getDocuments(searchValue)
            setDocuments(results.results)
        } catch{
            // console.log(results)
            setDocuments(mockDocuments)
        }
        
    }

    const breadcrumbsItems = [
        { label: 'Все документы', link:'' } // Link to the current page
      ];

    useEffect(() =>{
        searchDocuments()
        
    }, [])

    return (
        <>
           <Navibar />
            <Breadcrumbs items={breadcrumbsItems}/>

            <Search value={searchValue}
                    setValue={(searchValue) => setSearchValue(searchValue)}
                    onSubmit={searchDocuments}
                    valueMax={isNaN(Number(searchValueMax)) ? searchValueMax.replace(/[^0-9]/g, '') : searchValueMax}
                    errorMax={isNaN(Number(searchValueMax)) ? true : false}
                    errorMin={isNaN(Number(searchValueMin)) ? true : false}
                    valueMin={isNaN(Number(searchValueMin)) ? searchValueMin.replace(/[^0-9]/g, '') : searchValueMin}
                    setValueMax={(searchValueMax) => setsearchValueMax(searchValueMax)}
                    setValueMin={(searchValueMin) => setsearchValueMin(searchValueMin)}
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