const { js2xml, xml2js } = require("xml-js");
const yaml = require("js-yaml");

const defaultOptions = {
  xml: {
    compact: false,
    spaces: 2,
    fullTagEmptyElement: true,
  },
  json: {
    compact: true,
    spaces: 2,
  },
};

function convertToXmlElements(obj) {
  if (obj === null || obj === undefined) {
    return [{ type: "text", text: "" }];
  }

  if (typeof obj !== "object") {
    return [{ type: "text", text: String(obj) }];
  }

  if (Array.isArray(obj)) {
    return obj.flatMap((item) => ({
      type: "element",
      name: "item",
      elements: convertToXmlElements(item),
    }));
  }

  return Object.entries(obj).map(([key, value]) => ({
    type: "element",
    name: key,
    elements: convertToXmlElements(value),
  }));
}

function cleanXmlJsResult(obj) {
  if (!obj || typeof obj !== "object") return obj;

  if (obj._text !== undefined) {
    return obj._text;
  }

  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (key.startsWith("_")) return;

    if (Array.isArray(value)) {
      result[key] = value.map((item) => cleanXmlJsResult(item));
    } else if (typeof value === "object") {
      result[key] = cleanXmlJsResult(value);
    } else {
      result[key] = value;
    }
  });

  return result;
}

module.exports = {
  jsonToXml: (jsonData, options = {}) => {
    const spaces = options.spaces || defaultOptions.xml.spaces;
    const xmlOptions = { ...defaultOptions.xml, spaces };

    const rootName = Object.keys(jsonData)[0] || "root";
    const dataToConvert = {
      elements: [
        {
          type: "element",
          name: rootName,
          elements: convertToXmlElements(jsonData[rootName] || jsonData),
        },
      ],
    };

    return js2xml(dataToConvert, xmlOptions);
  },

  xmlToJson: (xmlData, options = {}) => {
    const spaces = options.spaces || defaultOptions.json.spaces;
    const jsonOptions = { ...defaultOptions.json, spaces };

    const result = xml2js(xmlData, { compact: true });
    return cleanXmlJsResult(result);
  },

  jsonToYaml: (jsonData, options = {}) => {
    const indent = options.spaces || defaultOptions.json.spaces;
    return yaml.dump(jsonData, { indent });
  },
};
