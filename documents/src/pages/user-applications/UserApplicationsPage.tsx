import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navibar from '../../components/navbar/Navibar.tsx';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.tsx';
import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux'
import { Applications, Documents } from '../../api/DocumentsApi.ts';
import UserApplications from '../../components/application-list/UserApplications.tsx';


// export interface Applications {
//   application_id: number;
//   date_of_application_creation?: string;
//   date_of_application_acceptance?: string;
//   date_of_application_completion?: string;
//   new_surname: string;
//   reason_for_change: string;
//   application_status: string;
//   documents: Documents[];
// }

export interface ApplicationsProps {
    application: Applications,
    documents: Documents[];
}

const UserApplicationsPage = () => {
    // const params = useParams();
    // const id = params.id === undefined ? '' : params.id;
    const [applications, setApplications] = useState([])
    const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Все заявки', link: '' } 
      ];
    const getApps = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/applications/', {
            withCredentials: true,
        });
        // console.log(response.data)
        const newArr = response.data.map((item:ApplicationsProps) => ({
            application:{
            application_id: item.application.application_id,
            date_of_application_creation: item.application.date_of_application_creation,
            date_of_application_acceptance: item.application.date_of_application_acceptance,
            date_of_application_completion: item.application.date_of_application_completion,
            new_surname: item.application.new_surname,
            reason_for_change: item.application.reason_for_change,
            application_status: item.application.application_status },
            documents: item.documents
            // documents: ?
          }));
        //   newDate = new
          
          
          console.log(applications);
          
            console.log(newArr)
            setApplications(newArr)
        } catch(error) {
          throw error
        }
      }

    React.useEffect(() => {
        getApps();
    }, [])

    return (
      <>
        <div>
          <Navibar draft={true} />
          <Breadcrumbs items={breadcrumbsItems} />
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
            ) : <div style={{ fontSize: '30px', color: 'aliceblue', marginLeft: '530px', marginTop: '50px' }}>
                  Вы не подали ни одной заявки
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