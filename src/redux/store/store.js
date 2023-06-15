import { configureStore } from "@reduxjs/toolkit";
import { todolistReducer } from "../reducer/todolistReducer";
const reducer = {
    toDo: todolistReducer
}
const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
});
export default store;
