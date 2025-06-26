// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux";
// import { getModelThunk } from "../redux/slices/getModelthunk";
// import { Nivut } from "./nivut";
// import './modell.css'
// import { getDetailingModelsThunk } from "../redux/slices/getDetailingModelsThunk";
// import { ShowDetailingModel } from "./showDetaillingModel";
// import { Maneger } from "./manegar";
// export const Modell = () => {
//   const [dialog, setDialog] = useState(false)
//   const [picture1, setPicture1] = useState()
//   const modells = useSelector(state => state.modellSlice.models)

//   const eventDate = useSelector(state => state.schoolsSlice.dateOfEvent)
//   const schoolName = useSelector(state => state.schoolsSlice.school.name)
//   // const detailsModel=useSelector(state=>state.detailngModelsSlice.detailsModel)
//   const detailsModel = useSelector(state => state.detailngModelsSlice.detailingModels)
//   const dispatch = useDispatch();
//   console.log(modells);
//   useEffect(() => {
//     if (modells.length == 0) getModels()
//   }, [])
//   const showDetails = async (id1, picture) => {
//     debugger
//     await dispatch(getDetailingModelsThunk({id1,eventDate}));
//     setDialog(true)
//     setPicture1(picture)
//   }
//   const getModels = async () => {
//     await dispatch(getModelThunk());
//   }
//   useEffect(() => {
//     if (detailsModel.length > 0) {
//       // alert("הזמנות לדגם זה:",detailsModel.Count+" "+detailsModel.idModel)
//       // alert(detailsModel.idModel,detailsModel.count)
//     }
//   }, [detailsModel])
//   return <div>
//     {schoolName=="maneger" && <Maneger></Maneger> || <Nivut></Nivut>}








import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { getModelThunk } from "../../redux/slices/getModelthunk";
import { Nivut } from "../homePage/nivut";
import '../style/modell.css'
import { getDetailingModelsThunk } from "../../redux/slices/getDetailingModelsThunk";
import { ShowDetailingModel } from "../modells/showDetaillingModel";
import { Maneger } from "../homePage/manegar";

export const Modell = () => {
  const [dialog, setDialog] = useState(false)
  const [picture1, setPicture1] = useState()
  const [selectedModel, setSelectedModel] = useState(null)
  const modells = useSelector(state => state.modellSlice.models)
  const eventDate = useSelector(state => state.schoolsSlice.dateOfEvent)
  const schoolName = useSelector(state => state.schoolsSlice.school.name)
  const detailsModel = useSelector(state => state.detailngModelsSlice.detailingModels)
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  console.log(modells);

  useEffect(() => {
    if (modells.length == 0) getModels()
  }, [])

  const showDetails = async (id1, picture, model) => {
    debugger
    await dispatch(getDetailingModelsThunk({id1, eventDate}));
    setDialog(true)
    setPicture1(picture)
    setSelectedModel(model)
  }

  const getModels = async () => {
    await dispatch(getModelThunk());
  }

  useEffect(() => {
    if (detailsModel.length > 0) {
      // alert("הזמנות לדגם זה:",detailsModel.Count+" "+detailsModel.idModel)
      // alert(detailsModel.idModel,detailsModel.count)
    }
  }, [detailsModel])

  // פונקציה לסינון דגמים לפי חיפוש וקטגוריה
  const filteredModels = modells.filter(model => {
    const matchesSearch = model.idModel.toString().includes(searchTerm) || 
                          model.kategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || model.kategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // יצירת רשימת קטגוריות ייחודיות
  const categories = [...new Set(modells.map(model => model.kategory))];

    // const Modell = ({ title, image, description }) => {
        return (
    <div className="models-page">
      {schoolName=="maneger" && <Maneger></Maneger> || <Nivut></Nivut>}
      
      <div className="models-header">
        <h1 className="models-title">קטלוג תלבושות</h1>
        <p className="models-subtitle">בחרו את התלבושות המושלמות לאירוע שלכם</p>
            </div>

      <div className="models-filters">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="חיפוש לפי מספר דגם או קטגוריה" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>

        <div className="category-filter">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-select"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="models-grid">
        {filteredModels && filteredModels.length > 0 ? (
          filteredModels.map((model) => (
            <div className="model-card" key={model.idModel}>
              <div className="model-image-container">
                <img className="model-image" src={`https://localhost:5000/img/${model.picture}`}  />
                <div className="model-overlay">
                  <button 
                    className="details-button"
                    onClick={() => showDetails(model.idModel, model.picture, model)}
                  >
                    צפייה בפרטים
                  </button>
                </div>
              </div>
              <div className="model-info">
                <h3 className="model-id">דגם: {model.idModel}</h3>
                <p className="model-category">קטגוריה: {model.kategory}</p>
                <p className="model-price">מחיר: ₪{model.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-models">
            <p>לא נמצאו דגמים תואמים לחיפוש</p>
          </div>
        )}
      </div>

      {dialog === true && (
        <ShowDetailingModel 
          detailingModel={detailsModel} 
          setd={setDialog} 
          picture={picture1}
          selectedModel={selectedModel}
        />
      )}
    </div>
        );
    };












