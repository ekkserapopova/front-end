import { FC, useState } from "react"
import { Button, Card } from "react-bootstrap"
import './Cards.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store"
import axios from "axios"
import Cookies from 'universal-cookie'
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa";
import not_found from '../../modules/not_found.jpg'
import { appSetReset } from "../../store/slices/draftSlice"
// import searchDocumentsPrice from '../../pages/main-page/DocumentsPage'

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
    const dispatch = useDispatch();
    const [appId, setAppId] = useState(-1);
    
    const draftApp = async () => {
        try {
          const app = await axios.get("http://127.0.0.1:8000/applications/", {
            params: {
              status: "created",
            },
            withCredentials: true,
          });
          
          setAppId(app.data[0].application.application_id);
          dispatch(appSetReset({app:true, appId:app.data[0].application.application_id}))
          const appl = useSelector((state:RootState)  => state.draft.appId)
          console.log(appl)
        } catch {
          console.log("нет черновика");
        }
      };

    const addDocToApp = async () => {
        try {
            await api.post(`/documents/application/${document_id}/`, {
                new_surname: '-',
                reason_for_change: '-',
                session_id: cookies.get("session_id")
            });
            toast.success('Документ успешно добавлен',{
                style: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
            draftApp()
            console.log(appId)
            dispatch(appSetReset({app:true, appId:appId}))
            
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
            {document_image !== 'not_found.jpg' ? <Card.Img className="main-card-image" src={document_image}></Card.Img>: <Card.Img className="main-card-image" src={not_found}></Card.Img>}
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