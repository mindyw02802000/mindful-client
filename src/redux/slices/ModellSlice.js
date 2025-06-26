import { createSlice } from "@reduxjs/toolkit"
import { getModelThunk } from "./getModelthunk"
import { getDetailingModelsThunk } from "./getDetailingModelsThunk"
import { addModellThunk } from "./addModelThunk"
import { updateModelThunk } from "./updateModelThunk"
import { updateDetailingModelThunk } from "./updateDetailingModelThunk"
import { deleteDetailingModelThunk } from "./deleteDetailingModelThunk"



const INITIAL_STATE = {
    models: [],
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
export const ModellSlice = createSlice({
    name: 'modellSlice',
    initialState: INITIAL_STATE,
    reducers: {
        // updatOrder: (state, action) => {
        //     state.order = action.payload
        // }
    },
    extraReducers: (builder) => {
        //add
        builder.addCase(addModellThunk.pending, (state) => {
        });
        builder.addCase(addModellThunk.fulfilled, (state, action) => {
        if( !state.models|| state.models.length===0){
           state.models=[]
         }
            state.models.push(action.meta.arg.newEvent)
            console.log(action.meta.arg.newEvent + " add order");
        });
        
  //update
        builder.addCase(updateModelThunk.pending, (state) => {
        });
        builder.addCase(updateModelThunk.fulfilled, (state, action) => {
        if( !state.models|| state.models.length===0){
           state.models=[]
         }
            state.models.push(action.meta.arg.newEvent)
            console.log(action.meta.arg.newEvent + " add order");
        });

          //updateDetailingModelThunk
          builder.addCase(updateDetailingModelThunk.pending, (state) => {
        });
        builder.addCase(updateDetailingModelThunk.fulfilled, (state, action) => {
        if( !state.models|| state.models.length===0){
           state.models=[]
         }
            state.models.push(action.meta.arg.newEvent)
            console.log(action.meta.arg.newEvent + " add order");
        });

        //getModels
        builder.addCase(getModelThunk.pending, (state) => {
        })
        builder.addCase(getModelThunk.fulfilled, (state, action) => {

            state.models = action.payload;
            console.log("slice: ", state.models);
        })
        builder.addCase(getModelThunk.rejected, (state, action) => {
            console.log("action: ", action);
        })


   }
  })
  



//   export const { updatOrder } = OrderSlice.actions;
  export const { } = ModellSlice.actions;
//  export default OrderSlice.reducer
