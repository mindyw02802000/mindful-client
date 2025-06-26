import React from 'react';
// import "./payment.css"
import { useState } from "react";
// import { payment } from "../redux/slices/loginthunk";
// import { Nivut } from "./nivut";
// import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";

export const Card=()=>{

    const [numder, setNumder] = useState("");
    const [flagN, setFlagN] = useState(false);
    const [date, setDate] = useState("");
    const [flagD, setFlagD] = useState(false);
    const [cvc, setCvc] = useState("");
    const [flagC, setFlagC] = useState(false);

    // const newOrder = useSelector(state => state.orderSlice.order);
    
    const save = ()=> {
       
       alert("התשלום בוצע בהצלחה")
      }
    return <>
 
  <div className="formContainer">
  <br />
    <label className="formLabel">הכנס מספר אשראי</label>
    <br />
    <input   className="formInput"  type="text" placeholder="מספר אשראי" onChange={(e) => {
    setNumder(e.target.value )
      if (e.target.value !== "") {
        setFlagN(true)
      }
      else
      setFlagN(false)
    }} />
    <br />
    <br />
    <label  className="formLabel">תוקף</label>
    <br />
    <input  className="formInput"  type="date" placeholder="תוקף" onChange={(e) => {
      setDate(e.target.value)
      if (e.target.value !== "") {
        setFlagD(true)
      }
      else
      setFlagD(false)
    }} />
    <br />
    <label className="formLabel">cvc</label>
    <br />
    <input   className="formInput"  type="text" placeholder="כתובת אספקה" onChange={(e) => {
      setCvc(e.target.value)
      if (e.target.value !== "") {
        setFlagC(true)
      }
      else
      setFlagC(false)
    }} />
   
   
   
<button className="formButton"  disabled={!flagC || !flagD ||!flagN } onClick={()=>save()}>תשלום</button>
  {/* {status===5  &&  navigate(`/home`)} */}
  </div>
    </>
    
    
    }

  
  