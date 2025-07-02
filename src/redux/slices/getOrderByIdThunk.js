import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOrderByIdThunk = createAsyncThunk('getOrderByIdThunk',

    async (Id) => {
        try {
            const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/Orders/GetOrdersById/${Id}`);
            console.log("response: ", response);
            const data = await response.json();
            console.log("data: ", data);
            return data;
            
        }catch(e) {
            throw new Error("Failed to find!!!");

        }
    })
