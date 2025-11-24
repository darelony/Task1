import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PetCards.css";

const PetCards = () => {
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTip, setFilterTip] = useState("");
  const [filterVet, setFilterVet] = useState("");

  // Dohvatanje ljubimaca
  const fetchPets = () => {
    axios.get("http://localhost:5000/pets")
      .then(res => setPets(res.data))
      .catch(err => console.log(err));
  };

  // Dohvatanje veterinara za filter
  const fetchVets = () => {
    axios.get("http://localhost:5000/vets")
      .then(res => setVets(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPets();
    fetchVets();
  }, []);

  // Filter po imenu, tipu i veterinaru
  const filteredPets = pets.filter(pet => {
    const matchName = pet.ime.toLowerCase().includes(search.toLowerCase());
    const matchTip = filterTip === "" || pet.tip === filterTip;
    const matchVet = filterVet === "" || pet.Veterinar.id.toString() === filterVet;
    return matchName && matchTip && matchVet;
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Ljubimci</h1>
        <Link to="/add">
          <button className="btn-add">Dodaj novog ljubimca</button>
        </Link>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Pretraži po imenu"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterTip} onChange={e => setFilterTip(e.target.value)}>
          <option value="">Svi tipovi</option>
          <option value="macka">Mačka</option>
          <option value="pas">Pas</option>
          <option value="zec">Zec</option>
          <option value="hrcak">Hrčak</option>
        </select>
        <select value={filterVet} onChange={e => setFilterVet(e.target.value)}>
          <option value="">Svi veterinari</option>
          {vets.map(v => (
            <option key={v.id} value={v.id}>{v.ime} {v.prezime}</option>
          ))}
        </select>
      </div>

      <div className="pet-cards-container">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card">
            <img src={pet.slikaUrl} alt={pet.ime} />
            <h3>{pet.ime}</h3>
            <p><strong>Vlasnik:</strong> {pet.vlasnik}</p>
            <p><strong>Tip:</strong> {pet.tip}</p>
            <p><strong>Veterinar:</strong> {pet.Veterinar.ime} {pet.Veterinar.prezime}</p>
            <p><strong>Vakcinisan:</strong> {pet.vakcinisan ? "Da" : "Ne"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCards;
