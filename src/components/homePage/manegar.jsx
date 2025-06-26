import React from 'react';
import '../style/home.css'
// import { Orders } from './orders';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { LogIn } from './logIn';
import { useNavigate } from 'react-router-dom';

// import { payment } from './payment';

export const Maneger = () => {
   // const [dialog, setDialog] = useState(false);

   const navigate = useNavigate();

   const goToModel = () => {
      navigate(`/Model`)
   }
   const goToOrders = () => {
      navigate(`/Orders`)
   }
   // const login = () => {
   //    // setDialog(true)
   //    navigate(`/logIn`)
   // }
   const payment = () => {
      navigate(`/payment`)
   }
    const calender = () => {
      navigate(`/calender`)
   }
   const home = () => {
      navigate(`/maneger`)
   } 
   const ManageModels = () => {
      navigate(`/ManageModels`)
   }
  
   return <div>
      <div className="header">
         {/* <div className='navigate' onClick={() => goToModel()}>תלבושות</div> */}
         <div className='navigate' onClick={() => goToOrders()}>הזמנות</div>
         {/* <div className='navigate' onClick={() => login()}> רישום </div> */}
         {/* <div className='navigate' onClick={() => payment()}> תשלום </div> */}
           <div className='navigate' onClick={() => calender()}> יומן הזמנות </div>
             <div className='navigate' onClick={() => ManageModels()}>ניהול דגמים</div>
           <div className='navigate' onClick={() =>home()}>דף הבית</div>
      </div>
      {/* <img  className='logo' src="logo.jpg"  /> */}
      {/* {dialog === true && <LogIn />} */}
   </div>


}
