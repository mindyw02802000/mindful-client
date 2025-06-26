import { createAsyncThunk } from "@reduxjs/toolkit";


export const addModellThunk = createAsyncThunk('addModellThunk',
    async (modell) => {
        const response = await fetch(`http://localhost:5000/api/ModellsControllers/Add `,
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