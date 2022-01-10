import "./style/index.scss";
import Router from "./Router";
import React from "react";
import axios from "axios";
import {UserContextProvider} from "../src/context/UserContext"

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
