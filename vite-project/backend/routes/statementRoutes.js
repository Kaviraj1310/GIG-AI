const express = require("express");
const multer = require("multer");

const { analyzeStatement } = require("../controllers/statementController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("statement"), analyzeStatement);

module.exports = router;