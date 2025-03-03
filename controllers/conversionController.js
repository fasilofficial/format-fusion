const conversionModel = require("../models/conversionModel");

exports.jsonToXml = (req, res) => {
  try {
    let jsonData = req.body.data;

    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }

    const options = { spaces: req.body.options?.spaces };
    const xml = conversionModel.jsonToXml(jsonData, options);

    res.set("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("JSON to XML conversion error:", error);
    res.status(400).json({
      error: "Conversion failed",
      message: error.message,
    });
  }
};

exports.xmlToJson = (req, res) => {
  try {
    const xmlData = req.body.data;
    if (!xmlData || typeof xmlData !== "string") {
      return res.status(400).json({
        error: "Invalid input",
        message: "XML data must be a non-empty string",
      });
    }

    const options = { spaces: req.body.options?.spaces };
    const json = conversionModel.xmlToJson(xmlData, options);

    res.json(json);
  } catch (error) {
    console.error("XML to JSON conversion error:", error);
    res.status(400).json({
      error: "Invalid XML",
      message: error.message,
    });
  }
};

exports.jsonToYaml = (req, res) => {
  try {
    let jsonData = req.body.data;

    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }

    const options = { spaces: req.body.options?.spaces };
    const yamlData = conversionModel.jsonToYaml(jsonData, options);

    res.set("Content-Type", "text/yaml");
    res.send(yamlData);
  } catch (error) {
    console.error("JSON to YAML conversion error:", error);
    res.status(400).json({
      error: "Conversion failed",
      message: error.message,
    });
  }
};
