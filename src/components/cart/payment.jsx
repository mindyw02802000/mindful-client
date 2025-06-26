
import React from 'react';
//import "./payment.css"
import { useState } from "react";
// import { payment } from "../redux/slices/loginthunk";
import { Nivut } from "../homePage/nivut";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Maneger } from "../homePage/manegar";

export const Payment=()=>{

    const [contact, setContact] = useState("");
    const [flagC, setFlagC] = useState(false);
    const [provisionAddress, setProvisionAddress] = useState("");
    const [flagP, setFlagP] = useState(false);
    const [phoneContact, setPhoneContact] = useState("");
    const [flagF, setFlagF] = useState(false);

    const schoolName = useSelector(state => state.schoolsSlice.school.name)

    const newOrder = useSelector(state => state.orderSlice.order);
    
    const navigate=useNavigate()

    const save = ()=> {
        
        navigate(`/craditCard`)
      }
    return <>
    
    {schoolName=="maneger" && <Maneger></Maneger> || <Nivut></Nivut>}

         
  <div className="formContainer">
  <br />
    <label className="formLabel">איש קשר</label>
    <br />
    <input   className="formInput"  type="text" placeholder="איש קשר" onChange={(e) => {
        // newOrder.contact=e.target.value
    setContact(e.target.value)
      if (e.target.value !== "") {
        setFlagC(true)
      }
      else
      setFlagC(false)
    }} />
    <br />
    <br />
    <label  className="formLabel">פל' איש הקשר</label>
    <br />
    <input  className="formInput"  type="text" placeholder="פל' איש הקשר" onChange={(e) => {
    // newOrder.phoneContact=e.target.value
    setPhoneContact(e.target.value)
    
      if (e.target.value !== "") {
        setFlagF(true)
      }
      else
      setFlagF(false)
    }} />
    <br />
    <label className="formLabel">כתובת אספקה </label>
    <br />
    <input   className="formInput"  type="text" placeholder="כתובת אספקה" onChange={(e) => {
    //   newOrder.provisionAddress=e.target.value
      setProvisionAddress(e.target.value)
            if (e.target.value !== "") {
        setFlagP(true)
      }
      else
      setFlagP(false)
    }} />
   
   
   
<button className="formButton"  disabled={!flagF || !flagP ||!flagC } onClick={()=>save()}>אישור ותשלום</button>
  {/* {status===5  &&  navigate(`/home`)} */}
  </div>
    </>
    
    
    }

  
  