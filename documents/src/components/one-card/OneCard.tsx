import { FC } from "react"
import { Button, Card } from "react-bootstrap"
import './OneCard.css'
import { RootState } from "../../store/store"
import { toast } from "react-toastify"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa";
import { appSetReset } from "../../store/slices/draftSlice"

interface CardProps{
    document_image: string
    document_title: string
    document_id: number
    document_overview?: string 
    document_description?: string
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json',
    },
});

interface DocumentParams{
    id: string;
    [key: string]: string | undefined;
}

const OneCard: FC<CardProps> = ({document_image, document_title, document_description}) => {
    const router = useNavigate()
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    const params = useParams<DocumentParams>()
    const id = Number(params.id)
    const dispatch = useDispatch();
    const appId = -1
    const addDocToApp = async () => {
        try {
            await api.post(`/documents/application/${id}/`, {
                new_surname: 'Не указана',
                reason_for_change: 'Не указана'
            });
            toast.success('Документ успешно добавлен',{
                style: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
            console.log(appId)
            dispatch(appSetReset({app:true, appId:appId}))
            router('/front-end')
            // cookies.set("session_id", response.data["session_id"],)
        } catch (error) {
            toast.error('Документ уже добавлен',{
                style: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            })
            router('/front-end')
        } 
    };

    return(
        <>
        
    <Card className="card-more">
        <Card.Img className="cardImage-more" variant="top" src={document_image}  height={100} width={100}/>
        <Card.Body className="more-info">                
            <div className="textStyle">
                <Card.Title className="more-title">{document_title}</Card.Title>
            </div>
            <div>
                <Card.Text className="more-description">{document_description}</Card.Text>
            </div>
        </Card.Body>
        {is_authenticated && 
                    <>
                        <Button onClick={addDocToApp} className="add-to-app" style={{marginLeft:'1100px'}}><FaPlus className="plusik"/></Button>
                    </>
        } 
                    
    </Card>
    </>
    )
}

export default OneCard