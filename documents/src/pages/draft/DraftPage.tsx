import { FC, useEffect, useState } from "react";
import axios from "axios";
import Navibar from "../../components/navbar/Navibar";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const DraftApp: FC = () => {
    const [applicationData, setApplicationData] = useState<any>(null);

    const getDraft = async () => {
        try {
            const response = await api.get('/applications/', {
                params: {
                    status: "created"
                },
                withCredentials: true,
            });
            setApplicationData(response.data[0]);
            console.log(applicationData.documents[0].document_title); 
        } catch (error) {
            console.error('Ошибка при получении черновика:', error);
        }
    };

    useEffect(() => {
        getDraft();
    }, []);

    return (
        <>
            <Navibar />
            {applicationData && (
                <div className="main-card">
                    <div>{applicationData.application.application_id}</div>
                    {applicationData.documents.map((document: any, index: number) => (
                        <div key={index}>{document.document_title}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default DraftApp;
