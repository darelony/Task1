import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AddPetForm.css";

const AddPetForm = () => {
  const [ime, setIme] = useState("");
  const [vlasnik, setVlasnik] = useState("");
  const [datumRodjenja, setDatumRodjenja] = useState("");
  const [vakcinisan, setVakcinisan] = useState(false);
  const [tip, setTip] = useState("macka");
  const [veterinari, setVeterinari] = useState([]);
  const [veterinarId, setVeterinarId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/vets")
      .then(res => {
        setVeterinari(res.data);
        if(res.data.length > 0) setVeterinarId(res.data[0].id);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/pets", {
      ime,
      vlasnik,
      datumRodjenja,
      vakcinisan,
      tip,
      VeterinarId: veterinarId
    })
    .then(res => {
      alert("Ljubimac dodat!");
      navigate("/");
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Dodaj novog ljubimca</h2>
        <form className="add-pet-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ime ljubimca</label>
            <input type="text" value={ime} onChange={e => setIme(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Vlasnik</label>
            <input type="text" value={vlasnik} onChange={e => setVlasnik(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Datum rođenja</label>
            <input type="date" value={datumRodjenja} onChange={e => setDatumRodjenja(e.target.value)} />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" checked={vakcinisan} onChange={e => setVakcinisan(e.target.checked)} />
              Vakcinisan
            </label>
          </div>

          <div className="form-group">
            <label>Tip ljubimca</label>
            <select value={tip} onChange={e => setTip(e.target.value)}>
              <option value="macka">Mačka</option>
              <option value="pas">Pas</option>
              <option value="zec">Zec</option>
              <option value="hrcak">Hrčak</option>
            </select>
          </div>

          <div className="form-group">
            <label>Veterinar</label>
            <select value={veterinarId} onChange={e => setVeterinarId(e.target.value)}>
              {veterinari.map(v => <option key={v.id} value={v.id}>{v.ime} {v.prezime}</option>)}
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit">Dodaj</button>
            <Link to="/">
              <button type="button" className="btn-cancel">Odustani</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPetForm;
