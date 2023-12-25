import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navibar from '../../components/navbar/Navibar.tsx';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.tsx';
import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux'
import { Applications, Documents } from '../../api/DocumentsApi.ts';
import UserApplications from '../../components/application-list/UserApplications.tsx';
import './UserApplications.css'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export interface ApplicationsProps {
    application: Applications,
    documents: Documents[];
    client_email: string
}

const UserApplicationsPage = () => {
    // const params = useParams();
    // const id = params.id === undefined ? '' : params.id;
    const [applications, setApplications] = useState([])
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);
    const [dateFrom, setDateFrom] = useState<string>('')
    const [dateTo, setDateTo] = useState<string>('')
    const [user, setUser] = useState<string>()
    const [statusField1, setStatusField1] = useState(true);
    const [statusField2, setStatusField2] = useState(true);
    const [statusField3, setStatusField3] = useState(true);
    const router = useNavigate()
    // const [filters, setFilters] = useState(false)
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Все заявки', link: '' } 
      ];
    const getApps = async () => {
      const statusArray = [];
      if (statusField1) statusArray.push('in_progress');
      if (statusField2) statusArray.push('completed');
      if (statusField3) statusArray.push('canceled');
        try {
          const response = await axios.get('http://127.0.0.1:8000/applications/', {
            params: {
                status: statusArray.join(','),
                startdate: dateFrom,
                enddate:  dateTo, 
            },
            withCredentials: true,
        });
        // console.log(response.data)
        console.log(dateTo)
        const applications = response.data
        const filtered_data = applications.filter((item: ApplicationsProps) => {
            const isClientMatching = !user || item.client_email.includes(user);
            return isClientMatching;
         });
        // console.log(response.data)
        const newArr = filtered_data.map((item:ApplicationsProps) => ({
            application:{
            application_id: item.application.application_id,
            date_of_application_creation: item.application.date_of_application_creation,
            date_of_application_acceptance: item.application.date_of_application_acceptance,
            date_of_application_completion: item.application.date_of_application_completion,
            new_surname: item.application.new_surname,
            reason_for_change: item.application.reason_for_change,
            application_status: item.application.application_status ,
            mfc_status: item.application.mfc_status},
            client_email: item.client_email,
            documents: item.documents
            // documents: ?
          }));
            setApplications(newArr)
            // router('/front-end/documents')
        } catch {
          toast.error('Заполните обязательные поля')
        }
      }



    useEffect(() => {
        getApps();
        if (is_moderator){
          const pollInterval = 5000; // Интервал в миллисекундах
          const pollTimer = setInterval(getApps, pollInterval); // Устанавливаем таймер опроса
          return () => clearInterval(pollTimer);
        }
        

    // Очистить таймер при размонтировании компонента
      
    }, [dateFrom, dateTo, user, statusField1, statusField2, statusField3])

    

    return (
      <>
        
        <div >
          <Navibar draft={true} />
          <Breadcrumbs items={breadcrumbsItems} />
          {is_moderator && (
          <div className='filter-app'>
            <div className='p'>Фильтрация</div>
            <div style={{fontSize: 16, color: 'aliceblue', marginLeft: 650, marginBottom: 10}}>По дате формирования</div>
            <div className='dates'>
                            <input
                                className='date-input'
                                type='date'
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            ></input>
                            <input
                                className='date-input'
                                type='date'
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            ></input>
                        </div>
            <div style={{fontSize: 16, color: 'aliceblue', marginLeft: 695, marginBottom: 10}}>По клиенту</div>
            <input 
              placeholder='Введите пользователя' 
              className='user-input'
              value={user}
              onChange={(e) => setUser(e.target.value)}>
              </input>
              <div style={{marginTop: 10}}>
              <label style={{color: 'aliceblue', marginLeft: 560}}>
                Сформирована:
                <input type="checkbox" checked={statusField1} onChange={() => setStatusField1(!statusField1)} />
              </label>
              <label style={{color: 'aliceblue', marginLeft: 20}}>
                Завершена:
                <input type="checkbox" checked={statusField2} onChange={() => setStatusField2(!statusField2)} />
              </label>
              <label style={{color: 'aliceblue', marginLeft: 20}}>
                Отменена:
                <input type="checkbox" checked={statusField3} onChange={() => setStatusField3(!statusField3)} />
              </label>
            </div>
            {/* <div className='button-container'><Button onClick={getApps} className='filters-btn'>Применить</Button></div> */}
          </div>)
          }
          {is_authenticated ? (
            applications.length !== 0 ? (
              <div>
                <div
                  style={{
                    width: '1200px',
                    backgroundColor: '#35525A',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '30px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '30px',
                  }}
                >
                  <div style={{ color: 'aliceblue', fontSize: '20px', backgroundColor: '#35525A' }}>
                    Заявки
                  </div>
                </div>
                <UserApplications applications={applications} />
              </div>
            ) : <div style={{ fontSize: '30px', color: 'aliceblue', marginLeft: '450px', marginTop: '50px' }}>
                  Нет заявок с соответсвующими фильтрами
                </div>
          ) : (
            <div style={{ fontSize: '30px', color: 'aliceblue', marginLeft: '530px', marginTop: '50px' }}>
              Необходимо авторизоваться
            </div>
          )}
        </div>
      </>
    );
}

export default UserApplicationsPage