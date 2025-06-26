
import React, { useEffect, useRef, useState } from 'react';
import '../style/showDetailingOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderByIdThunk } from '../../redux/slices/getOrderByIdThunk';

export const ShowDetailingOrder2 = ({ detailingOrders, setd }) => {
    const dialogRef = useRef();
    const [idOrder, setIdOrder] = useState(null);
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

          

            <section className="order-items">
                <h3>  פריטים בהזמנה</h3>
                 <h2>הזמנה מספר {idOrder}</h2>
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
