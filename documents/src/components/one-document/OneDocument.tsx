import { FC, useEffect, useState, ChangeEvent } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Documents } from "../../api/DocumentsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './OneDocument.css'

interface DocProps {
  document: Documents;
}

const SignUp: FC<DocProps> = ({ document }) => {
  const [doc, setDoc] = useState<Documents | undefined>(document);
  const router = useNavigate()

  useEffect(() => {
    // Установка начальных значений из document при первоначальной загрузке
    setDoc(document);
    console.log(document)
  }, [document]);

  const saveDoc = async () => {
    try {
        console.log(doc)
      await axios.put(`/documents/${doc?.document_id}/`, doc, {
        withCredentials: true,
      });
      toast.success('Документ успешно изменен')
    //   console.log(doc)
      // Дополнительная обработка после успешного сохранения, если необходимо
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      // Обработка ошибки при сохранении
    }
  };

  const newDoc = async () => {
    try {
      await axios.post(`/documents/`, doc, {
        withCredentials: true,
      });
      toast.success('Успншно')
      router('/front-end/documents')
    } catch {
      toast.error('Заполните все обязательные поля')
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDoc((prev) => ({ ...prev, [name]: value } as Documents)); 
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Выбранный файл:", file.name);
      // Добавляем файл в поле document_image
      setDoc((prev) => ({ ...prev, document_image: file.name } as Documents));
    }
  };

  return (
    <>
      <Card className="doc-card">
        <div className="doc-card-content">
          <div className="doc-text">{doc?.document_id}</div>
          <div className="doc-input">
            <div style={{backgroundColor: 'aliceblue'}}>Название</div>
            <input
              placeholder="Название - обязательное поле"
              value={doc?.document_title || ""}
              onChange={handleInputChange}
              name="document_title"
              className="doc-input-title"
              type="search"
            />
            <div style={{backgroundColor: 'aliceblue'}}>Краткое описание</div>
            <textarea
              style={{ height: 150 }}
              placeholder="Краткое описание"
              value={doc?.document_overview || ""}
              onChange={handleInputChange}
              name="document_overview"
              className="doc-input-overview"
            ></textarea>
            <div style={{backgroundColor: 'aliceblue'}}>Описание</div>
            <textarea
              style={{ height: 150 }}
              placeholder="Описание"
              value={doc?.document_description || ""}
              onChange={handleInputChange}
              name="document_description"
              className="doc-input-description"
            ></textarea>
            <div style={{backgroundColor: 'aliceblue'}}>Цена</div>
            <input
              placeholder="Цена - обязательное поле"
              value={doc?.document_price || ""}
              onChange={handleInputChange}
              name="document_price"
              className="doc-input-price"
              type="search"
            />
            <input
                className="doc-input-file"
                type="file"
                onChange={handleFileChange}
                value={''} // Reset the value to an empty string
                />
            
          </div>
          <Button className="doc-btn" onClick={document !== undefined ? saveDoc : newDoc}>
            Сохранить
          </Button>
        </div>
      </Card>
    </>
  );
};

export default SignUp;
