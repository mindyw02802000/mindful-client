// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";

// import './showDetailingOrder.css'

// export const ShowDetailingModel=(prop)=>{
//   debugger
//   const {detailingModel,setd,picture}=prop
//     const refDailog = useRef();
//     const dispatch = useDispatch();
//     const [arr, setArr] = useState([]);
//     const [detailing, setDetailing] = useState([]);
//     // const detailingO=useSelector(state=>state.orderSlice.detailingOrders)
//     const [newItem, setNewItem] = useState({idModel:0,count:0,size:0}); 
//     const dispach =async(id) => {
//       // await  dispatch(getDetailingOrdersThunk(id))
//       // const [newSchool, setNewSchool] = useState({ idSchool:0, name: '',addressSchool: '', phone: '' });
//     }
//     useEffect(() => {
      
//       // dispach(id)
//       refDailog.current.showModal();
     
//     }, [])
   
//     const saveDegem=(count,model,size)=>{
//       debugger
//       setNewItem({idModel:model,count:count,size:size})
//       setDetailing(newItem)
//     }
//     return <dialog ref={refDailog} className="dialog"> 
//         <div onClick={() => {
//             setd(false)
//             }}>❌</div>
//               {detailingModel?.map((e) => {
//                         return <div className=""> 
//                             <label>דגם: {e.idModel} </label>
//                             <label>מידה: {e.size} </label>
//                             <label> כמות פנויה לתאריך שלך : {e.countByDate} </label>
//                             <label>כמות : {e.count} </label>  
//                             <input className="count" type="number"  placeholder="כמות" onChange={(e1)=>saveDegem(e1.target.value,e.idModel,e.size)}></input> 
                                       
//   </div>
//                     })}
//                     {/* onClick={()=>setNewItem()} */}
//                <button  >הוסף לסל</button>     
//               <img className='item' src={`${picture}`}/>       
//     </dialog>
// }

import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../style/showDetailingModell.css';
import { addToCart } from "../../redux/slices/OrderSlice"; // נניח שיש לנו פעולה כזו ב-orderSlice

export const ShowDetailingModel = (prop) => {
  debugger
  const { detailingModel, setd, picture, selectedModel } = prop
  const refDailog = useRef();
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNote, setOrderNote] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const school = useSelector(state => state.schoolsSlice.school);
  const eventDate = useSelector(state => state.schoolsSlice.dateOfEvent);

  useEffect(() => {
    refDailog.current.showModal();
    
    // יצירת מערך התחלתי של פריטים להזמנה
    if (detailingModel && detailingModel.length > 0) {
      const initialItems = detailingModel.map(item => ({
        idModel: item.idModel,
        size: item.size,
        count: 0,
        maxCount: item.countByDate,
        price: selectedModel ? selectedModel.price : 0
      }));
      setOrderItems(initialItems);
    }
  }, [detailingModel]);

  // עדכון כמות פריט בהזמנה
  const updateItemCount = (index, count) => {
    const newCount = parseInt(count) || 0;
    const updatedItems = [...orderItems];
    
    // וידוא שהכמות לא עולה על המקסימום האפשרי
    if (newCount <= updatedItems[index].maxCount) {
      updatedItems[index].count = newCount;
      setOrderItems(updatedItems);
      
      // חישוב סה"כ פריטים ומחיר
      calculateTotals(updatedItems);
    }
  };

  // חישוב סה"כ פריטים ומחיר
  const calculateTotals = (items) => {
    const total = items.reduce((sum, item) => sum + item.count, 0);
    const price = items.reduce((sum, item) => sum + (item.count * item.price), 0);
    setTotalItems(total);
    setTotalPrice(price);
  };

  // הוספה לסל הקניות
  const addItemsToCart = () => {
    // סינון רק פריטים עם כמות גדולה מ-0
    const itemsToAdd = orderItems.filter(item => item.count > 0);
    
    if (itemsToAdd.length === 0) {
      alert("יש לבחור לפחות פריט אחד");
      return;
    }
    
    // יצירת אובייקט הזמנה
    const orderData = {
      schoolId: school.idSchool, 
      schoolName: school.name,
      eventDate: eventDate,
      orderDate: new Date().toISOString(),
      items: itemsToAdd,
      totalItems: totalItems,
      totalPrice: totalPrice,
      note: orderNote,
      status: "ממתין לאישור"
    };
    // order:{idOrder:0
    // ,idSchool:0,contact:
    // '', phoneContact:'',provisionAddress:
    // '',dateOfOrdder:''
    // ,dateOfEvent:'',
    // costPrice:0,detailingOrders:[]},

    // שליחה לרדוקס
     dispatch(addToCart(orderData));
    
    // הצגת הודעת הצלחה
    setOrderSuccess(true);
    
    // סגירת החלון אחרי 2 שניות
    setTimeout(() => {
      setd(false);
    }, 2000);
  };

  return (
    <dialog ref={refDailog} className="detail-dialog">
      <div className="dialog-header">
        <h2 className="dialog-title">פרטי דגם {selectedModel && selectedModel.idModel}</h2>
        <button className="close-button" onClick={() => setd(false)}>✖</button>
      </div>
      
      <div className="dialog-content">
        <div className="model-details">
          <div className="model-image-container">
            {/* <imgclassName="model-detail-image" src={`https://localhost:5000/img/${picture}`}  /> */}
          </div>
          
          <div className="model-info-container">
            {selectedModel && (
              <>
                <h3 className="model-detail-id">דגם: {selectedModel.idModel}</h3>
                <p className="model-detail-category">קטגוריה: {selectedModel.kategory}</p>
                <p className="model-detail-price">מחיר: ₪{selectedModel.price}</p>
              </>
            )}
            
            <div className="sizes-container">
              <h4 className="sizes-title">מידות זמינות:</h4>
              <div className="sizes-grid">
                {detailingModel?.map((item, index) => (
                  <div key={`${item.idModel}-${item.size}`} className="size-item">
                    <div className="size-header">
                      <span className="size-label">מידה {item.size}</span>
                      <span className="size-available">זמין: {item.countByDate}</span>
                    </div>
                    
                    <div className="quantity-control">
                      <button 
                        className="quantity-button minus"
                        onClick={() => {
                          if (orderItems[index].count > 0) {
                            updateItemCount(index, orderItems[index].count - 1);
                          }
                        }}
                        disabled={orderItems[index]?.count <= 0}
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        min="0"
                        max={item.countByDate}
                        value={orderItems[index]?.count || 0}
                        onChange={(e) => updateItemCount(index, e.target.value)}
                        className="quantity-input"
                      />
                      
                      <button 
                        className="quantity-button plus"
                        onClick={() => {
                          if (orderItems[index].count < item.countByDate) {
                            updateItemCount(index, orderItems[index].count + 1);
                          }
                        }}
                        disabled={orderItems[index]?.count >= item.countByDate}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h4 className="summary-title">סיכום הזמנה</h4>
          <div className="summary-details">
            <div className="summary-row">
              <span>סה"כ פריטים:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>סה"כ לתשלום:</span>
              <span>₪{totalPrice}</span>
            </div>
          </div>
          
          <div className="order-note">
            <label htmlFor="note">הערות להזמנה:</label>
            <textarea
              id="note"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="הוסף הערות מיוחדות להזמנה..."
              rows="3"
            ></textarea>
          </div>
          
          <button 
            className="add-to-cart-button"
            onClick={addItemsToCart}
            disabled={totalItems === 0 || orderSuccess}
          >
            {orderSuccess ? "נוסף לסל בהצלחה!" : "הוסף לסל"}
          </button>
        </div>
      </div>
    </dialog>
  );
}