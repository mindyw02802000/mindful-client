import { createSlice } from "@reduxjs/toolkit"
import { getModelThunk } from "./getModelthunk"
import { getDetailingModelsThunk } from "./getDetailingModelsThunk"
import { addDetailingModelThunk } from "./addDetailingModelThunk"
import { deleteDetailingModelThunk } from "./deleteDetailingModelThunk"

const INITIAL_STATE = {
    error: '',
    model:'',
    token:-1,
    search:false,
    modell:'',
    detailingModels:[]
}
// const INITIAL_STATE = {
//     user: {username:'',pasword:''},
//     loading: false,
//     error: '',
//     token:-1,
//     status:0
// }
export const DetailngModelsSlice = createSlice({
    name: 'detailngModelsSlice',
    initialState: INITIAL_STATE,
    reducers: {
        // updatOrder: (state, action) => {
        //     state.order = action.payload
        // }
    },
    extraReducers: (builder) => {


        //getModels
        builder.addCase(getDetailingModelsThunk.pending, (state) => {
        })
        builder.addCase(getDetailingModelsThunk.fulfilled, (state, action) => {
            debugger
            state.detailingModels = action.payload;
            // console.log("slice: ", state.modells);
        })
        builder.addCase(getDetailingModelsThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })

         //deleteDetailingModelThunk
         builder.addCase(deleteDetailingModelThunk.pending, (state) => {
        })
        builder.addCase(deleteDetailingModelThunk.fulfilled, (state, action) => {
            debugger
            // state.detailingModels = action.payload;
            // console.log("slice: ", state.modells);
        })
        builder.addCase(deleteDetailingModelThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })
      
      
   //getModels
   builder.addCase(addDetailingModelThunk.pending, (state) => {
})
builder.addCase(addDetailingModelThunk.fulfilled, (state, action) => {
    debugger
    state.detailingModels = action.payload;
    // console.log("slice: ", state.modells);
})
builder.addCase(addDetailingModelThunk.rejected, (state, action) => {
    console.log("action: ", action);
})

   }
  })
//   export const { updatOrder } = OrderSlice.actions;
  export const { } = DetailngModelsSlice.actions;
//  export default OrderSlice.reducer