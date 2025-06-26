// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const deleteOrderThunk = createAsyncThunk(
//     'deleteOrderThunk',

//     async (id, { rejectWithValue }) => {
//         debugger
//       try {
//         const response = await fetch(`https://localhost:5000/api/Orders/delete${id}`
//         , {
//           method: 'DELETE', // חשוב מאוד לציין את השיטה
//         });
//         if (!response.ok) {
//           // אפשר לקרוא את הטקסט או JSON של השגיאה אם יש
//           const errorData = await response.text();
//           throw new Error(errorData || 'Failed to delete model');
//         }
  
//         return id; // נחזיר את ה-id כדי לעדכן את הסטור
//       } catch (error) {
//         return rejectWithValue(error.message || 'Unknown error');
//       }
//     }
//   );
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteOrderThunk = createAsyncThunk(
    'deleteOrderThunk',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/Orders/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to delete order');
            }

            return id; // נחזיר את ה-id כדי לעדכן את הסטור
        } catch (error) {
            console.error('Error deleting order:', error); // הוסף לוג שגיאה
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

