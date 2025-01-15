const express = require("express");
const { CompilerManagement } = require("../controllers/get-output");
const router = express.Router();

router.post('/input' ,CompilerManagement);

module.exports = router;