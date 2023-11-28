import { FC } from "react"
import { Card } from "react-bootstrap"
import './OneCard.css'
// import { useNavigate } from "react-router-dom"


interface CardProps{
    document_image: string
    document_title: string
    document_id: number
    document_overview?: string 
    document_description?: string
}

const OneCard: FC<CardProps> = ({document_image, document_title, document_description}) => {
    // const router = useNavigate()
    return(
        <>
        
    <Card className="card-more">
    {/* <Button className="back-to-cards" onClick={() => router(`/`, {replace: true})}>Назад</Button> */}
        <Card.Img className="cardImage-more" variant="top" src={document_image}  height={100} width={100}/>
        <Card.Body className="more-info">                
            <div className="textStyle">
                <Card.Title className="more-title">{document_title}</Card.Title>
            </div>
            <div>
                <Card.Text className="more-description">{document_description}</Card.Text>
            </div>
        </Card.Body>
        {/* <Button className="btn" color="black" onClick={() => router(`/document/${document_name}`, {replace: true})}>Подробнее</Button> */}
    </Card>
    </>
    )
}

export default OneCard