
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // rootReducer import

const store = configureStore({
  reducer: rootReducer, // rootReducer를 reducer로 전달
  // middleware, devtools 설정 등 추가 가능
});

export default store;
