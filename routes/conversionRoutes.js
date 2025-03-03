const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/conversionController");

router.post("/json-to-xml", conversionController.jsonToXml);
router.post("/xml-to-json", conversionController.xmlToJson);
router.post("/json-to-yaml", conversionController.jsonToYaml);

module.exports = router;