import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../selected-docs/SelectedDocs.css'; 
import { Documents } from '../../api/DocumentsApi';
import './UserApplications.css'
import { ApplicationsProps } from '../../pages/user-applications/UserApplicationsPage';
import { useNavigate } from 'react-router-dom';

export type DocTableProps = {
    applications: ApplicationsProps[];
    className?: string;
};

const UserApplications: React.FC<DocTableProps> = ({ applications }) => {
    const [userApplications, setUserApplications] = useState(applications);
    const router = useNavigate()
    useEffect(() => {
        setUserApplications(applications);
    }, [applications]);

    const formatDate = (dateString: string | undefined) => {
        if (dateString) {
            return new Date(dateString).toLocaleDateString();
        }
        return '';
    }

    return (
        <>
            <div>
                <Table className='tableApps'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Номер заявки</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Документы</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userApplications.map((applicationProps: ApplicationsProps) => (
                            <tr key={applicationProps.application?.application_id} className='table-row' onClick={() => router(`/front-end/userapplications/${applicationProps.application.application_id}`, {replace: true})}>
                                <td>{applicationProps.application?.application_id ?? '-'}</td>
                                <td>{applicationProps.application?.date_of_application_creation ? formatDate(applicationProps.application.date_of_application_creation) : '-'}</td>
                                <td>{applicationProps.application?.date_of_application_acceptance ? formatDate(applicationProps.application.date_of_application_acceptance) : '-'}</td>
                                <td>{applicationProps.application?.date_of_application_completion ? formatDate(applicationProps.application.date_of_application_completion) : '-'}</td>
                                <td>
                                    <ul>
                                        {applicationProps.documents?.map((document: Documents) => (
                                            <li key={document.document_id}>{document.document_title}</li>
                                        )) ?? '-'}
                                    </ul>
                                </td>
                                <td>
                                    {applicationProps.application?.application_status === 'created' ? 'Создана' :
                                        applicationProps.application?.application_status === 'in_progress' ? 'Сформирована' :
                                        applicationProps.application?.application_status === 'completed' ? 'Завершена' :
                                        applicationProps.application?.application_status === 'deleted' ? 'Удалена' :
                                        applicationProps.application?.application_status === 'canceled' ? 'Отменена' : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default UserApplications;
