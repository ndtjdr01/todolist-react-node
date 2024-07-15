import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        cpitems:[],
        inputValue: '',
        currentInput: 'add',
        isEdit: false,
        filter: 'active',
        
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setCpItems(state, action) {
            state.cpitems = action.payload;
        },
        toggleItem(state, action) {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                item.completed = !item.completed;
            }
        },
        setInputValue(state, action) {
            state.inputValue = action.payload;
        },
        setCurrentInput(state, action) {
            state.currentInput = action.payload;
        },
        setIsEdit(state, action) {
            state.isEdit = action.payload;;
        },
        setFilter(state, action) {
            state.filter = action.payload;
        }
    },
})

export const { 
    toggleItem,
    setItems,
    setCurrentInput,
    setInputValue,
    setIsEdit,
    setFilter,
    setCpItems
     } = itemSlice.actions;

export default itemSlice.reducer;