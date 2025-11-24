import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetCards from "./components/PetCards";
import AddPetForm from "./components/AddPetForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PetCards />} />
          <Route path="/add" element={<AddPetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
