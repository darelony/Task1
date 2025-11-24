const express = require("express");
const router = express.Router();
const Ljubimac = require("../models/Ljubimac");
const Veterinar = require("../models/Veterinar");

router.get("/", async (req, res) => {
  const pets = await Ljubimac.findAll({
    include: Veterinar
  });
  res.json(pets);
});

module.exports = router;
