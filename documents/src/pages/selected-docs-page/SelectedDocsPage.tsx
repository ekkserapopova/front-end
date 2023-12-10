import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navibar from '../../components/navbar/Navibar.tsx';
import DocumentsTable from '../../components/selected-docs/SelectedDocs.tsx';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.tsx';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export type ReceivedVacancyData = {
    document_id: number,
    document_title: string,
    document_price: number,
    document_image: string | undefined | null;
}


const SelectedRespPage = () => {
    // const params = useParams();
    // const id = params.id === undefined ? '' : params.id;
    const [currentVac, setCurrentVac] = React.useState([])
    const [surname, setSurname] = useState('')
    const [reason, setReason] = useState('')
    const navigation = useNavigate()

    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Текущая заявка', link: '' } 
      ];
    const getCurrentResp = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/applications/', {
            params: {
                status: "created"
            },
            withCredentials: true,
        });
        console.log(response.data[0])

          const newArr = response.data[0].documents.map((raw: ReceivedVacancyData) => ({
            document_id: raw.document_id,
                document_title: raw.document_title,
                document_price: raw.document_price,
                document_image: raw.document_image,
            }));
            console.log(newArr)
        setCurrentVac(newArr)
        } catch(error) {
          throw error
        }
      }

    const AddApp  = async () => {
        try{
            if (currentVac.length === 0){
                toast.error("Выберите документы для замены")
                return
            }
            const app = await axios.get('http://127.0.0.1:8000/applications/', 
            {
                params:{
                    status: 'created'
                },
                withCredentials: true
            }
            )
            console.log('need')
            console.log(app.data[0].application.application_id) //19
            const id = app.data[0].application.application_id
            console.log(id) //-1
            try{
                await axios.put(`http://127.0.0.1:8000/applications/${id}/`, 
                {
                    new_surname: surname,
                    reason_for_change: reason
                }, {withCredentials: true})
                
                try{
                    await axios.put(`http://127.0.0.1:8000/applications/${id}/put/client/`, 
                    {
                        application_status: 'in_progress'
                    }, {withCredentials: true})
                    toast.success("Успешно")
                    navigation('/front-end/userapplications')
                } catch{
                    toast.error("Ошибка формирования")
                }
            }catch{
                toast.error("Ошибка отправки")
            }
    
            
        } catch{
            console.log('не получена заявка');
        }
    }

        

    
    React.useEffect(() => {
        getCurrentResp();

    }, [])

    return (
        <>
        
        <div >
            <Navibar draft={true}/>
            <Breadcrumbs items={breadcrumbsItems}/>
            {is_authenticated ? ( currentVac.length !== 0 ?
            <div >
                <div style={{
                        width:'1000px', 
                        backgroundColor:'#35525A', 
                        display:'flex', 
                        justifyContent:'center',
                        marginTop: '30px', 
                        marginLeft:'auto', 
                        marginRight:'auto',
                        height:'30px'}}>
                    <div style={{color: 'aliceblue', fontSize: '20px', backgroundColor:'#35525A'}}>
                        Добавленные документы
                    </div>
                </div>
                <DocumentsTable docs={currentVac}
                                surname={surname}
                                reason={reason}
                                setReason={setReason}
                                setSurname={setSurname}
                                onSubmit={AddApp}/>
            </div> : <div style={{fontSize: '30px', color: 'aliceblue', marginLeft: '500px', marginTop: '50px'}}>Вы не выбрали ни одного документа</div>)
            : <div style={{fontSize: '30px', color: 'aliceblue', marginLeft: '530px', marginTop: '50px'}}>Необходимо авторизоваться</div>
        }
        </div>
        
        </>
    )
}

export default SelectedRespPage