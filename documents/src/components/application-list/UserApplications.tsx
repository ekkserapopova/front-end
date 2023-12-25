import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../selected-docs/SelectedDocs.css'; 
import './UserApplications.css'
import { ApplicationsProps } from '../../pages/user-applications/UserApplicationsPage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export type DocTableProps = {
    applications: ApplicationsProps[];
};

const UserApplications: React.FC<DocTableProps> = ({ applications }) => {
    const [userApplications, setUserApplications] = useState(applications);
    const router = useNavigate()
    const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);

    useEffect(() => {
        setUserApplications(applications);
    }, [applications]);

    const formatDate = (dateString: string | undefined) => {
        if (dateString) {
            return new Date(dateString).toLocaleDateString();
        }
        return '';
    }

    const cancelApp = async (id : number | undefined) =>{
        try{
            await axios.put(`http://127.0.0.1:8000/applications/${id}/put/moderator/`, {
                application_status: 'canceled'
            }, {withCredentials: true})
            toast.success('Статус изменен')
        } catch{
            toast.error('Неверный статус')
        }
    }

    const completeApp = async (id : number | undefined) =>{
        try{
            await axios.put(`http://127.0.0.1:8000/applications/${id}/put/moderator/`, {
                application_status: 'completed'
            }, {withCredentials: true})
            toast.success('Статус изменен')
        } catch{
            toast.error('Неверный статус')
        }
    }

    return (
        <>
            <div>
                <Table className='tableApps'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Номер заявки</th>
                            {is_moderator && <th>Создатель заявки</th>}
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            {/* <th>Документы</th> */}
                            <th>Статус</th>
                            {is_moderator &&
                            <>
                            <th>Статус МФЦ</th>
                            <th>Отменить</th>
                            <th>Одобрить</th>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {userApplications.map((applicationProps: ApplicationsProps) => (
                            <tr key={applicationProps.application?.application_id} className='table-row' onClick={(event) => {
                                // Проверяем, был ли клик выполнен по кнопке "Отменить" или "Завершить"
                                const isCancelButton = (event.target as HTMLElement).tagName === 'BUTTON' && (event.target as HTMLButtonElement).innerText === 'Отменить';
                                const isFinishButton = (event.target as HTMLElement).tagName === 'BUTTON' && (event.target as HTMLButtonElement).innerText === 'Завершить';

                                // Если клик был выполнен по кнопке, предотвращаем дальнейшие действия
                                if (isCancelButton || isFinishButton) {
                                    event.stopPropagation(); // Предотвращаем всплытие события
                                    return;
                                }

                                // В противном случае выполняем перенаправление
                                router(`/front-end/userapplications/${applicationProps.application.application_id}`, { replace: true });
                            }}>
                                <td>{applicationProps.application?.application_id ?? '-'}</td>
                                {is_moderator && <td>{applicationProps.client_email}</td>}
                                <td>{applicationProps.application?.date_of_application_creation ? formatDate(applicationProps.application.date_of_application_creation) : '-'}</td>
                                <td>{applicationProps.application?.date_of_application_acceptance ? formatDate(applicationProps.application.date_of_application_acceptance) : '-'}</td>
                                <td>{applicationProps.application?.date_of_application_completion ? formatDate(applicationProps.application.date_of_application_completion) : '-'}</td>

                                <td>
                                    {applicationProps.application?.application_status === 'created' ? 'Создана' :
                                        applicationProps.application?.application_status === 'in_progress' ? 'Сформирована' :
                                        applicationProps.application?.application_status === 'completed' ? 'Завершена' :
                                        applicationProps.application?.application_status === 'deleted' ? 'Удалена' :
                                        applicationProps.application?.application_status === 'canceled' ? 'Отменена' : '-'}
                                </td>
                                {is_moderator &&
                                <>
                               <td>{applicationProps.application?.mfc_status}</td>
                               <td><Button onClick={() => cancelApp(applicationProps.application.application_id)} className='filters-btn'>Отменить</Button></td>
                               <td><Button onClick={() => completeApp(applicationProps.application.application_id)} className='filters-btn'>Завершить</Button></td>
                               </>
                                }
                                {/* {is_moderator &&
                                <td><{applicationProps.application?.mfc_status}/td>
                                } */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default UserApplications;
