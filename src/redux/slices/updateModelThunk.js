
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateModelThunk = createAsyncThunk('updateModelThunk',
    async (order) => {
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/ModellsControllers/Edit`,
            {
                method: 'PUT',
                body: JSON.stringify(order),
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
            throw new Error('failed to fetch');
        }
    }
)