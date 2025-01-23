# PDF Details Extractor

## Objective
This project is designed to extract specific details (Name, Phone Number, Address) from a PDF and automatically populate these fields in a frontend application. It showcases the integration of a Python-based backend with a React frontend, utilizing AI techniques for data extraction.

## System Overview

### PDF Parsing
The system uses PyMuPDF for PDF parsing, chosen over other libraries such as pdfplumber, PyPDF2, or pdfminer.six due to compatibility issues with dependencies (particularly `cryptography` with `pdfminer`). PyMuPDF provides robust and efficient text extraction which is crucial for reliable data parsing.

### Data Extraction with AI
While the initial plan included using AI libraries like spaCy or Hugging Face Transformers for advanced text recognition and classification, the current implementation successfully extracts necessary details without complex AI models. Future improvements might incorporate these technologies to handle more complex data extraction tasks and improve the accuracy of entity recognition.

## Installation

### Requirements
- Python 3.x
- Node.js
- npm or yarn
- React

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install required packages:
   ```bash
   npm install
   ```

### AI Model Setup
1. Ensure Python 3.x is installed and set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
2. Install required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install required packages:
   ```bash
   npm install
   ```

## Usage

### Running the Backend
1. From the backend directory, start the server:
   ```bash
   npm start
   ```

### Running the Frontend
1. From the frontend directory, start the React application:
   ```bash
   npm run start
   ```
2. Open a browser and navigate to `http://localhost:3000` to view the app.

### How to Use
1. On the frontend application, use the "Choose File" button to select a PDF file.
2. The application will automatically extract and display the Name, Phone Number, and Address from the PDF on the web page.

## Future Improvements
- Implement advanced AI models for more accurate data extraction.
- Enhance error handling and security features.
- Improve UI/UX for a better user experience.

## Contributions
Contributions are welcome. Please fork the repository and submit a pull request with your enhancements.

## License
Specify your license or leave it under a standard open-source license, such as MIT.
