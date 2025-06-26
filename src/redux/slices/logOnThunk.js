import { createAsyncThunk } from "@reduxjs/toolkit";


export const logOnThunk = createAsyncThunk('logOnThunk',

    async (schoolName) => {
    try {
        const response = await fetch(`http://localhost:5000/api/SchoolsControler/GetSchoolsByName/${schoolName}`);
        console.log("response: ", response);
        const data = await response.json();
        console.log("data: ", data);
        return data;
        
    }catch(e) {
        throw new Error("Failed to find!!!");

    }}
    )

