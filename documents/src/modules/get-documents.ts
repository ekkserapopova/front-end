// import { useNavigate } from "react-router-dom"
import not_found from './not_found.jpg'
export const mockDocuments: Documents[] = [
    {
      document_id: 1,
      document_title: 'Паспорт',
      document_name: 'pasport',
      document_overview: 'Документ, удостоверяющий личность на территории РФ.',
      document_description: 'Документ, удостоверяющий личность на территории РФ.',
      document_image: not_found,
      document_price: 2000,
      document_status: 'active',
    },
    {
        document_id: 2,
        document_title: 'Загранпаспорт',
        document_name: 'zagranpasport',
        document_overview: 'Документ, удостоверяющий личность вне территории РФ.',
        document_description: 'Документ, удостоверяющий личность вне территории РФ.',
        document_image: not_found,
        document_price: 3000,
        document_status: 'inactive',
    },
  ];

export interface Documents {
    // wrapperType: string
    document_image: string
    document_title: string
    document_overview: string
    document_id: number
    document_price:number
    document_name:string
    document_status:string
    document_description:string
}

export interface DocumentsResult {
    resultCount: number
    results: Documents[]
}

export interface DocumentResult {
    resultCount: number
    results: Documents
}

export const options = {
  method: 'PUT',
  credentials: 'include',
  headers: {
      'Content-Type': 'application/json',
      "X-CSRFToken": document.cookie
          .split('; ')
          .filter(row => row.startsWith('csrftoken='))
          .map(c => c.split('=')[1])[0]
  },
      body: JSON.stringify({
          order_statusid: 8,
           order_date: new Date().toISOString()
      })
};



export const getDocuments = async (title = ''): Promise<DocumentsResult> => {
    try {
      const response = await fetch(`/documents?title=${title}`);
      const data = await response.json()
      return { resultCount: data.length, results: data}
    } catch (error) {
      console.error('Ошибка при запросе к бэкенду:', error);
      return { resultCount: mockDocuments.length, results: mockDocuments };
    }
  };
  
  export const getDocument = async (id: number): Promise<DocumentResult> => {
    try {
      const response = await fetch(`/documents/${id}`);
    //   console.log(response)
      const data = await response.json()
      return { resultCount: data.length, results: data}
    } catch (error) {
      console.error('Ошибка при запросе к бэкенду:', error);
      return { resultCount: mockDocuments.length, results: mockDocuments[id-1] };
    }
  };
  
  export const getDocumentsSearch = async (
    title = '',
    minprice: number,
    maxprice: number
  ): Promise<DocumentsResult> => {
    try {
      const response = await fetch(`/documents?title=${title}&minprice=${minprice}&maxprice=${maxprice}`);
      const data = await response.json()
      return { resultCount: data.length, results: data}
    } catch (error) {
      console.error('Ошибка при запросе к бэкенду:', error);
      return { resultCount: mockDocuments.length, results: mockDocuments };
    }
  };
  
  
  