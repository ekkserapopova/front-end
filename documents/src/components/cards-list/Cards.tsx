import { FC } from "react"
import { Button, Card } from "react-bootstrap"
import './Cards.css'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import axios from "axios"
import Cookies from 'universal-cookie'
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa";

const cookies = new Cookies()

interface CardsProps{
    document_image? : string
    document_title? : string
    document_id:number
    document_overview? : string
    document_price? : number
    document_buttonText? : string
    onClick? : () => void

   
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json',
    },
});

const Cards:FC<CardsProps> = ({document_buttonText="Подробнее", document_image, document_overview, document_price, document_title, document_id}) => {
    const router = useNavigate()
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);

    const addDocToApp = async () => {
        try {
            await api.post(`/documents/application/${document_id}/`, {
                new_surname: 'aaa',
                reason_for_change: 'aaa',
                session_id: cookies.get("session_id")
            });
            toast.success('Документ успешно добавлен',{
                style: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
            // cookies.set("session_id", response.data["session_id"],)
        } catch (error) {
            toast.error('Документ уже добавлен',{
                style: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
        }
        
    };
    
    // console.log(user_id)
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
                    {is_authenticated && 
                    <>
                        <Button onClick={addDocToApp} className="add-to-app"><FaPlus className="plusik"/></Button>
                    </>} 
                </div>
            </Card.Body>
        </div>
        </>
    )
}

export default Cards