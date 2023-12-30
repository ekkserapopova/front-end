import { FC, useEffect, useState } from "react";
import Navibar from "../../components/navbar/Navibar";
import { Documents } from "../../modules/get-documents";
import { Button, Col, Row } from "react-bootstrap";
import Cards from "../../components/cards-list/Cards";
import "./DocumentsPage.css";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { mockDocuments } from "../../modules/get-documents";
import Search from "../../components/search-form/Search";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSeachValue } from "../../store/slices/searchSlice";
import { setSeachValueMin } from "../../store/slices/priceMinSlice";
import { setSeachValueMax } from "../../store/slices/priceMaxSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appSetReset } from "../../store/slices/draftSlice";
import { MdDelete } from "react-icons/md";

const Page: FC = () => {
  const [documents, setDocuments] = useState<Documents[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.value);
  const searchValueMin = useSelector((state: RootState) => state.min_price.min_value);
  const searchValueMax = useSelector((state: RootState) => state.max_price.max_value);
  const [appId, setAppId] = useState(-1);
  const appl = useSelector((state:RootState)  => state.draft.appId)
  const appl2 = useSelector((state:RootState)  => state.draft.app)
  const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
  const is_moderator = useSelector((state: RootState) => state.auth.is_moderator);
//   setAppId(appl)
  console.log(appl)

  const router = useNavigate();

  const handleSearchValueChange = (newValue: string) => {
    dispatch(setSeachValue(newValue));
  };

  const handleSearchValueMin = (newValue: string) => {
    dispatch(setSeachValueMin(newValue));
  };

  const handleSearchValueMax = (newValue: string) => {
    dispatch(setSeachValueMax(newValue));
  };

  const searchDocumentsPrice = async () => {
    try {
      const results = await axios.get('/documents/',{
        params:{
          title: searchValue,
          minprice: isNaN(Number(searchValueMax)) ? 0 : Number(searchValueMin),
          maxprice: searchValueMax === "" ? 100000 : Number(searchValueMax)
        },
        withCredentials: true
      }, )

      setDocuments(results.data.documents);

      const draftApp = async () => {
        try {
          const app = results.data.draft_id
          console.log(app)
          dispatch(appSetReset({appId: app}))
          setAppId(app);
          console.log(appl)
          // dispatch(appSetReset(appId))
        } catch {
          console.log("нет черновика");
        }
      };
      draftApp();
    } catch {
      setDocuments(mockDocuments);
    }
  };

  const handleDraftButtonClick = () => {
    searchDocumentsPrice()
    dispatch(appSetReset({appId: appl}))
    if (appId === undefined){
        toast.error("Заявка отсутствует");
    }else if (appId !== -1 || appl2) {
      console.log(appl)
        router(`/front-end/userapplications/${appl}`, { replace: true });
    } else {
        toast.error("Заявка отсутствует");
    }
  };

  const breadcrumbsItems = [{ label: "Все документы", link: "" }];

  useEffect(() => {
    searchDocumentsPrice();
  }, [appl2]);

  return (
    <>
      <Navibar draft={true} />
      <Breadcrumbs items={breadcrumbsItems} />
      {is_authenticated && (!is_moderator ?
      <Button className={appl !== -1 ? "draft" : "draft2"} onClick={handleDraftButtonClick}>
        Текущая заявка
      </Button>
      : 
        <MdDelete onClick={() => router(`/front-end/trash`, {replace: true})} className='trash' />)
      }

      <Search
        value={searchValue}
        setValue={(searchValue) => handleSearchValueChange(searchValue)}
        onSubmit={searchDocumentsPrice}
        valueMax={isNaN(Number(searchValueMax)) ? searchValueMax.replace(/[^0-9]/g, "") : searchValueMax}
        errorMax={isNaN(Number(searchValueMax)) ? true : false}
        errorMin={isNaN(Number(searchValueMin)) ? true : false}
        valueMin={isNaN(Number(searchValueMin)) ? searchValueMin.replace(/[^0-9]/g, "") : searchValueMin}
        setValueMax={(searchValueMax) => handleSearchValueMax(searchValueMax)}
        setValueMin={(searchValueMin) => handleSearchValueMin(searchValueMin)}
        onSubmitPrice={searchDocumentsPrice}
      />

      <Row md={4} className="row-main">
        {documents?.map((item, index) => (
          <Col key={index} className="g-col">
            <Cards {...item} udal={searchDocumentsPrice}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Page;
