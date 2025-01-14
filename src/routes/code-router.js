const express = require("express");
const { JavaScriptManager, PythonManager, CppManager } = require("../controllers/get-output");
const router = express.Router();

router.post('/js' ,JavaScriptManager);
router.post('/py' ,PythonManager);
router.post('/c' ,CppManager);

module.exports = router;