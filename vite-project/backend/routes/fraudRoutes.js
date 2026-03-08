const express = require("express");
const router = express.Router();

const { detectFraud } = require("../controllers/fraudController");

router.post("/check", detectFraud);

module.exports = router;