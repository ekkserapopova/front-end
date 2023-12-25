import { FC } from "react"
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
import { FaMinus } from "react-icons/fa";
// import searchDocumentsPrice from '../../pages/main-page/DocumentsPage'
// import setDocuments from '../../pages/main-page/DocumentsPage'
// import documents from '../../pages/main-page/DocumentsPage'
// import searchDocumentsPrice from '../../pages/main-page/DocumentsPage'

const cookies = new Cookies()

interface CardsProps{
    document_image? : string
    document_title? : string
    document_id:number
    document_overview? : string
    document_price? : number
    document_buttonText? : string
    onClick? : () => void;
}

const Cards:FC<CardsProps> = ({document_buttonText="Подробнее", document_image, document_overview, document_price, document_title, document_id}) => {
    const router = useNavigate()
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);
    const draft_id = useSelector((state:RootState)  => state.draft.appId)
    
    const dispatch = useDispatch();
    // const [appId, setAppId] = useState(-1);
    
    const draftApp = async () => {
        try {
          dispatch(appSetReset({app:true, appId:draft_id}))
          const appl = useSelector((state:RootState)  => state.draft.appId)
          console.log(appl)
        } catch {
          console.log("нет черновика");
        }
      };

    const addDocToApp = async () => {
        try {
            await axios.post(`/documents/application/${document_id}/`, {
                new_surname: '-',
                reason_for_change: '-',
                session_id: cookies.get("session_id")
            }, {withCredentials:true});
            toast.success('Документ успешно добавлен')
            draftApp()
            console.log(draft_id)
            dispatch(appSetReset({app:true, appId:draft_id}))
            
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
    

    const docToTrash =async () => {
        try {
            axios.put(`/documents/${document_id}/`,
            {
                document_status: 'trash'
            }, {withCredentials: true})
            toast.success("Документ успешно удален")
            
        } catch{
            toast.error('ошибка')
        }
    }
    // console.log(user_id)
    return(
        <>
        <div className="main-card">
        <Card.Img
            className="main-card-image"
            src={document_image}
            onError={(e: any) => {
              e.target.onerror = null; 
              e.target.src = not_found; 
            }}
          ></Card.Img>
            <Card.Body className="main-card-body">
                <Card.Title className="main-card-title">{document_title}</Card.Title>
                <Card.Text className="main-card-text">{document_overview}</Card.Text>
                <div className="price-btn-container">
                    <div className="main-card-price">{document_price}руб.</div>
                    <Button className="main-card-btn" onClick={() => router(`/front-end/${document_id}`, {replace: true})}>{document_buttonText}</Button> 
                    {is_authenticated && (!is_moderator ?
                    <>
                        <Button onClick={addDocToApp} className="add-to-app"><FaPlus className="plusik"/></Button>
                    </> 
                    : <Button className="add-to-app"  onClick={docToTrash}><FaMinus className="plusik"/></Button>)} 
                </div>
            </Card.Body>
        </div>
        </>
    )
}

export default Cards