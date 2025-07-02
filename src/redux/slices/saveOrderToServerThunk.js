// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // פעולה אסינכרונית לשמירת הזמנה בשרת
// export const saveOrderToServer = createAsyncThunk(
//   "order/saveOrderToServer",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("https://localhost:5000/api/Orders/Add", orderData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "שגיאה בשמירת ההזמנה");
//     }
//   }
// );


import { createAsyncThunk } from "@reduxjs/toolkit";


export const saveOrderToServer = createAsyncThunk("order/saveOrderToServer",

    async (orderData) => {
        debugger
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/Orders/Add`,
            {
                method: 'POST',
                body: JSON.stringify(orderData
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.token);
            return data.token;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
    )