
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginThunk = createAsyncThunk('loginThunk',

    async (school) => {
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/SchoolsControler/Add`,
            {
                method: 'POST',
                body: JSON.stringify(school
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

