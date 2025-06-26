import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./loginthunk"
import { logOnThunk } from "./logOnThunk"


const INITIAL_STATE = {
    schools: [],
    token:-1,
    status:0,
    school:{idSchool:0,name: null,addressSchool: '', phone: ''},
    dateOfEvent:'',
    isLoggedOut: false  // הוספת מצב התנתקות
}

export const SchoolsSlice = createSlice({
    name: 'schoolsSlice',
    initialState: INITIAL_STATE,
  
    reducers: {
        setEventDate: (state, action) => {
          state.dateOfEvent = action.payload;
        },
        clearEventDate: (state) => {
          state.dateOfEvent = null;
        },
        setLoggedOut: (state, action) => {
          state.isLoggedOut = action.payload;
        },
        // הוספת פעולת איפוס נתוני משתמש
        resetUser: (state) => {
          state.school = {idSchool: 0, name: null, addressSchool: '', phone: ''};
          state.dateOfEvent = '';
          state.status = 0;
        }
      },
    
    extraReducers: (builder) => {
        //add

        //loginThunk
        builder.addCase(loginThunk.pending, (state) => {
        })

        builder.addCase(loginThunk.fulfilled, (state, action) => {
            debugger
            state.school.push(action.meta.arg.newEvent);
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })
            //logOnThunk
            
        builder.addCase(logOnThunk.pending, (state) => {
        })
        builder.addCase(logOnThunk.fulfilled, (state, action) => {
            debugger
           state.school = action.payload;
           state.status=5;
        })
        builder.addCase(logOnThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })

   }
  })

  export const { setEventDate, clearEventDate, setLoggedOut, resetUser } = SchoolsSlice.actions;

export default SchoolsSlice.reducer;

//  export default OrderSlice.reducer