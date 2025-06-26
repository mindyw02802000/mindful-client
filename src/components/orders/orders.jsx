
// // import { useSelector } from "react-redux"
// // import { useDispatch } from "react-redux";
// // import { getOrdersThunk } from "../redux/slices/getOrderThunk";
// // import { useNavigate } from "react-router-dom";
// // import './orders.css'
// // import { Home } from "./home";
// // import { Nivut } from "./nivut";
// // import { useEffect, useState } from "react";
// // import { getDetailingOrdersThunk } from "../redux/slices/getDetailingOrderThunk";
// // import { DetailingOrder, ShowDetailingOrder } from "./showDetailingOrder";
// // import { Maneger } from "./manegar";
// // export const Orders = () => {

// //     const orders = useSelector(state => state.orderSlice.orders)
// //     const detailingO=useSelector(state=>state.orderSlice.detailingOrders)
// //     const schoolName = useSelector(state => state.schoolsSlice.school.name)

// //     const [dialog,setDialog]=useState(false)
// //     const dispatch = useDispatch();

// //     useEffect(() => {
// //         getOrders()
// //     }, [])

// //     const getOrders = async() => {
// //       await  dispatch(getOrdersThunk())
// //     }
// //     const show =async(id) => {
// //         await  dispatch(getDetailingOrdersThunk(id))
// //         setDialog(true)
// //       }
// //     useEffect(() => {
// //         console.log("gggggggggggggggggggg",detailingO);
// //     }, [detailingO])
 
// //     return (
// //         <div >
// //           {schoolName=="maneger" && <Maneger></Maneger> || <Nivut></Nivut>}

// //             {/* <button className="buttonGet" onClick={() => getOrders()}>
// //                 הצגת כל ההזמנות
// //             </button> */}
// //             <table>
// //                 <thead>
// //                     <th>מספר הזמנה   </th>
// //                     <th>קוד מוסד   </th>
// //                     <th>איש קשר   </th>
// //                     <th>טלפון   </th>
// //                     <th>כתובת אירוע   </th>
// //                     <th>תאריך הזמנה   </th>
// //                     <th>תאריך אירוע   </th>
// //                     <th>מחיר לתשלום   </th>
// //                     <th>פרטי ההזמנה   </th>
// //                 </thead>
// //                 <tbody>

// //                     {orders?.map((e) => {
// //                         return <tr className="">
// //                             <th>{e.idOrder}</th>
// //                             <th>{e.idSchool}</th>
// //                             <th>{e.contact}</th>
// //                             <th>{e.phoneContact}</th>
// //                             <th>{e.provisionAddress}</th>
// //                             <th>{e.dateOfOrdder}</th>
// //                             <th>{e.dateOfEvent}</th>
// //                             <th>{e.costPrice}</th>
// //                             <th><button onClick={()=>show(e.idOrder)}>details</button></th>
// //                         </tr>
// //                     })}
// //                 </tbody>
// //             </table>
// //             {dialog === true && <ShowDetailingOrder  detailingOrders={detailingO} setd={setDialog}  />}
// //         </div>
// //     );
// // }


// // import { useSelector } from "react-redux"
// // import { useDispatch } from "react-redux";
// // import { getOrdersThunk } from "../redux/slices/getOrderThunk";
// // import { useNavigate } from "react-router-dom";
// // import './orders.css'
// // import { Home } from "./home";
// // import { Nivut } from "./nivut";
// // import { useEffect, useState } from "react";
// // import { getDetailingOrdersThunk } from "../redux/slices/getDetailingOrderThunk";
// // import { DetailingOrder, ShowDetailingOrder } from "./showDetailingOrder";
// // import { Maneger } from "./manegar";

// // export const Orders = () => {
// //     const orders = useSelector(state => state.orderSlice.orders)
// //     const detailingO = useSelector(state => state.orderSlice.detailingOrders)
// //     const schoolName = useSelector(state => state.schoolsSlice.school.name)
// //     const [dialog, setDialog] = useState(false)
// //     const dispatch = useDispatch();

// //     useEffect(() => {
// //         getOrders()
// //     }, [])

// //     const getOrders = async () => {
// //         await dispatch(getOrdersThunk())
// //     }

// //     const show = async (id) => {
// //         await dispatch(getDetailingOrdersThunk(id))
// //         setDialog(true)
// //     }

// //     useEffect(() => {
// //         console.log("gggggggggggggggggggg", detailingO);
// //     }, [detailingO])

// //     return (
// //         <div className="orders-container">
// //             {schoolName == "maneger" && <Maneger></Maneger> || <Nivut></Nivut>}
            
// //             <div className="orders-header">
// //                 <h2>ניהול הזמנות</h2>
// //                 <p>צפייה בכל ההזמנות שבוצעו במערכת</p>
// //             </div>

// //             <div className="table-container">
// //                 <table className="orders-table">
// //                     <thead>
// //                         <tr>
// //                             <th>מספר הזמנה</th>
// //                             <th>קוד מוסד</th>
// //                             <th>איש קשר</th>
// //                             <th>טלפון</th>
// //                             <th>כתובת אירוע</th>
// //                             <th>תאריך הזמנה</th>
// //                             <th>תאריך אירוע</th>
// //                             <th>מחיר לתשלום</th>
// //                             <th>פרטי ההזמנה</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {orders?.map((e) => {
// //                             return (
// //                                 <tr key={e.idOrder} className="order-row">
// //                                     <td>{e.idOrder}</td>
// //                                     <td>{e.idSchool}</td>
// //                                     <td>{e.contact}</td>
// //                                     <td>{e.phoneContact}</td>
// //                                     <td>{e.provisionAddress}</td>
// //                                     <td>{e.dateOfOrdder}</td>
// //                                     <td>{e.dateOfEvent}</td>
// //                                     <td className="price-cell">₪{e.costPrice}</td>
// //                                     <td>
// //                                         <button 
// //                                             className="details-button" 
// //                                             onClick={() => show(e.idOrder)}
// //                                         >
// //                                             הצג פרטים
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             )
// //                         })}
// //                     </tbody>
// //                 </table>
// //             </div>

// //             {dialog === true && <ShowDetailingOrder detailingOrders={detailingO} setd={setDialog} />}
// //         </div>
// //     );
// // }
// import React from 'react';
// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux";
// import { getOrdersThunk } from "../../redux/slices/getOrderThunk";
// // import { useNavigate } from "react-router-dom";
// import '../style/orders.css'
// // import { Home } from "../home";
// import { Nivut } from "../homePage/nivut";
// import { useEffect, useState } from "react";
// import { getDetailingOrdersThunk } from "../../redux/slices/getDetailingOrderThunk";
// import { DetailingOrder, ShowDetailingOrder } from "./showDetailingOrder";
// import { Maneger } from "../homePage/manegar";

// export const Orders = () => {
//     const orders = useSelector(state => state.orderSlice.orders)
//     const detailingO = useSelector(state => state.orderSlice.detailingOrders)
//     const schoolName = useSelector(state => state.schoolsSlice.school.name)
//     const [dialog, setDialog] = useState(false)
//     const dispatch = useDispatch();
    
//     // מצבים לסינון
//     const [dateFilter, setDateFilter] = useState("");
//     const [schoolFilter, setSchoolFilter] = useState("");
//     const [filteredOrders, setFilteredOrders] = useState([]);

//     useEffect(() => {
//         getOrders()
//     }, [])

//     useEffect(() => {
//         // עדכון הזמנות מסוננות כאשר יש שינוי בסינון או בהזמנות
//         if (orders) {
//             let result = [...orders];
            
//             if (dateFilter) {
//                 result = result.filter(order => 
//                     order.dateOfEvent.includes(dateFilter) || 
//                     order.dateOfOrdder.includes(dateFilter)
//                 );
//             }
            
//             if (schoolFilter) {
//                 result = result.filter(order => 
//                     order.idSchool.toString().includes(schoolFilter)
//                 );
//             }
            
//             setFilteredOrders(result);
//         }
//     }, [orders, dateFilter, schoolFilter]);

//     const getOrders = async () => {
//         await dispatch(getOrdersThunk())
//     }

//     const show = async (id) => {
//         await dispatch(getDetailingOrdersThunk(id))
//         setDialog(true)
//     }

//     // איפוס פילטרים
//     const resetFilters = () => {
//         setDateFilter("");
//         setSchoolFilter("");
//     }

//     return (
//         <div className="orders-page">
//             {schoolName == "maneger" && <Maneger></Maneger> || <Nivut></Nivut>}
            
//             <div className="orders-title">
//                 <h2>ניהול הזמנות</h2>
//             </div>
            
//             <div className="search-container">
//                 <div className="search-box">
//                     <label>חיפוש לפי תאריך:</label>
//                     <input 
//                         type="text" 
//                         placeholder="הזן תאריך..." 
//                         value={dateFilter}
//                         onChange={(e) => setDateFilter(e.target.value)}
//                     />
//                 </div>
                
//                 <div className="search-box">
//                     <label>חיפוש לפי קוד מוסד:</label>
//                     <input 
//                         type="text" 
//                         placeholder="הזן קוד מוסד..." 
//                         value={schoolFilter}
//                         onChange={(e) => setSchoolFilter(e.target.value)}
//                     />
//                 </div>
                
//                 <button className="reset-button" onClick={resetFilters}>
//                     איפוס סינון
//                 </button>
//             </div>

//             <div className="table-wrapper">
//                 <table className="orders-table">
//                     <thead>
//                         <tr>
//                             <th>מספר הזמנה</th>
//                             <th>קוד מוסד</th>
//                             <th>איש קשר</th>
//                             <th>טלפון</th>
//                             <th>כתובת אירוע</th>
//                             <th>תאריך הזמנה</th>
//                             <th>תאריך אירוע</th>
//                             <th>מחיר לתשלום</th>
//                             <th>פרטי ההזמנה</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredOrders.length > 0 ? (
//                             filteredOrders.map((e) => (
//                                 <tr key={e.idOrder} className="order-row">
//                                     <td>{e.idOrder}</td>
//                                     <td>{e.idSchool}</td>
//                                     <td>{e.contact}</td>
//                                     <td>{e.phoneContact}</td>
//                                     <td>{e.provisionAddress}</td>
//                                     <td>{e.dateOfOrdder}</td>
//                                     <td>{e.dateOfEvent}</td>
//                                     <td>{e.costPrice}</td>
//                                     <td>
//                                         <button 
//                                             className="details-btn" 
//                                             onClick={() => show(e.idOrder)}
//                                         >
//                                             פרטים
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="no-results">
//                                     לא נמצאו הזמנות מתאימות לחיפוש
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {dialog === true && <ShowDetailingOrder detailingOrders={detailingO} setd={setDialog} />}
//         </div>
//     );
// }

import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getOrdersThunk } from "../../redux/slices/getOrderThunk";
// import { deleteOrderThunk } from "../../redux/slices/deleteOrderThunk"; // נניח שיש thunk למחיקה
import '../style/orders.css'
import { Nivut } from "../homePage/nivut";
import { useEffect, useState } from "react";
import { getDetailingOrdersThunk } from "../../redux/slices/getDetailingOrderThunk";
import { ShowDetailingOrder } from "./showDetailingOrder";
import { Maneger } from "../homePage/manegar";
import { ShowDetailingOrder2 } from './showDetailingOrder2';
import { deleteOrderThunk } from '../../redux/slices/deleteOrderThunk';

// פונקציה לפורמט תאריך ל-dd/mm/yyyy
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback אם התאריך לא תקין
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const Orders = () => {
    const orders = useSelector(state => state.orderSlice.orders);
    const detailingO = useSelector(state => state.orderSlice.detailingOrders);
    const schoolName = useSelector(state => state.schoolsSlice.school.name);
    const dispatch = useDispatch();

    const [dialog, setDialog] = useState(false);

    // מצבים לסינון
    const [dateFilter, setDateFilter] = useState("");
    const [schoolNameFilter, setSchoolNameFilter] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        if (orders) {
            let result = [...orders];

            if (dateFilter) {
                result = result.filter(order =>
                    order.dateOfEvent.includes(dateFilter) ||
                    order.dateOfOrdder.includes(dateFilter)
                );
            }

            if (schoolNameFilter) {
                // חיפוש לפי שם מוסד במקום קוד מוסד
                // מניח שיש שדה בשם schoolName או schoolName במקום idSchool
                // אם אין, צריך להוסיף במקור הנתונים או לבצע התאמה
                // כאן נניח שיש שדה schoolName
                result = result.filter(order =>
                    order.schoolName?.toLowerCase().includes(schoolNameFilter.toLowerCase())
                );
            }

            setFilteredOrders(result);
        }
    }, [orders, dateFilter, schoolNameFilter]);

    const getOrders = async () => {
        await dispatch(getOrdersThunk());
    }

    const show = async (id) => {
        await dispatch(getDetailingOrdersThunk(id));
        setDialog(true);
    }

    const resetFilters = () => {
        setDateFilter("");
        setSchoolNameFilter("");
    }

    const deleteOrder = async (id) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק הזמנה זו?")) {
            //  await dispatch(deleteOrderThunk(id));
            // רענון הזמנות לאחר מחיקה
            getOrders();
        }
    }

    return (
        <div className="orders-page">
            {schoolName === "maneger" ? <Maneger /> : <Nivut />}

            <div className="orders-title">
                <h2>ניהול הזמנות</h2>
            </div>

            <div className="search-container">
                <div className="search-box">
                    <label>חיפוש לפי תאריך:</label>
                    <input
                        type="text"
                        placeholder="הזן תאריך (yyyy-mm-dd)..."
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                <div className="search-box">
                    <label>חיפוש לפי שם מוסד:</label>
                    <input
                        type="text"
                        placeholder="הזן שם מוסד..."
                        value={schoolNameFilter}
                        onChange={(e) => setSchoolNameFilter(e.target.value)}
                    />
                </div>

                <button className="reset-button" onClick={resetFilters}>
                    איפוס סינון
                </button>
            </div>

            <div className="table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>מספר הזמנה</th>
                            <th>קוד מוסד</th>
                            <th>שם מוסד</th>
                            <th>איש קשר</th>
                            <th>טלפון</th>
                            <th>כתובת אירוע</th>
                            <th>תאריך הזמנה</th>
                            <th>תאריך אירוע</th>
                            <th>מחיר לתשלום</th>
                            <th>פרטי ההזמנה</th>
                            <th>מחיקה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((e) => (
                                <tr key={e.idOrder} className="order-row">
                                    <td>{e.idOrder}</td>
                                    <td>{e.idSchool}</td>
                                    <td>{e.schoolName || "-"}</td>
                                    <td>{e.contact}</td>
                                    <td>{e.phoneContact}</td>
                                    <td>{e.provisionAddress}</td>
                                    <td>{formatDate(e.dateOfOrdder)}</td>
                                    <td>{formatDate(e.dateOfEvent)}</td>
                                    <td>₪{e.costPrice}</td>
                                    <td>
                                        <button
                                            className="details-btn"
                                            onClick={() => show(e.idOrder)}
                                        >
                                            פרטים
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteOrder(e.idOrder)}
                                            title="מחק הזמנה"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="no-results">
                                    לא נמצאו הזמנות מתאימות לחיפוש
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {dialog && <ShowDetailingOrder2 detailingOrders={detailingO} setd={setDialog} />}
        </div>
    );
}
