import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './items/slice-item'

const store = configureStore({
    reducer: {
        items: itemReducer,
    },
})

export default store