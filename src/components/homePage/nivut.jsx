
import { LogoutButton } from '../logIn/LogoutButton';
import React from 'react';
import '../style/home.css';
// import { Orders } from './orders';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { LogIn } from './logIn';
import { useNavigate } from 'react-router-dom';
// import { payment } from './payment';

export const Nivut = () => {
   // const [dialog, setDialog] = useState(false);

   const navigate = useNavigate();
   
   const nivut=()=>{
     navigate('/login')
 
   }
 
   const goToModel = () => {
      navigate(`/Model`)
   }
   const goToOrders = () => {
      navigate(`/Orders`)
   }

   const payment = () => {
      navigate(`/payment`)
   }
    const calender = () => {
      navigate(`/calender`)
   } 
   const katalog = () => {
      navigate(`/katalog`)
   }
   const home = () => {
      navigate(`/home`)
   } 
   const cart = () => {
      navigate(`/sal`)
   }
   return <div>
      <div className="header">
         <div className='navigate' onClick={() => goToModel()}>תלבושות </div>
         <div className='navigate' onClick={() => katalog()}> לצפיה בקטלוגים שלנו </div>
         <div className='navigate' onClick={() =>home()}>דף הבית</div>
         <div className='navigate' onClick={() =>cart()}>לצפיה בסל</div>
           {/* <button onClick={()=>nivut()}>התחברות</button> */}
           {/* <LogoutButton />הוספת כפתור ההתנתקות */}


      </div>
      {/* <img  className='logo' src="logo.jpg"  /> */}
      {/* {dialog === true && <LogIn />} */}
   </div>


}
