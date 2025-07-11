import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteDetailingModelThunk = createAsyncThunk(
    'deleteDetailingModelThunk',
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://mindful-server-l2lj.onrender.com/api/DetailingModelControler/delete/${id}`
        , {
          method: 'DELETE', // חשוב מאוד לציין את השיטה
        });
        if (!response.ok) {
          // אפשר לקרוא את הטקסט או JSON של השגיאה אם יש
          const errorData = await response.text();
          throw new Error(errorData || 'Failed to delete model');
        }
  
        return id; // נחזיר את ה-id כדי לעדכן את הסטור
      } catch (error) {
        return rejectWithValue(error.message || 'Unknown error');
      }
    }
  );

