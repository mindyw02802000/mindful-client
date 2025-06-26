import { createAsyncThunk } from "@reduxjs/toolkit";


export const getDetailingModelsThunk = createAsyncThunk('getDetailingModelsThunk',


    async ({id1,eventDate}) => {
        try {
            debugger
            const response = await fetch(`http://localhost:5000/api/DetailingModelControler/GetDetailingModelByIdAndDate/${id1}/${eventDate}`);
            console.log("response: ", response);
            const data = await response.json();
            console.log("data: ", data);
            return data;
        }catch(e) {
            throw new Error("Failed to find!!!");

        }

    })

    
