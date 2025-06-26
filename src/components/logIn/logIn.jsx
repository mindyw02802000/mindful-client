
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/logIn.css";
import { logOnThunk } from "../../redux/slices/logOnThunk";
import { setEventDate, setLoggedOut } from "../../redux/slices/schoolsSlice";

export const LogIn = () => {
  const [flagN, setFlagFN] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [flagDate, setFlagDate] = useState(false);
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const school = useSelector(state => state.schoolsSlice.school);
  const savedEventDate = useSelector(state => state.schoolsSlice.eventDate);
  const isLoggedOut = useSelector(state => state.schoolsSlice.isLoggedOut);
  const newOrder = useSelector(state => state.orderSlice.order);
  const [maneger, setManeger] = useState('maneger');
  
  // בדיקה אם המשתמש כבר מחובר, אם כן - ניווט לדף הבית
  useEffect(() => {
    // אם המשתמש התנתק, נאפס את מצב ההתנתקות ונישאר בדף ההתחברות
    if (isLoggedOut) {
      dispatch(setLoggedOut(false));
      return;
    }
    
    // אחרת, אם יש משתמש מחובר, ננווט לדף הבית
    if (school && school.name && school.name.trim() !== "") {
      navigate('/home');
    }
  }, [school, navigate, isLoggedOut, dispatch]);
  const validateForm = () => {
    if (!schoolName.trim()) {
      setError("יש להזין שם מוסד");
      return false;
    }
    
    if (!dateOfEvent) {
      setError("יש לבחור תאריך אירוע");
      return false;
    }
    
    // בדיקה שהתאריך לא בעבר
    const selectedDate = new Date(dateOfEvent);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("לא ניתן לבחור תאריך שעבר");
      return false;
    }
    
    setError("");
    return true;
  };
  
  const handleLogin = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // שמירת התאריך ב-Redux
    dispatch(setEventDate(dateOfEvent));
    
    if (schoolName === "12345") {
      dispatch(logOnThunk(maneger))
        .then(() => {
          setIsLoading(false);
          navigate('/maneger');
        })
        .catch(() => {
          setIsLoading(false);
          setError("אירעה שגיאה בהתחברות, נסה שנית");
        });
    } else {
      // שליחת פעולת התחברות
      dispatch(logOnThunk(schoolName))
        .then((result) => {
          setIsLoading(false);
          // בדיקה אם ההתחברות הצליחה
          if (result.payload && result.payload.name) {
            navigate('/home');
          } else {
            navigate('/logon');
          }
        })
        .catch(() => {
          setIsLoading(false);
          setError("אירעה שגיאה בהתחברות, נסה שנית");
        });
    }
  };
  
  return (
    <div className="formContainer">
      <h2 className="formTitle">התחברות למערכת</h2>
      
      {error && (
        <div className="errorMessage">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      
      <label className="formLabel">שם מוסד</label>
      <input
        className="formInput"
        type="text"
        placeholder="הזן שם מוסד"
        value={schoolName}
        onChange={(e) => {
          setSchoolName(e.target.value);
          setFlagFN(e.target.value.trim() !== "");
          if (error) setError("");
        }}
      />
      
      <label className="formLabel">תאריך אירוע</label>
      <input
        className="formInput"
        type="date"
        placeholder="בחר תאריך אירוע"
        value={dateOfEvent}
        onChange={(e) => {
          setDateOfEvent(e.target.value);
          setFlagDate(e.target.value !== "");
          if (error) setError("");
        }}
      />
      
      <button
        className="formButton"
        disabled={!flagN || !flagDate || isLoading}
        onClick={handleLogin}
      >
        {isLoading ? "מתחבר..." : "התחבר"}
      </button>
      
      <div className="formFooter">
        עדיין לא רשום? <a href="#" onClick={() => navigate('/logon')}>הירשם עכשיו</a>
      </div>
    </div>
  );
};


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setEventDate, setLoggedOut } from "../../redux/slices/schoolsSlice";
// import { logOnThunk } from "../../redux/slices/logOnThunk";
// import "../style/logIn.css";

// export const LogIn = () => {
//   const [schoolName, setSchoolName] = useState("");
//   const [dateOfEvent, setDateOfEvent] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const school = useSelector(state => state.schoolsSlice.school);
//   const isLoggedOut = useSelector(state => state.schoolsSlice.isLoggedOut);
  
//   useEffect(() => {
//     if (isLoggedOut) {
//       dispatch(setLoggedOut(false));
//       return;
//     }
    
//     if (school && school.name && school.name.trim() !== "") {
//       navigate('/home');
//     }
//   }, [school, navigate, isLoggedOut, dispatch]);

//   const validateForm = () => {
//     if (!schoolName.trim()) {
//       setError("יש להזין שם מוסד");
//       return false;
//     }
    
//     if (!dateOfEvent) {
//       setError("יש לבחור תאריך אירוע");
//       return false;
//     }
    
//     const selectedDate = new Date(dateOfEvent);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (selectedDate < today) {
//       setError("לא ניתן לבחור תאריך שעבר");
//       return false;
//     }
    
//     setError("");
//     return true;
//   };

//   const handleLogin = () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
//     dispatch(setEventDate(dateOfEvent));

//     // בדוק אם שם המוסד קיים במערכת
//     dispatch(logOnThunk(schoolName))
//       .then((result) => {
//         setIsLoading(false);
//         if (result.payload && result.payload.name) {
//           navigate('/home');
//         } else {
//           // אם שם המוסד לא קיים, נווט לדף ההרשמה
//           navigate('/logon');
//         }
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setError("אירעה שגיאה בהתחברות, נסה שנית");
//       });
//   };

//   return (
//     <div className="formContainer">
//       <h2 className="formTitle">התחברות למערכת</h2>
      
//       {error && (
//         <div className="errorMessage">
//           <i className="fas fa-exclamation-circle"></i> {error}
//         </div>
//       )}
      
//       <label className="formLabel">שם מוסד</label>
//       <input
//         className="formInput"
//         type="text"
//         placeholder="הזן שם מוסד"
//         value={schoolName}
//         onChange={(e) => setSchoolName(e.target.value)}
//       />
      
//       <label className="formLabel">תאריך אירוע</label>
//       <input
//         className="formInput"
//         type="date"
//         placeholder="בחר תאריך אירוע"
//         value={dateOfEvent}
//         onChange={(e) => setDateOfEvent(e.target.value)}
//       />
      
//       <button
//         className="formButton"
//         disabled={isLoading}
//         onClick={handleLogin}
//       >
//         {isLoading ? "מתחבר..." : "התחבר"}
//       </button>
      
//       <div className="formFooter">
//         עדיין לא רשום? <a href="#" onClick={() => navigate('/logon')}>הירשם עכשיו</a>
//       </div>
//     </div>
//   );
// };
