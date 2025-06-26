import { createAsyncThunk } from "@reduxjs/toolkit";


export const addDetailingModelThunk = createAsyncThunk('addDetailingModelThunk',
    async (detailToSave) => {
        const response = await fetch(`http://localhost:5000/api/DetailingModelControler/update `,
            {
                method: 'POST',
                body: JSON.stringify(detailToSave
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