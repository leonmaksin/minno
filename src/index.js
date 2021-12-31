import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Pages/App.js";
// import Root from "./Pages/RootContainer"
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 4 = Rinkeby
const supportedChainIds = [4];
const connectors = {
  injected: {},
};

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="vote" element={<App />} />
          <Route path="home" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
