
// // import { useState } from "react";
// // import { useSelector } from "react-redux"
// // import { useNavigate, useParams } from "react-router-dom";
// // import { getDetailingOrdersThunk } from "../redux/slices/getDetailingOrderThunk";
// import { useEffect, useRef } from "react";
// import './showDetailingOrder.css'
// import { useDispatch } from "react-redux";

// export const ShowDetailingOrder=(prop)=>{
//   debugger
//   const {detailingOrders,setd}=prop
//     const refDailog = useRef();
//     const dispatch = useDispatch();
 
//     // const detailingO=useSelector(state=>state.orderSlice.detailingOrders)
  
//     const dispach =async(id) => {
//       // await  dispatch(getDetailingOrdersThunk(id))
      
//     }
//     useEffect(() => {
      
//       // dispach(id)
//       refDailog.current.showModal();
     
//     }, [])
   
//     return <dialog ref={refDailog} className="dialog"> 
//         <div onClick={() => {
//             setd(false)
//             }}>❌</div>
//               {detailingOrders?.map((e) => {
//                         return <div className="">
//                             <label> דגם: {e.idModel} </label>
//                             <label>מידה: {e.size} </label>
//                             <label>כמות: {e.count} </label>
//                         </div>
//                     })}
//     </dialog>
// }

// import { useEffect, useRef } from "react";
// import './showDetailingOrder.css'
// import { useDispatch } from "react-redux";

// export const ShowDetailingOrder = (prop) => {
//     const { detailingOrders, setd } = prop
//     const refDailog = useRef();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         refDailog.current.showModal();
//     }, [])

//     const closeDialog = () => {
//         refDailog.current.close();
//         setd(false);
//     }

//     return (
//         <dialog ref={refDailog} className="details-dialog">
//             <div className="dialog-header">
//                 <h3>פרטי הזמנה</h3>
//                 <button className="close-button" onClick={closeDialog}>✕</button>
//             </div>
            
//             <div className="dialog-content">
//                 <div className="items-grid">
//                     {detailingOrders?.map((e, index) => (
//                         <div key={index} className="order-item">
//                             <div className="item-header">פריט {index + 1}</div>
//                             <div className="item-details">
//                                 <div className="detail-row">
//                                     <span className="detail-label">דגם:</span>
//                                     <span className="detail-value">{e.idModel}</span>
//                                 </div>
//                                 <div className="detail-row">
//                                     <span className="detail-label">מידה:</span>
//                                     <span className="detail-value">{e.size}</span>
//                                 </div>
//                                 <div className="detail-row">
//                                     <span className="detail-label">כמות:</span>
//                                     <span className="detail-value">{e.count}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
            
//             <div className="dialog-footer">
//                 <button className="close-dialog-button" onClick={closeDialog}>סגור</button>
//             </div>
//         </dialog>
//     )}

// import React from 'react';
// import { useEffect, useRef } from "react";

// import '../style/showDetailingOrder.css'
// import { useDispatch } from "react-redux";

// export const ShowDetailingOrder = (prop) => {
//     const { detailingOrders, setd } = prop
//     const refDailog = useRef();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         refDailog.current.showModal();
//     }, [])

//     const closeDialog = () => {
//         setd(false);
//     }

//     return (
//         <dialog ref={refDailog} className="details-dialog">
//             <div className="dialog-header">
//                 <h3>פרטי ההזמנה</h3>
//                 <div className="close-btn" onClick={closeDialog}>❌</div>
//             </div>
            
//             <div className="dialog-content">
//                 {detailingOrders?.length > 0 ? (
//                     detailingOrders.map((e, index) => (
//                         <div key={index} className="item-card">
//                             <div className="item-number">פריט {index + 1}</div>
//                             <div className="item-info">
//                                 <label>דגם: <span>{e.idModel}</span></label>
//                                 <label>מידה: <span>{e.size}</span></label>
//                                 <label>כמות: <span>{e.count}</span></label>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="no-items">לא נמצאו פריטים בהזמנה זו</div>
//                 )}
//             </div>
//         </dialog>
//     );
// }
// import React, { useEffect, useRef } from 'react';
// import '../style/showDetailingOrder.css';
// import { useDispatch } from 'react-redux';

// export const ShowDetailingOrder = ({ detailingOrders, setd }) => {
//     const refDialog = useRef();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (refDialog.current) {
//             refDialog.current.showModal();
//         }
//     }, []);

//     const closeDialog = () => {
//         setd(false);
//     };

//     return (
//         <dialog ref={refDialog} className="details-dialog" aria-modal="true" role="dialog" aria-labelledby="dialog-title">
//             <div className="dialog-header">
//                 <h3 id="dialog-title">פרטי ההזמנה</h3>
//                 <button
//                     className="close-btn"
//                     onClick={closeDialog}
//                     aria-label="סגור פרטי הזמנה"
//                 >
//                     ❌
//                 </button>
//             </div>

//             <div className="dialog-content">
//                 {detailingOrders?.length > 0 ? (
//                     detailingOrders.map((item, index) => (
//                         <div key={index} className="item-card" tabIndex={0} aria-label={`פריט מספר ${index + 1}`}>
//                             <div className="item-number">פריט {index + 1}</div>
//                             <div className="item-info">
//                                 <label>דגם: <span>{item.idModel}</span></label>
//                                 <label>מידה: <span>{item.size}</span></label>
//                                 <label>כמות: <span>{item.count}</span></label>
//                                 {/* תוספת פרטים חדשים */}
//                                 <label>מחיר ליחידה: <span>₪{item.unitPrice ?? 'לא זמין'}</span></label>
//                                 <label>סה"כ מחיר: <span>₪{item.count && item.unitPrice ? (item.count * item.unitPrice).toFixed(2) : 'לא זמין'}</span></label>
//                                 <label>הערות: <span>{item.notes ?? 'אין הערות'}</span></label>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="no-items">לא נמצאו פריטים בהזמנה זו</div>
//                 )}
//             </div>

//             <div className="dialog-footer">
//                 <button className="close-dialog-btn" onClick={closeDialog} aria-label="סגור חלון פרטי הזמנה">
//                     סגור
//                 </button>
//             </div>
//         </dialog>
//     );
// };


// import React, { useEffect, useRef, useState } from 'react';
// import '../style/showDetailingOrder.css';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { getOrderByIdThunk } from '../../redux/slices/getOrderByIdThunk';

// export const ShowDetailingOrder = ({ detailingOrders, setd }) => {
//     const dialogRef = useRef();
//    const [idOrder, setIdOrder] = useState(null);
//     const order=useSelector(state => state.orderSlice.order);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         if (dialogRef.current) {
//             dialogRef.current.showModal();
//         }
//     }, []);

//     useEffect(() => {
//        getOrderById(idOrder);
//     }, [idOrder]);
//     const closeDialog = () => {
//         setd(false);
//     };
//  const getOrderById = (id) => {
//     dispatch(getOrderByIdThunk(id));
//     };
//     return (
//         <dialog ref={dialogRef} className="order-details-dialog" aria-modal="true" role="dialog" aria-labelledby="order-details-title">
//             <header className="dialog-header">
//                 <h2 id="order-details-title">פרטי הזמנה</h2>
//                 <button className="close-button" onClick={closeDialog} aria-label="סגור חלון פרטי הזמנה">×</button>
//             </header>

//             <section className="order-summary">
//                 <h3>פרטי הזמנה כלליים</h3>
//                 <div className="summary-grid">
//                     <div>
//                         <strong>מספר הזמנה:</strong> {order?.idOrder || '-'}
//                     </div>
//                     <div>
//                         <strong>מוסד:</strong> {order?.schoolName || '-'}
//                     </div>
//                     <div>
//                         <strong>איש קשר:</strong> {order?.contact || '-'}
//                     </div>
//                     <div>
//                         <strong>טלפון:</strong> {order?.phoneContact || '-'}
//                     </div>
//                     <div className="full-width">
//                         <strong>כתובת אירוע:</strong> {order?.provisionAddress || '-'}
//                     </div>
//                     <div>
//                         <strong>תאריך הזמנה:</strong> {order?.dateOfOrder || '-'}
//                     </div>
//                     <div>
//                         <strong>תאריך אירוע:</strong> {order?.dateOfEvent || '-'}
//                     </div>
//                     <div>
//                         <strong>מחיר לתשלום:</strong> ₪{order?.costPrice ?? '-'}
//                     </div>
//                 </div>
//             </section>

//             <section className="order-items">
//                 <h3>פרטי פריטים בהזמנה</h3>
//                 {detailingOrders?.length > 0 ? (
//                     detailingOrders.map((item, idx) => {
//                         setIdOrder(item.idOrder);
//                         return (
//                             <article key={idx} className="item-card" tabIndex={0} aria-label={`פריט מספר ${idx + 1}`}>
//                                 <div className="item-header">
//                                     <span>פריט {idx + 1}</span>
//                                 </div>
//                                 <ul className="item-details">
//                                     {/* <li><strong>מספר הזמנה:</strong> {item.idOrder}</li> */}
                                   
//                                     <li><strong>דגם:</strong> {item.idModel || '-'}</li>
//                                     <li><strong>מידה:</strong> {item.size || '-'}</li>
//                                     <li><strong>כמות:</strong> {item.count || '-'}</li>
//                                     <li><strong>מחיר ליחידה:</strong> ₪{item.unitPrice ?? '-'}</li>
//                                     <li><strong>סה"כ מחיר:</strong> ₪{item.count && item.unitPrice ? (item.count * item.unitPrice).toFixed(2) : '-'}</li>
//                                     <li><strong>הערות:</strong> {item.notes || 'אין הערות'}</li>
//                                 </ul>
//                             </article>
//                         );
//                     })                ) : (
//                     <p className="no-items">לא נמצאו פריטים להזמנה זו</p>
//                 )}
//             </section>

//             <footer className="dialog-footer">
//                 <button className="close-dialog-btn" onClick={closeDialog} aria-label="סגור חלון פרטי הזמנה">
//                     סגור
//                 </button>
//             </footer>
//         </dialog>
//     );
// };



import React, { useEffect, useRef, useState } from 'react';
import '../style/showDetailingOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderByIdThunk } from '../../redux/slices/getOrderByIdThunk';

export const ShowDetailingOrder = ({ detailingOrders, setd }) => {
    const dialogRef = useRef();
    const [idOrder, setIdOrder] = useState(null);
    const order = useSelector(state => state.orderSlice.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    // קובע את idOrder פעם אחת כש-detailingOrders משתנה
    useEffect(() => {
        if (detailingOrders && detailingOrders.length > 0) {
            setIdOrder(detailingOrders[0].idOrder);
        }
    }, [detailingOrders]);

    // שולח את הבקשה לקבלת פרטי הזמנה לפי idOrder
    useEffect(() => {
        if (idOrder) {
            dispatch(getOrderByIdThunk(idOrder));
        }
    }, [idOrder]);

    const closeDialog = () => {
        setd(false);
    };

    return (
        <dialog
            ref={dialogRef}
            className="order-details-dialog"
            aria-modal="true"
            role="dialog"
            aria-labelledby="order-details-title"
        >
            <header className="dialog-header">
                <h2 id="order-details-title">פרטי הזמנה</h2>
                <button
                    className="close-button"
                    onClick={closeDialog}
                    aria-label="סגור חלון פרטי הזמנה"
                >
                    ×
                </button>
            </header>

            <section className="order-summary">
                <h3>פרטי הזמנה כלליים</h3>
                <div className="summary-grid">
                    <div>
                        <strong>מספר הזמנה:</strong> {order?.idOrder || '-'}
                    </div>
                    <div>
                        <strong>מוסד:</strong> {order?.schoolName || '-'}
                    </div>
                    <div>
                        <strong>איש קשר:</strong> {order?.contact || '-'}
                    </div>
                    <div>
                        <strong>טלפון:</strong> {order?.phoneContact || '-'}
                    </div>
                    <div className="full-width">
                        <strong>כתובת אירוע:</strong> {order?.provisionAddress || '-'}
                    </div>
                    <div>
                        <strong>תאריך הזמנה:</strong> {order?.dateOfOrder || '-'}
                    </div>
                    <div>
                        <strong>תאריך אירוע:</strong> {order?.dateOfEvent || '-'}
                    </div>
                    <div>
                        <strong>מחיר לתשלום:</strong> ₪{order?.costPrice ?? '-'}
                    </div>
                </div>
            </section>

            <section className="order-items">
                <h3> פריטים בהזמנה</h3>
                {detailingOrders?.length > 0 ? (
                    detailingOrders.map((item, idx) => (
                        <article
                            key={idx}
                            className="item-card"
                            tabIndex={0}
                            aria-label={`פריט מספר ${idx + 1}`}
                        >
                            <div className="item-header">פריט {idx + 1}</div>
                            <ul className="item-details">
                                <li>
                                    <strong>דגם:</strong> {item.idModel || '-'}
                                </li>
                                <li>
                                    <strong>מידה:</strong> {item.size || '-'}
                                </li>
                                <li>
                                    <strong>כמות:</strong> {item.count || '-'}
                                </li>
                          
                                <li>
                                    <strong>הערות:</strong> {item.notes || 'אין הערות'}
                                </li>
                            </ul>
                        </article>
                    ))
                ) : (
                    <p className="no-items">לא נמצאו פריטים להזמנה זו</p>
                )}
            </section>

            <footer className="dialog-footer">
                <button
                    className="close-dialog-btn"
                    onClick={closeDialog}
                    aria-label="סגור חלון פרטי הזמנה"
                >
                    סגור
                </button>
            </footer>
        </dialog>
    );
};
