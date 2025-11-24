import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Veterinar Dashboard</h2>
      <ul>
        <li><Link to="/">Ljubimci</Link></li>
        <li><Link to="/add-pet">Dodaj ljubimca</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
