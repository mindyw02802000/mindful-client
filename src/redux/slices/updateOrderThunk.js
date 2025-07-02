// import { createAsyncThunk } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const updatOrderThunk = createAsyncThunk('updatOrderThunk',

    async (order) => {
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/Orders/Add`,
            {
                method: 'POST',
                body: JSON.stringify(order
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