const express = require("express");
const router = express.Router();
const nameController=require("../controllers/name")


router.post("/getSummonerName", nameController.getSummonerName);

module.exports = router;
