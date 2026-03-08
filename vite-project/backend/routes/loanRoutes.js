const express = require("express");
const router = express.Router();

const { getLoanOptions } = require("../controllers/loanController");

router.post("/match", getLoanOptions);

module.exports = router;