import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navibar from '../../components/navbar/Navibar.tsx';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.tsx';
import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux'
import { Documents } from '../../api/DocumentsApi.ts';
// import TableDocuments from '../../components/table-documents/TableDocuments.tsx';
import { useParams } from 'react-router-dom';
import OneDocument from '../../components/one-document/OneDocument.tsx';


const TableDocumentsPage = () => {
    const [document, setDocuemnt] = useState<Documents | undefined>()
    const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);
    const params = useParams()
    const id = Number(params.id)

    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Таблица документов', link: '/front-end/documents'},
        { label: id ? id.toString() : 'Новый документ', link: '' } 
      ];
    const getDoc = async () => {
        try {
          const response = await axios.get(`/documents/${id}`, {
            withCredentials: true,
        });
        const doc = response.data
        
        setDocuemnt(doc)
        } catch(error) {
          throw error
        }
      }

    React.useEffect(() => {
        getDoc();
    }, [])

    return (
      <>
        <div>
          <Navibar draft={true} />
          <Breadcrumbs items={breadcrumbsItems} />
          {is_moderator  ? (
              <OneDocument document={document!!} />
            ) : (
            <div style={{ fontSize: '30px', color: 'aliceblue', marginLeft: '530px', marginTop: '50px' }}>
              Нет доступа. Доступно только модераторам.
            </div>
          )}
        </div>
      </>
    );
}

export default TableDocumentsPage