import { FC, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navibar from "../../components/navbar/Navibar";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { Applications, Documents } from '../../api/DocumentsApi';
import axios from "axios";
import OneApplication from "../../components/one-application/OneApplication";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appSetReset } from "../../store/slices/draftSlice";

console.log(1234567890)
interface AppParams{
    id: string;
    [key: string]: string | undefined;
}

export interface ApplicationProps{
    application: Applications;
    documents: Documents[]
    client_email: string
}

console.log(1234567890)

const ApplicationPage:FC = () =>{
    // const [id, setId] = useState<number>(10)
    const [application, setApplication] = useState<ApplicationProps | null>(null)
    const [surname, setSurname] = useState('')
    const [reason, setReason] = useState('')
    const [draft, setDraft] = useState(false)
    const params = useParams<AppParams>()
    const id = Number(params.id)
    const navigation = useNavigate()
    const dispatch = useDispatch();

    console.log(id)
    
    const searchApp = async()=>{
        try{
            const result = await axios.get(`http://127.0.0.1:8000/applications/${id}/`, {withCredentials: true})
            console.log(result.data)
            await setApplication(result.data)
            console.log(result.data.application_status)
            if (result.data.application.application_status === 'created'){
                setDraft(true)
            }
           
        } catch{
            console.log('ошибка получения заявки')
        }    
    }

    const SaveApp =async () => {
        try{
            await axios.put(`http://127.0.0.1:8000/applications/${id}/put/client/`, 
            {
                application_status: 'in_progress'
            }, {withCredentials: true})
            toast.success("Ваша заявка")
            navigation('/front-end/userapplications')
        } catch{
            toast.error("Заполните все поля")
        }

        
    }

    const UpdateApp =async () => {
        try{
            await axios.put(`http://127.0.0.1:8000/applications/${id}/`, {
                new_surname: surname || application?.application.new_surname,
                reason_for_change: reason || application?.application.reason_for_change,
                }, { withCredentials: true });
            searchApp()
            toast.success("Изменения сохранены")
            
        }catch{
            toast.error("Заполните все поля")
        }
        
    }

    const deleteApp = async() => {
        try{
            await axios.delete(`http://127.0.0.1:8000/applications/${id}/`, {withCredentials:true})
            toast.success("Заявка удалена")
            dispatch(appSetReset({app:false}))
            navigation('/front-end')
        } catch{
            toast.error("Заявка не создана")
        }
    }

    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Все заявки', link: '/front-end/userapplications' },
        { label: String(application?.application.application_id!), link: '' }
      ];
    useEffect(() =>{
        console.log("use effect app")
        searchApp()
    }, [])
    return(
        <>
            <Navibar />
            <Breadcrumbs items={breadcrumbsItems}/>
            <Row className="row-more">
                {application && 
                    <Col >
                    <OneApplication application={application.application} 
                                    documents={application.documents}
                                    client_email={application.client_email}
                                    draft={draft}
                                    surname={surname}
                                    setSurname={setSurname}
                                    reason={reason}
                                    setReason={setReason}
                                    onSubmit={SaveApp}
                                    onSubmitDelete={deleteApp}
                                    onSubmitUpdate={UpdateApp}/>
                    </Col>
                }
            </Row>
        </>
    )
}

export default ApplicationPage
