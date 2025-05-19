import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authslice";




// Redux Store 설정
export const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });


// Redux 타입스크립트 설정정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;