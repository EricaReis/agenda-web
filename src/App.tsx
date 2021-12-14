import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Global from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const App: React.FC = () => {
  return (
    <>
      <Global />
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
