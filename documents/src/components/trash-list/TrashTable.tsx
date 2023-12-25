import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../selected-docs/SelectedDocs.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Documents } from '../../api/DocumentsApi';

export type DocTableProps = {
  documents: Documents[];
};

const TableDocuments: React.FC<DocTableProps> = ({ documents }) => {
  const [docs, setDocuments] = useState(documents);
  const router = useNavigate()

  useEffect(() => {
    setDocuments(documents);
  }, [documents]);

  const deleteDoc = async (document_id: number) => {
    try {
      await axios.put(`/documents/${document_id}/`, { document_status: 'deleted' }, { withCredentials: true });
      // Обновляем компонент после успешного изменения статуса
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.document_id !== document_id));
      console.log(documents.length)
      if (documents.length === 1){
        router('/front-end')
      }
    } catch {
      toast.error('Ошибка');
    }
  };

  const activeDoc = async (document_id: number) => {
    try {
      await axios.put(`/documents/${document_id}/`, { document_status: 'active' }, { withCredentials: true });
      // Обновляем компонент после успешного изменения статуса
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.document_id !== document_id));
      console.log(documents.length)
      if (documents.length === 1){
        router('/front-end')
      }
    } catch {
      toast.error('Ошибка');
    }
  };

  return (
    <>
        {documents.length !== 0 ?
      <div>
        <Table className='tableApps'>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Номер</th>
              <th>Название</th>
              <th>Краткое описание</th>
              <th>Цена</th>
              <th>Восстановить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc: Documents) => (
              <tr key={doc.document_id} className='table-row'>
                <td>{doc.document_id ?? '-'}</td>
                <td>{doc.document_title}</td>
                <td>{doc.document_overview}</td>
                <td>{doc.document_price}руб.</td>
                <td>
                  <Button className='filters-btn' onClick={() => activeDoc(doc.document_id!!)}>Восстановить</Button>
                </td>
                <td>
                  <Button className='filters-btn' onClick={() => deleteDoc(doc.document_id!!)}>Удалить</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        : <div>Нет документов в корзине</div>}
    </>
  );
};

export default TableDocuments;
