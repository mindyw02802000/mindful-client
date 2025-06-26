import React from 'react';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nivut } from "../homePage/nivut";
import { removeFromCart, updateItemQuantity, placeAllOrders, clearCart } from "../../redux/slices/OrderSlice";

import "../style/Cart.css";
import { saveOrderToServer } from "../../redux/slices/saveOrderToServerThunk";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.orderSlice.cart);
  const totalItems = useSelector(state => state.orderSlice.totalItems);
  const totalPrice = useSelector(state => state.orderSlice.totalPrice);
  const school = useSelector(state => state.schoolsSlice.school);
  const loading = useSelector(state => state.orderSlice.loading);
  const error = useSelector(state => state.orderSlice.error);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    contact: "",
    phoneContact: "",
    provisionAddress: ""
  });
  useEffect(() => {
    // אם אין משתמש מחובר, ננווט לדף ההתחברות
    if (!school || !school.name) {
      navigate('/login');
    }
  }, [school, navigate]);

  const handleRemoveItem = (orderId, itemId, size) => {
     dispatch(removeFromCart({ orderId, itemId, size }));
  };

  const handleUpdateQuantity = (orderId, itemId, size, quantity) => {
     dispatch(updateItemQuantity({ orderId, itemId, size, quantity }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
   
    // בדיקת תקינות פרטי קשר
    if (!contactInfo.contact || !contactInfo.phoneContact || !contactInfo.provisionAddress) {
        alert("נא למלא את כל פרטי הקשר");
        return;
      }
   
   
      setIsSubmitting(true);
    
      try {
        // הכנת אובייקט ההזמנה לשליחה לשרת
        const serverOrder = {
          idOrder: 0, // יוגדר על ידי השרת
          idSchool: school.idSchool,
          contact: contactInfo.contact,
          phoneContact: contactInfo.phoneContact,
          provisionAddress: contactInfo.provisionAddress,
          dateOfOrdder: new Date().toISOString(),
          dateOfEvent: cart[0]?.eventDate || new Date().toISOString(), // אם יש כמה הזמנות, נשתמש בראשונה
          costPrice: totalPrice,
          schoolName: school.name,
          detailingOrders: []
        };
          // המרת פריטי הסל למבנה הנדרש עבור detailingOrders
      cart.forEach(order => {
        order.items.forEach(item => {
          serverOrder.detailingOrders.push({
            idOrder: 0, // יוגדר על ידי השרת
            idModel: item.idModel,
            size: item.size,
            count: item.count
          });
        });
      });
      // .unwrap()
   await dispatch(saveOrderToServer(serverOrder));
   // עדכון סטטוס ההזמנות במערכת
    dispatch(placeAllOrders());
   setOrderPlaced(true);
   // ניווט לדף אישור הזמנה אחרי 2 שניות
   setTimeout(() => {
     navigate('/order-confirmation');
   }, 2000);
 } catch (err) {
   alert(err);
   console.error("שגיאה בשמירת ההזמנה:", err);
   alert("אירעה שגיאה בשמירת ההזמנה. אנא נסה שנית.");
 } finally {
   setIsSubmitting(false);
 }
  };

  const handleClearCart = () => {
    if (window.confirm('האם אתה בטוח שברצונך לרוקן את הסל?')) {
     dispatch(clearCart());
    }
  };

  // אם אין משתמש מחובר, לא נציג את התוכן
  if (!school || !school.name) {
    return null;
  }

  return (
    <div className="cart-page">
      <Nivut />
      
      <div className="cart-container">
        <h1 className="cart-title">סל הקניות שלך</h1>
        
        {   cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <p className="empty-cart-message">הסל שלך ריק</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/model')}
            >
              המשך לקטלוג התלבושות
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              { cart && cart.map((order, orderIndex) => (
                <div key={orderIndex} className="order-card">
                  <div className="order-header">
                    <h3 className="order-title">הזמנה לתאריך: {new Date(order.eventDate).toLocaleDateString('he-IL')}</h3>
                  </div>
                  
                  <div className="order-items">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="cart-item">
                        <div className="item-image">
                          {/* כאן יכולה להיות תמונה של הפריט */}
                          <div className="item-placeholder">
                            דגם {item.idModel}
                          </div>
                        </div>
                        
                        <div className="item-details">
                          <h4 className="item-title">דגם {item.idModel}</h4>
                          <p className="item-size">מידה: {item.size}</p>
                          <p className="item-price">מחיר: ₪{item.price}</p>
                        </div>
                        
                        <div className="item-quantity">
                          <div className="quantity-control">
                            <button 
                            //   className="quantity-button minus"
                            //   onClick={() => {
                            //     if (item.count > 1) {
                            //       handleUpdateQuantity(order.id, item.idModel, item.size, item.count - 1);
                            //     }
                            //   }}
                            //   disabled={item.count <= 1}
                            className="quantity-button"
                            onClick={() => handleUpdateQuantity(order.id, item.idModel, item.size, Math.max(1, item.count - 1))}
                            disabled={item.count <= 1}
                            >
                              -
                            </button>
                            
                            <span className="quantity-value">{item.count}</span>
                            
                            <button 
                            //   className="quantity-button plus"
                            //   onClick={() => {
                            //     if (item.count < item.maxCount) {
                            //       handleUpdateQuantity(order.id, item.idModel, item.size, item.count + 1);
                            //     }
                            //   }}
                            //   disabled={item.count >= item.maxCount}
                            className="quantity-button"
                            onClick={() => handleUpdateQuantity(order.id, item.idModel, item.size, Math.min(item.maxCount || 100, item.count + 1))}
                            disabled={item.count >= (item.maxCount || 100)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="item-total">
                          ₪{item.price * item.count}
                        </div>
                        
                        <button 
                          className="remove-item-btn"
                          onClick={() => handleRemoveItem(order.id, item.idModel, item.size)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {order.note && (
                    <div className="order-note">
                      <h4 className="note-title">הערות להזמנה:</h4>
                      <p className="note-content">{order.note}</p>
                    </div>
                  )}
                  
                  <div className="order-summary">
                    <div className="order-total-items">
                      סה"כ פריטים: {order.totalItems}
                    </div>
                    <div className="order-total-price">
                      סה"כ: ₪{order.totalPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-sidebar">
              <div className="cart-summary">
                <h3 className="summary-title">סיכום הזמנה</h3>
                
                <div className="summary-row">
                  <span>סה"כ פריטים:</span>
                  <span>{totalItems}</span>
                </div>
                
                <div className="summary-row total">
                  <span>סה"כ לתשלום:</span>
                  <span>₪{totalPrice}</span>
                </div>
                <div className="order-info">
                <h3 className="info-title">פרטי הזמנה</h3>
                
                <div className="info-row">
                  <label className="info-label">איש קשר:</label>
                  <input 
                    type="text" 
                    name="contact"
                    value={contactInfo.contact}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="שם איש הקשר"
                    required
                  />
                </div>
                
                <div className="info-row">
                  <label className="info-label">טלפון:</label>
                  <input 
                    type="tel" 
                    name="phoneContact"
                    value={contactInfo.phoneContact}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="מספר טלפון"
                    required
                  />
                </div>
                
                <div className="info-row">
                  <label className="info-label">כתובת אספקה:</label>
                  <input 
                    type="text" 
                    name="provisionAddress"
                    value={contactInfo.provisionAddress}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="כתובת למשלוח"
                    required
                  />
                </div>
              </div>
                <div className="summary-actions">
                <button 
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || orderPlaced}
                >
                  {isSubmitting ? 'מבצע הזמנה...' : orderPlaced ? 'ההזמנה בוצעה בהצלחה!' : 'בצע הזמנה'}
                </button>
                  
                  <button 
                    className="clear-cart-btn"
                    onClick={handleClearCart}
                    disabled={isSubmitting || orderPlaced}
                  >
                    רוקן סל
                  </button>
                  <button 
                  className="continue-shopping-btn"
                  onClick={() => navigate('/model')}
                  disabled={isSubmitting}
                >
                  המשך לקטלוג התלבושות
                </button>
                </div>
              </div>
              
              {/* <div className="order-info">
                <h3 className="info-title">פרטי הזמנה</h3>
                
                <div className="info-row">
                  <span className="info-label">בית ספר:</span>
                  <span className="info-value">{school.name}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">כתובת:</span>
                  <span className="info-value">{school.addressSchool}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">טלפון:</span>
                  <span className="info-value">{school.phone}</span>
                </div> 
              </div>*/}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};