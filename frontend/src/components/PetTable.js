// PetTable.jsx (izmene)
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetTable.css";

const PetTable = () => {
  const [pets, setPets] = useState([]);

  const fetchPets = () => {
    axios.get("http://localhost:5000/pets")
      .then(res => setPets(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Obrisati ljubimca?')) return;
    axios.delete(`http://localhost:5000/pets/${id}`)
      .then(fetchPets)
      .catch(() => alert('Greška pri brisanju'));
  };

  const handleVaccinate = (pet) => {
    axios.patch(`http://localhost:5000/pets/${pet.id}/vaccinate`)
      .then(() => {
        fetchPets();
        alert('Uspesno vakcinisan');
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error === 'VEĆ_VAKCINISAN') {
          alert('Ljubimac je već vakcinisan');
        } else {
          alert('Greška pri vakcinaciji');
        }
      });
  };

  const handleToggleStatus = (id) => {
    axios.patch(`http://localhost:5000/pets/${id}/status`)
      .then(fetchPets)
      .catch(() => alert('Greška pri promeni statusa'));
  };

  return (
    <div>
      <h1>Ljubimci</h1>
      <table>
        <thead>
          <tr>
            <th>Slika</th>
            <th>Ime</th>
            <th>Vlasnik</th>
            <th>Datum rođenja</th>
            <th>Vakcinisan</th>
            <th>Veterinar</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet.id} className={pet.aktivan ? '' : 'inactive'}>
              <td><img src={pet.slikaUrl || "https://via.placeholder.com/80"} alt={pet.ime} width="80" /></td>
              <td>{pet.ime}</td>
              <td>{pet.vlasnik}</td>
              <td>{pet.datumRodjenja}</td>
              <td>{pet.vakcinisan ? "Da" : "Ne"}</td>
              <td>{pet.Veterinar ? `${pet.Veterinar.ime} ${pet.Veterinar.prezime}` : "-"}</td>
              <td>
                <button onClick={() => handleVaccinate(pet)} disabled={pet.vakcinisan}>💉</button>
                <button onClick={() => handleToggleStatus(pet.id)}>
                  {pet.aktivan ? 'Neaktivan' : 'Aktivan'}
                </button>
                <button onClick={() => handleDelete(pet.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
