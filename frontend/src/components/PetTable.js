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
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet.id}>
              <td>
                <img src={pet.slikaUrl || "https://via.placeholder.com/80"} alt={pet.ime} width="80" />
              </td>
              <td>{pet.ime}</td>
              <td>{pet.vlasnik}</td>
              <td>{pet.datumRodjenja}</td>
              <td>{pet.vakcinisan ? "Da" : "Ne"}</td>
              <td>{pet.Veterinar ? `${pet.Veterinar.ime} ${pet.Veterinar.prezime}` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
