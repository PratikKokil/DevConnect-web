import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
   name:"feed",
   initialState:{
    users: [],
    page: 1,
    hasMore: true,
   },
   reducers:{
    addFeed:(state,action)=>{
        state.users = [...state.users, ...action.payload];
    },
    removeUserFromFeed:(state,action)=>{
        state.users = state.users.filter(user => user._id !== action.payload)
        
    },
    incrementPage:(state)=>{
        state.page += 1;
    },
    resetFeed:(state)=>{
        state.users = [];
        state.page = 1;
        state.hasMore = true;   
   },
    setHasMore:(state,action)=>{
        state.hasMore = action.payload;
    },
}}
)

export const {addFeed,removeUserFromFeed,incrementPage,resetFeed,setHasMore} = feedSlice.actions;
export default feedSlice.reducer;