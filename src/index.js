// src/index.js 또는 App.js (최상위 컴포넌트)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // Redux 스토어 불러오기
import App from './App'; // 메인 애플리케이션 컴포넌트

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
