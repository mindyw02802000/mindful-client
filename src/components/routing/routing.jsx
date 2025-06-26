import React from 'react';
import { Orders } from "../orders/orders"
import { Home } from "../homePage/home"
import { Modell } from "../modells/modell"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { LogIn } from "../logIn/logIn"
import { Payment } from "../cart/payment"
import { LogOn } from "../logIn/logOn"
import { Calendar } from "../calender/calendar"
import { Card } from "../cart/card"
// import { Maneger } from "./manegar"
import { HomeManeger } from "../homePage/homeManeger"
import { Katalog } from "../modells/katalog"
import { Cart } from "../cart/Cart"
import { OrderConfirmation } from "../orders/OrderConfirmation"
import { ManageModels } from '../modells/ManageModels';





export const Routing=()=>{

return<>
<Routes>
<Route path={''} element={<Home/>}/>
<Route path={'/home'} element={<Home/>}/>
<Route path={'/Orders'} element={<Orders/>}/>
<Route path={'/Model'} element={<Modell/>}/>
<Route path={'/logon'} element={<LogOn/>}/>
<Route path={'/login'} element={<LogIn/>}/>
<Route path={'/maneger'} element={<HomeManeger/>}/>
<Route path={'/payment'} element={<Payment/>}/>
<Route path={'/calender'} element={<Calendar/>}/>
<Route path={'/craditCard'} element={<Card/>}/>
<Route path={'//katalog'} element={<Katalog/>}/>
<Route path={'/sal'} element={<Cart/>}/>
<Route path={'/order-confirmation'} element={<OrderConfirmation />}/> 
<Route path={'/ManageModels'} element={<ManageModels />}/> 


</Routes>



</>


}