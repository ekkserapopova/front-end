import { FC, useState } from "react"
import { Button, Card } from "react-bootstrap"
import './Cards.css'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import axios from "axios"
import Cookies from 'universal-cookie'

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
});

const Cards:FC<CardsProps> = ({document_buttonText="Подробнее", document_image, document_overview, document_price, document_title, document_id}) => {
    const router = useNavigate()
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    const user_id = useSelector((state: RootState) => state.auth.user_id);
    const [add, setAdd] = useState(true)

    const addDocToApp = async () => {
        try {
            await api.post(`/documents/application/${document_id}/`, {
                new_surname: 'aaa',
                reason_for_change: 'aaa',
                session_id: cookies.get("session_id")
            });
            // cookies.set("session_id", response.data["session_id"],)
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
        }
        setAdd(!add)
    };
    const deleteDocApp = async() =>{
        try {
            const application = await api.get('http://127.0.0.1:8000/applications/', {
                params: {
                    // status: 'created',
                },
                withCredentials: true, 
            });
            console.log(application.data)
            await api.delete(`/documents_applicaions/${document_id}/${application.data["application_id"]}`, {
                // session_id: cookies.get("session_id")
            });
            // cookies.set("session_id", response.data["session_id"],)
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
        }
        // setAdd(!add)
    }
    
    console.log(user_id)
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
                        {add ? <Button onClick={addDocToApp}>+</Button> : <Button onClick={deleteDocApp}>-</Button>}
                    </>} 
                </div>
            </Card.Body>
        </div>
        </>
    )
}

export default Cards