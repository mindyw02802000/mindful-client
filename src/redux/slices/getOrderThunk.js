import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrdersThunk = createAsyncThunk('getOrdersThunk',

    async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/Orders/GetOrders`);
            console.log("response: ", response);
            const data = await response.json();
            console.log("data: ", data);
            return data;
        }catch(e) {
            throw new Error("Failed to find!!!");
        }
    })

    
