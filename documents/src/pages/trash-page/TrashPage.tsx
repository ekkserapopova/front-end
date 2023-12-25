import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navibar from '../../components/navbar/Navibar.tsx';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs.tsx';
import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux'
import { Documents } from '../../api/DocumentsApi.ts';
// import TableDocuments from '../../components/table-documents/TableDocuments.tsx';
import TrashTable from '../../components/trash-list/TrashTable.tsx';


const TableDocumentsPage = () => {
    const [documents, setDocuemnts] = useState([])
    const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);
    
    const breadcrumbsItems = [
        { label: 'Все документы', link: '/front-end' },
        { label: 'Удаленные документы', link: '' } 
      ];
    const getDocs = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/documents/', 
          {
            params:
            {
                status: 'trash'
            },
            withCredentials: true,});
        const newArr = response.data.documents.map((item: Documents) => ({
            document_id: item.document_id,
            document_title: item.document_title,
            document_overview: item.document_overview,
            document_price: item.document_price,
            document_status: item.document_status
        }));
        
          console.log(newArr)
        setDocuemnts(newArr)
        } catch(error) {
          throw error
        }
      }

    React.useEffect(() => {
        getDocs();
        console.log(documents.length)
    }, [])

    return (
      <>
        <div>
          <Navibar draft={true} />
          <Breadcrumbs items={breadcrumbsItems} />
          {is_moderator  ? (
            documents.length !== 0 ? (
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
                    Документы
                  </div>
                </div>
                <TrashTable documents={documents} />
              </div>
            ) : <div style={{ fontSize: '30px', color: 'aliceblue', marginLeft: '530px', marginTop: '50px' }}>
                  Нет документов в корзине
                </div>
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