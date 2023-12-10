import { FC, useEffect, useState } from "react";
// import { Card, Col, Row } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './DocumentPage.css'
import OneCard from "../../components/one-card/OneCard";
import Navibar from "../../components/navbar/Navibar";
import { Documents, getDocument, mockDocuments } from "../../modules/get-documents";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";


interface DocumentParams{
    id: string;
    [key: string]: string | undefined;
}

const Document:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [document, setDocument] = useState<Documents | null>(null)
    const params = useParams<DocumentParams>()
    const id = Number(params.id)
    
    const search = async()=>{
        try{
            const result = await getDocument(id) 
            console.log("search func")
            await setDocument(result.results)
        } catch{
            setDocument(mockDocuments[id - 1])
        }
        
    }
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: document?.document_title!, link: '' } 
      ];
    useEffect(() =>{
        console.log("use eff")
        search()
    }, [])
    return(
        <>
            
            <Navibar />
            <Breadcrumbs items={breadcrumbsItems}/>
            <Row className="row-more">
                {document && 
                    <Col >
                    <OneCard {...document} />
                    </Col>
                }
            </Row>
        </>
    )
}

export default Document