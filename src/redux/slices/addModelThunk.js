import { createAsyncThunk } from "@reduxjs/toolkit";


export const addModellThunk = createAsyncThunk('addModellThunk',
    async (modell) => {
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/ModellsControllers/Add `,
            {
                method: 'POST',
                body: JSON.stringify(modell
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