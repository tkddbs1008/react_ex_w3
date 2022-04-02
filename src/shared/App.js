import React from "react";
import { Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Signup from "../pages/SignUp";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/*" element={< Posts/>}/>
          <Route path="/login/*" element={<Login/>}/>
          <Route path="/Signup/*" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
