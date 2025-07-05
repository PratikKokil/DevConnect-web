import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"
import ConnectionReducer from "./connectionsSlice"

const appStore = configureStore({
       reducer:{
         user:userReducer,
         feed:feedReducer,
         Connections :ConnectionReducer
       }
})
export default appStore;