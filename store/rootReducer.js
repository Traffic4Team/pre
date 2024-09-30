// src/store/rootReducer.js

import { combineReducers } from 'redux';
import triplistReducer from './triplistReducer'; // 예시로 triplistReducer를 import

const rootReducer = combineReducers({
  triplist: triplistReducer,
  // 다른 리듀서들도 필요에 따라 추가
});

export default rootReducer;
