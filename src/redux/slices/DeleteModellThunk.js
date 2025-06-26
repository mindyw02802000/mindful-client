import { createAsyncThunk } from "@reduxjs/toolkit";

export const DeleteModellThunk = createAsyncThunk(
    'DeleteModellThunk',
    async (idModel, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/api/ModellsControllers/delete/${idModel}`, {
          method: 'DELETE', // חשוב מאוד לציין את השיטה
        });
  
        if (!response.ok) {
          // אפשר לקרוא את הטקסט או JSON של השגיאה אם יש
          const errorData = await response.text();
          throw new Error(errorData || 'Failed to delete model');
        }
  
        return idModel; // נחזיר את ה-id כדי לעדכן את הסטור
      } catch (error) {
        return rejectWithValue(error.message || 'Unknown error');
      }
    }
  );