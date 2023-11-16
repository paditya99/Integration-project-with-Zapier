import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import MainComp from "./components/MainComp";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/dashboard" element={<MainComp />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
