import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name:"Connections",
    initialState:null,
    reducers:{
      addConnections:(state,action)=>{
         return action.payload
      },
      removeConnections:()=>{
        return null
      }
    }
});

export const {addConnections,removeConnections} = connectionsSlice.actions;
export default connectionsSlice.reducer;