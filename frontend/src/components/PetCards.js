// PetCards.jsx (izmenjena verzija)
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

  const fetchPets = () => {
    axios.get("http://localhost:5000/pets")
      .then(res => setPets(res.data))
      .catch(err => console.log(err));
  };

  const fetchVets = () => {
    axios.get("http://localhost:5000/vets")
      .then(res => setVets(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPets();
    fetchVets();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Obrisati ljubimca?")) return;
    axios.delete(`http://localhost:5000/pets/${id}`)
      .then(() => fetchPets())
      .catch(err => {
        console.error(err);
        alert("Greška pri brisanju");
      });
  };

  const handleToggleStatus = (id) => {
    axios.patch(`http://localhost:5000/pets/${id}/status`)
      .then(() => fetchPets())
      .catch(err => {
        console.error(err);
        alert("Greška pri promeni statusa");
      });
  };

  const handleVaccinate = (pet) => {
    axios.patch(`http://localhost:5000/pets/${pet.id}/vaccinate`)
      .then(() => {
        fetchPets();
        alert("Uspesno vakcinisan");
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error === 'VEĆ_VAKCINISAN') {
          alert('Ljubimac je već vakcinisan');
        } else {
          console.error(err);
          alert('Greška pri vakcinaciji');
        }
      });
  };

  const filteredPets = pets.filter(pet => {
    const matchName = pet.ime.toLowerCase().includes(search.toLowerCase());
    const matchTip = filterTip === "" || pet.tip === filterTip;
    const matchVet = filterVet === "" || (pet.Veterinar && pet.Veterinar.id.toString() === filterVet);
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
          <div key={pet.id} className={`pet-card ${pet.aktivan ? '' : 'inactive'}`}>
            <img src={pet.slikaUrl || "https://via.placeholder.com/150"} alt={pet.ime} />
            <div className="card-body">
              <h3>{pet.ime}</h3>
              <p><strong>Vlasnik:</strong> {pet.vlasnik}</p>
              <p><strong>Tip:</strong> {pet.tip}</p>
              <p><strong>Veterinar:</strong> {pet.Veterinar ? `${pet.Veterinar.ime} ${pet.Veterinar.prezime}` : '-'}</p>
              <p><strong>Vakcinisan:</strong> {pet.vakcinisan ? "Da" : "Ne"}</p>

              <div className="card-actions">
                {/* Vakcinacija: aktivno samo ako nije vakcinisan */}
                <button
                  className="btn-vacc"
                  onClick={() => handleVaccinate(pet)}
                  disabled={pet.vakcinisan}
                  title={pet.vakcinisan ? "Već vakcinisan" : "Vakcinisi"}
                >
                  💉
                </button>

                {/* Toggle aktivan/neaktivan */}
                <button className="btn-status" onClick={() => handleToggleStatus(pet.id)}>
                  {pet.aktivan ? 'Postavi neaktivan' : 'Postavi aktivan'}
                </button>

                {/* Brisanje X */}
                <button className="btn-delete" onClick={() => handleDelete(pet.id)}>X</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCards;
