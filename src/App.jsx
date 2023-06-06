import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home/Home";
import FetchData from "./components/fetchDataByRequirement/FetchData";
import TechProfile from "./components/techProfile/TechProfile";
const App = () => {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      {/* <Route exact path="/login" element={<Login />} /> */}
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/" element={token?.length ? <Home /> : <Login />} />
      <Route exact path="/requirement" element={<FetchData />} />
      <Route exact path="/tech/profile" element={<TechProfile />} />
    </Routes>
  );
};

export default App;
