# Format Fusion

A lightweight Node.js service for converting between JSON, XML, and YAML formats.

## Features
- JSON to XML conversion
- XML to JSON conversion
- JSON to YAML conversion
- RESTful API with MVC architecture
- Modern frontend with TailwindCSS

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/fasilofficial/format-fusion.git
   cd format-fusion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
Start the server:

```bash
npm start
```

Access at [http://localhost:3000](http://localhost:3000)

## API Endpoints
- **POST** `/api/convert/json-to-xml` - Convert JSON to XML
- **POST** `/api/convert/xml-to-json` - Convert XML to JSON
- **POST** `/api/convert/json-to-yaml` - Convert JSON to YAML

## Requirements
- Node.js >= 18.0.0

## License
MIT
