import axios from 'axios';
import { useState, useEffect, FC } from 'react';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import './SelectedDocs.css'; 
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { Api, RequestParams } from '../../api/DocumentsApi';




interface DocsData {
    document_id: number,
    document_title: string,
    document_price: number,
}

export type DocTableProps = {
    docs: DocsData[];
    surname: string;
    reason: string;
    setSurname: (surname: string) => void;
    setReason: (reason:string) => void;
    onSubmit: () => void;
};


const DocumentsTable: FC<DocTableProps> = ({ docs,  surname, reason, setReason, setSurname, onSubmit}) => {
    const [documents, setDocuments] = useState(docs);
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigate()
    // const [app, setApp] = useState(-1)
    
    useEffect(() => {
        setDocuments(docs);
    }, [docs]);

    const deleteDocApp = async (document_id: number) => {
        try {
            setLoading(true);
            // const api = new Api();
    
            // const params = {
            //     status: 'created',
            // } as RequestParams;
            // const ex =  api.applications.applicationsList( params )
            // console.log((await ex).data)
            const application = await axios.get('http://127.0.0.1:8000/applications/', {
                params: {
                    status: "created"
                },
                withCredentials: true
            });
            const application_id = application.data[0].application.application_id
            // setApp(application_id)
            await axios.delete(`http://127.0.0.1:8000/documents_applicaions/${document_id}/${application_id}/`, {
                withCredentials: true,
            });

            setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.document_id !== document_id));
            
            toast.success("Документ успешно удален")

            if (documents.length === 1){
                navigation('/front-end')
            }
        } catch (error) {
            console.error('Ошибка при удалении документа:', error);
        } finally {
            setLoading(false);
        }
    }
    



    return (
        <>
        
        <div className={loading ? 'blurredTable' : ''}>
            <Table  className='tableDocs'>
                <thead>
                    <tr >
                        <th style={{ width: '5%' }}>№</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th style={{ width: '5%' }}>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((document: DocsData, index: number) => (
                        <tr key={document.document_id}>
                            <td>{++index}</td>
                            <td>{document.document_title}</td>
                            <td>{document.document_price} ₽</td>
                            <td>
                                <Button 
                                    onClick={() => deleteDocApp(document.document_id)}
                                    className="btnTrash"
                                >
                                    {loading ? (
                                        <RingLoader color="#007bff" loading={loading} size={20} />
                                    ) : (
                                        <FaTrash className="trash" />
                                    )}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="apps-values">
                <input onChange={(event => setSurname(event.target.value))} placeholder="Новая фамилия" value={surname} className="input-surname" type="search"></input>
                <textarea placeholder="Причина" value={reason} onChange={(event => setReason(event.target.value))} className="input-reason" ></textarea>
            </div>
            <Button onClick={() => {onSubmit()}} className='btn-oform'>Оформить</Button>
        </div>
        </>
    )
}

export default DocumentsTable;

