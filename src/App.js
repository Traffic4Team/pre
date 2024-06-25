import React from 'react';
import { BrowserRouter} from 'react-router-dom'; // Link 컴포넌트를 추가로 가져옵니다.
import Header from "./Components/app/Header";
import Router from "./Components/router/Router";
import Footer from "./Components/app/Footer";
import AuthProvider from "./Components/context/AuthProvider";
import HttpHeadersProvider from "./Components/context/HttpHeadersProvider";
import "./css/style.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AuthProvider>
          <HttpHeadersProvider>
            <Router></Router>
          </HttpHeadersProvider>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
