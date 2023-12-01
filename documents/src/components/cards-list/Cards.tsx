import { FC } from "react"
import { Button, Card } from "react-bootstrap"
import './Cards.css'
import { useNavigate } from "react-router-dom"

interface CardsProps{
    document_image? : string
    document_title? : string
    document_id:number
    document_overview? : string
    document_price? : number
    document_buttonText? : string
    onClick? : () => void

   
}

const Cards:FC<CardsProps> = ({document_buttonText="Подробнее", document_image, document_overview, document_price, document_title, document_id}) => {
    const router = useNavigate()
    return(
        <>
        
        <div className="main-card">
            <Card.Img className="main-card-image" src={document_image}></Card.Img>
            <Card.Body className="main-card-body">
                <Card.Title className="main-card-title">{document_title}</Card.Title>
                <Card.Text className="main-card-text">{document_overview}</Card.Text>
                <div className="price-btn-container">
                    <div className="main-card-price">{document_price}руб.</div>
                    <Button className="main-card-btn" onClick={() => router(`/front-end/${document_id}`, {replace: true})}>{document_buttonText}</Button>  
                </div>
            </Card.Body>
        </div>
        </>
    )
}

export default Cards