
import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import "../style/logIn.css"; // משתמש באותו קובץ CSS
import { loginThunk } from "../../redux/slices/loginthunk";
// import { Nivut } from "./nivut";

export const LogOn = () => {
  const [flagN, setFlagFN] = useState(false);
  const [flagA, setFlagA] = useState(false);
  const [newSchool, setNewSchool] = useState({ idSchool: 0, name: '', addressSchool: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.schoolsSlice.status);
  
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!newSchool.name.trim()) {
      newErrors.name = "יש להזין שם מוסד";
      isValid = false;
    }
    
    if (!newSchool.addressSchool.trim()) {
      newErrors.addressSchool = "יש להזין כתובת מוסד";
      isValid = false;
    }
    
    if (!newSchool.phone.trim()) {
      newErrors.phone = "יש להזין מספר טלפון";
      isValid = false;
    } else if (!/^\d{9,10}$/.test(newSchool.phone)) {
      newErrors.phone = "מספר טלפון לא תקין (9-10 ספרות)";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const save = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    dispatch(loginThunk(newSchool))
      // .then(() => {
      //   setIsLoading(false);
        navigate(`/home`);
      // }
      // )
      // .catch(() => {
      //   setIsLoading(false);
      //   setErrors({ general: "אירעה שגיאה ברישום, נסה שנית" });
      // });
      // navigate(`/home`);
  };
  
  return (
    <div className="formContainer">
      <h2 className="formTitle">הרשמה למערכת</h2>
      
      {errors.general && (
        <div className="errorMessage">
          <i className="fas fa-exclamation-circle"></i> {errors.general}
        </div>
      )}
      
      <label className="formLabel">שם מוסד</label>
      <input
        className="formInput"
        type="text"
        placeholder="הזן שם מוסד"
        onChange={(e) => {
          setNewSchool({ ...newSchool, name: e.target.value });
          setFlagFN(e.target.value.trim() !== "");
          if (errors.name) setErrors({ ...errors, name: "" });
        }}
      />
      {errors.name && <div className="errorMessage">{errors.name}</div>}
      
      <label className="formLabel">כתובת מוסד</label>
      <input
        className="formInput"
        type="text"
        placeholder="הזן כתובת מוסד"
        onChange={(e) => {
          setNewSchool({ ...newSchool, addressSchool: e.target.value });
          setFlagA(e.target.value.trim() !== "");
          if (errors.addressSchool) setErrors({ ...errors, addressSchool: "" });
        }}
      />
      {errors.addressSchool && <div className="errorMessage">{errors.addressSchool}</div>}
      
      <label className="formLabel">טלפון</label>
      <input
        className="formInput"
        type="tel"
        placeholder="הזן מספר טלפון"
        onChange={(e) => {
          setNewSchool({ ...newSchool, phone: e.target.value });
          if (errors.phone) setErrors({ ...errors, phone: "" });
        }}
      />
      {errors.phone && <div className="errorMessage">{errors.phone}</div>}
      
      <button
        className="formButton"
        disabled={!flagN || !flagA || isLoading}
        onClick={() => save()}
      >
        {isLoading ? "מבצע רישום..." : "הירשם"}
      </button>
      
      <div className="formFooter">
        כבר רשום? <a href="#" onClick={() => navigate('/login')}>התחבר עכשיו</a>
      </div>
    </div>
  );
};