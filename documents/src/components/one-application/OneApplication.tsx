import { FC, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Applications, Documents } from "../../api/DocumentsApi";
import "./OneApplication.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { Api } from "../../api/DocumentsApi";

export type AppTableProps = {
  application: Applications;
  documents: Documents[];
  client_email: string
  draft?: boolean;
  onSubmit: () => void;
  onSubmitDelete: () => void;
  reason: string;
  setReason: (reason: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  onSubmitUpdate: () => void;
};

const OneApplication: FC<AppTableProps> = ({
  application,
  documents,
  client_email,
  draft = false,
  onSubmit,
  onSubmitDelete,
  reason,
  setReason,
  setSurname,
  surname,
  onSubmitUpdate,
}) => {
  const [documentsTable, setDocuments] = useState(documents);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const api = new Api()

  useEffect(() => {
    setDocuments(documents);
  }, [documents]);

  const deleteDocApp = async (document_id: number) => {
    try {
      setLoading(true);

      const application = await axios.get("http://127.0.0.1:8000/applications/", {
        params: {
          status: "created",
        },
        withCredentials: true,
      });

      const application_id = application.data[0].application.application_id;

      await api.documentsApplicaions.documentsApplicaionsDelete(document_id.toString(), application_id)

      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.document_id !== document_id)
      );

      toast.success("Документ успешно удален");
      console.log('Длина ' + documentsTable.length)
      if (documentsTable.length === 1) {
        try{
          await api.applications.applicationsDelete(application_id)
        } catch{
          console.log("ошибка удаления заявки")
        }
        navigation("/front-end");
      }
    } catch (error) {
      console.error("Ошибка при удалении документа:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString: string | null | undefined) => {
    if (!dateTimeString) {
      return "-";
    }

    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <Card className="card-app">
        <Card.Body className="more-app-info">
          <div className="textStyle">
            <Card.Title className="more-app">
              Номер заявки: {application.application_id}
            </Card.Title>
          </div>
          <div className="more-app">
            <Card.Text className="more-app">
              Email Клиента: {client_email}
            </Card.Text>
            <Card.Text className="more-app">
              Дата создания: {formatDateTime(application.date_of_application_creation)}
            </Card.Text>
            <Card.Text className="more-app">
              Дата оформления: {formatDateTime(application.date_of_application_acceptance)}
            </Card.Text>
            <Card.Text className="more-app">
              Дата завершения:{" "}
              {application.date_of_application_completion
                ? formatDateTime(application.date_of_application_completion)
                : "-"}
            </Card.Text>
            <Card.Text className="more-app">Новая фамилия: {application.new_surname}</Card.Text>
            <Card.Text className="more-app">Причина: {application.reason_for_change}</Card.Text>

            <Card.Text className="more-app">
              {application?.application_status === "created"
                ? "Статус:Создана"
                : application?.application_status === "in_progress"
                ? "Статус: Сформирована"
                : application?.application_status === "completed"
                ? "Статус: Завершена"
                : application?.application_status === "deleted"
                ? "Статус: Удалена"
                : application?.application_status === "canceled"
                ? "Статус: Отменена"
                : "-"}
            </Card.Text>
            <hr></hr>
            <Card.Text className="more-app">Документы:</Card.Text>
          </div>
        </Card.Body>
      </Card>

      <>
        <Table className="tableDocs">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>№</th>
              <th>Название</th>
              <th>Цена</th>
              {draft && <th style={{ width: "5%" }}>Удалить</th>}
            </tr>
          </thead>
          <tbody>
            {documentsTable.map((document: Documents, index: number) => (
              <tr key={document.document_id}>
                <td>{++index}</td>
                <td>{document.document_title}</td>
                <td>{document.document_price} ₽</td>
                {draft && (
                  <td>
                    <Button
                      onClick={() => {
                        document.document_id && deleteDocApp(document.document_id);
                      }}
                      className="btnTrash"
                    >
                      {loading ? (
                        <RingLoader color="#007bff" loading={loading} size={20} />
                      ) : (
                        <FaTrash className="trash-doc" />
                      )}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {draft &&
            (
            <>
            <div className="apps-values">
            <input
                onChange={(event) => setSurname(event.target.value)}
                placeholder="Новая фамилия"
                value={surname}
                className="input-surname"
                type="search"
            ></input>
            <textarea
                placeholder="Причина"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="input-reason"
            ></textarea>
            </div>
            <div style={{ display: "flex", marginLeft: "555px", marginRight: "auto", marginBottom: 20 }}>
            <Button onClick={() => onSubmit()} className="btn-oform">
                Оформить
            </Button>
            <Button onClick={() => onSubmitDelete()} className="btn-delete">
                Удалить
            </Button>
            <Button onClick={() => onSubmitUpdate()} className="btn-delete">
                Сохранить
            </Button>
            </div></>)
        }
      </>
    </>
  );
};

export default OneApplication;
