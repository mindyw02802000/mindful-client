import { combineSlices } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { OrderSlice } from "./slices/OrderSlice";
import {  ModellSlice } from "./slices/ModellSlice";
import { SchoolsSlice } from "./slices/schoolsSlice";
import { DetailngModelsSlice } from "./slices/DetailingModelsSlice";


const reducers = combineSlices(OrderSlice,ModellSlice,SchoolsSlice,DetailngModelsSlice);

export const STORE = configureStore({
    reducer: reducers,
});

