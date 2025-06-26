
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateDetailingModelThunk = createAsyncThunk('updateDetailingModelThunk',
    async (detailFormData) => {
        const response = await fetch(`http://localhost:5000/api/DetailingModelControler/Edit
        `,
            {
                method: 'PUT',
                body: JSON.stringify(detailFormData),
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