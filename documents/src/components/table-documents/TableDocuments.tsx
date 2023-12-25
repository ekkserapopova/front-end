import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../selected-docs/SelectedDocs.css'; 
import { Documents } from '../../api/DocumentsApi';
import { useNavigate } from 'react-router-dom';
// import './UserApplications.css'
// import { useNavigate } from 'react-router-dom';

export type DocTableProps = {
    documents: Documents[];
};

const TableDocuments: React.FC<DocTableProps> = ({ documents }) => {
    const [docs, setDocuments] = useState(documents);
    const router = useNavigate()

    useEffect(() => {
        setDocuments(documents);
    }, [documents]);

    

    return (
        <>
            <div>
                <Table className='tableApps'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Номер</th>
                            <th>Название</th>
                            <th>Краткое описание</th>
                            <th>Цена</th>
                            {/* <th>Статус</th> */}
                            {/* <th>Удалить</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map((doc: Documents) => ( 
                            <tr key={doc.document_id} className='table-row' onClick={() => router(`/front-end/documents/${doc.document_id}`, {replace: true})}>
                                <td>{doc.document_id ?? '-'}</td>
                                <td>{doc.document_title}</td>
                                <td>{doc.document_overview}</td>
                                <td>{doc.document_price}руб.</td>
                                {/* <td>{doc.document_status}</td> */}
                                {/* <td>
                                    <Button onClick={() => DocumentToBasket(doc.document_id)}>удалить</Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};


export default TableDocuments;
