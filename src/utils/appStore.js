import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"
import ConnectionReducer from "./connectionsSlice"
import RequestsReducer from "./requestsSlice"
const appStore = configureStore({
       reducer:{
         user:userReducer,
         feed:feedReducer,
         Connections :ConnectionReducer,
         Requests:RequestsReducer
       }
})
export default appStore;