import { createSlice } from "@reduxjs/toolkit"
import { getOrdersThunk } from "./getOrderThunk"
import { getDetailingOrdersThunk } from "./getDetailingOrderThunk"
import { updatOrderThunk } from "./updateOrderThunk"
import { saveOrderToServer } from "./saveOrderToServerThunk"
import { getOrderByIdThunk } from "./getOrderByIdThunk"
import { deleteOrderThunk } from "./deleteOrderThunk"
// import axios from "axios";


const INITIAL_STATE = {
    orders: [],
    cart: [],
   totalItems: 0,
   totalPrice: 0,
   loading: false,
   error: null,
   lastSavedOrder: null,
   order: null,
}

export const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState: INITIAL_STATE,
    reducers: {
          // הוספת פריט לסל הקניות
    addToCart: (state, action) => {
        // בדיקה אם הפריט כבר קיים בסל
        const existingItemIndex = state.cart.findIndex(
          item => item.schoolId === action.payload.schoolId && 
                 item.eventDate === action.payload.eventDate
        );
        
        if (existingItemIndex >= 0) {
          // אם ההזמנה כבר קיימת, נעדכן את הפריטים
          const existingOrder = state.cart[existingItemIndex];
          
          // עדכון או הוספת פריטים להזמנה קיימת
          action.payload.items.forEach(newItem => {
            const existingItemIdx = existingOrder.items.findIndex(
              item => item.idModel === newItem.idModel && item.size === newItem.size
            );
            
            if (existingItemIdx >= 0) {
              // עדכון כמות אם הפריט כבר קיים
              existingOrder.items[existingItemIdx].count += newItem.count;
            } else {
              // הוספת פריט חדש להזמנה
              existingOrder.items.push(newItem);
            }
          });
          
          // עדכון סה"כ פריטים ומחיר
          existingOrder.totalItems = existingOrder.items.reduce(
            (sum, item) => sum + item.count, 0
          );
          existingOrder.totalPrice = existingOrder.items.reduce(
            (sum, item) => sum + (item.count * item.price), 0
          );
          
          // עדכון הערות אם יש
          if (action.payload.note) {
            existingOrder.note = action.payload.note;
          }
        } else {
          // אם ההזמנה לא קיימת, נוסיף אותה לסל
          state.cart.push(action.payload);
        }
        
        // עדכון סה"כ פריטים ומחיר בסל
        state.totalItems = state.cart.reduce(
          (sum, order) => sum + order.totalItems, 0
        );
        state.totalPrice = state.cart.reduce(
          (sum, order) => sum + order.totalPrice, 0
        );
    },
    removeFromCart: (state, action) => {
        const { orderId, itemId, size } = action.payload;
        
        // מציאת ההזמנה
        const orderIndex = state.cart.findIndex((order) => order.id === orderId);
        
        if (orderIndex !== -1) {
          const order = state.cart[orderIndex];
          
          // מציאת הפריט
          const itemIndex = order.items.findIndex(
            (item) => item.idModel === itemId && item.size === size
          );
          
          if (itemIndex !== -1) {
            // חישוב הסכום שיש להפחית
            const itemToRemove = order.items[itemIndex];
            const itemsToRemove = itemToRemove.count;
            const priceToRemove = itemToRemove.count * itemToRemove.price;
            
            // הסרת הפריט
            order.items.splice(itemIndex, 1);
            
            // עדכון סה"כ בהזמנה
            order.totalItems -= itemsToRemove;
            order.totalPrice -= priceToRemove;
            
            // אם ההזמנה ריקה, הסר אותה
            if (order.items.length === 0) {
              state.cart.splice(orderIndex, 1);
            }
            
            // עדכון סה"כ בסל
            state.totalItems -= itemsToRemove;
            state.totalPrice -= priceToRemove;
          }
        }
      },
      updateItemQuantity: (state, action) => {
        const { orderId, itemId, size, quantity } = action.payload;
        
        // מציאת ההזמנה
        const orderIndex = state.cart.findIndex((order) => order.id === orderId);
        
        if (orderIndex !== -1) {
          const order = state.cart[orderIndex];
          
          // מציאת הפריט
          const itemIndex = order.items.findIndex(
            (item) => item.idModel === itemId && item.size === size
          );
          
          if (itemIndex !== -1) {
            const item = order.items[itemIndex];
            
            // חישוב ההפרש
            const diff = quantity - item.count;
            
            // עדכון הכמות
            item.count = quantity;
            
            // עדכון סה"כ בהזמנה
            order.totalItems += diff;
            order.totalPrice += diff * item.price;
            
            // עדכון סה"כ בסל
            state.totalItems += diff;
            state.totalPrice += diff * item.price;
          }
        }
      },
      placeAllOrders: (state) => {
        // העברת כל ההזמנות מהסל להזמנות שבוצעו
        state.cart.forEach((order) => {
          // הוספת תאריך הזמנה ושינוי סטטוס
          const placedOrder = {
            ...order,
            orderDate: new Date().toISOString(),
            status: "התקבלה"
          };
          
          state.orders.push(placedOrder);
        });
        
        // ריקון הסל
        state.cart = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      },
      clearCart: (state) => {
        state.cart = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      }

    },
    extraReducers: (builder) => {
        //add order
        builder.addCase(updatOrderThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatOrderThunk.fulfilled, (state, action) => {
        if( !state.orders|| state.orders.length===0){
           state.orders=[]
         }
            state.orders.push(action.meta.arg.newEvent)
            console.log(action.meta.arg.newEvent + " add order");
            state.loading = false;

        });
      
        //getOrder
        builder.addCase(getOrdersThunk.pending, (state) => {
        })
        builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
            debugger
            state.orders = action.payload;
        })
        builder.addCase(getOrdersThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })
  
        //getOrder
        builder.addCase(deleteOrderThunk.pending, (state) => {
        })
        builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
            debugger
            state.orders = action.payload;
        })
        builder.addCase(deleteOrderThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })

          //getDetailing
          builder.addCase(getDetailingOrdersThunk.pending, (state) => {
        })
        builder.addCase(getDetailingOrdersThunk.fulfilled, (state, action) => {
            debugger
            state.detailingOrders = action.payload;
        })
        builder.addCase(getDetailingOrdersThunk.rejected, (state, action) => {
            console.log("action: ", action);
        }) 

        // getOrderByIdThunk
        builder.addCase(getOrderByIdThunk.pending, (state) => {
        })
        builder.addCase(getOrderByIdThunk.fulfilled, (state, action) => {
          state.order = action.payload;
        })
        builder.addCase(getOrderByIdThunk.rejected, (state, action) => {
        }) 

        //saveOrderToServer
         builder.addCase(saveOrderToServer.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        builder.addCase(saveOrderToServer.fulfilled, (state, action) => {
          state.loading = false;
          state.lastSavedOrder = action.payload;
        })
        builder.addCase(saveOrderToServer.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "שגיאה בשמירת ההזמנה";
        });
   }
  })
//   export const { updatOrder } = OrderSlice.actions;
 export const { 
    addToCart,
    removeFromCart,
    updateItemQuantity,
    placeAllOrders,
    clearCart} = OrderSlice.actions;
 export default OrderSlice.reducer