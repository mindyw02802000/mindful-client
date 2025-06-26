import React from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nivut } from "../homePage/nivut";
import "../style/OrderConfirmation.css";
export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orders = useSelector(state => state.orderSlice.orders);
  const school = useSelector(state => state.schoolsSlice.school);
  
  // אם אין הזמנות או משתמש מחובר, ננווט לדף הבית
  useEffect(() => {
    if (!orders.length || !school || !school.name) {
      navigate('/');
    }
  }, [orders, school, navigate]);
  
  // אם אין הזמנות או משתמש מחובר, לא נציג את התוכן
  if (!orders.length || !school || !school.name) {
    return null;
  }
  
  // נשתמש בהזמנה האחרונה שבוצעה
  const latestOrder = orders[orders.length - 1];
  
  return (
    <div className="confirmation-page">
      <Nivut />
      
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1 className="confirmation-title">ההזמנה התקבלה בהצלחה!</h1>
          <p className="confirmation-subtitle">
            תודה שהזמנת אצלנו. פרטי ההזמנה נשלחו לדוא"ל שלך.
          </p>
        </div>
        
        <div className="order-details-card">
          <h2 className="details-title">פרטי ההזמנה</h2>
          
          <div className="details-row">
            <span className="details-label">מספר הזמנה:</span>
            <span className="details-value">{latestOrder.id}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">תאריך הזמנה:</span>
            <span className="details-value">
              {new Date(latestOrder.orderDate).toLocaleDateString('he-IL')}
            </span>
          </div>
          
          <div className="details-row">
            <span className="details-label">תאריך אירוע:</span>
            <span className="details-value">
              {new Date(latestOrder.eventDate).toLocaleDateString('he-IL')}
            </span>
          </div>
          
          <div className="details-row">
            <span className="details-label">סטטוס:</span>
            <span className="details-value status">{latestOrder.status}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">בית ספר:</span>
            <span className="details-value">{school.name}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">כתובת:</span>
            <span className="details-value">{school.addressSchool}</span>
          </div>
          
          <div className="details-row">
            <span className="details-label">טלפון:</span>
            <span className="details-value">{school.phone}</span>
          </div>
        </div>
        
        <div className="order-items-card">
          <h2 className="items-title">פריטים שהוזמנו</h2>
          
          <div className="items-list">
            <div className="items-header">
              <span className="header-item">דגם</span>
              <span className="header-item">מידה</span>
              <span className="header-item">כמות</span>
              <span className="header-item">מחיר</span>
              <span className="header-item">סה"כ</span>
            </div>
            
            {latestOrder.items.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-data">{item.idModel}</span>
                <span className="item-data">{item.size}</span>
                <span className="item-data">{item.count}</span>
                <span className="item-data">₪{item.price}</span>
                <span className="item-data total">₪{item.price * item.count}</span>
              </div>
            ))}
            
            <div className="items-footer">
              <div className="footer-row">
                <span className="footer-label">סה"כ פריטים:</span>
                <span className="footer-value">{latestOrder.totalItems}</span>
              </div>
              
              {latestOrder.note && (
                <div className="footer-row note">
                  <span className="footer-label">הערות:</span>
                  <span className="footer-value">{latestOrder.note}</span>
                </div>
              )}
              
              <div className="footer-row total">
                <span className="footer-label">סה"כ לתשלום:</span>
                <span className="footer-value">₪{latestOrder.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
        
         <div className="confirmation-actions">
          {/*<button 
            className="action-button primary"
            onClick={() => navigate('/orders')}
          >
            צפייה בכל ההזמנות
          </button> */}
          
          <button 
            className="action-button secondary"
            onClick={() => navigate('/model')}
          >
            המשך לקטלוג התלבושות
          </button>
        </div>
      </div>
    </div>
  );
};