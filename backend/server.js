const express = require('express');
const cors = require('cors'); 
const { spawn } = require('child_process');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173'  
  }));
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("Received file upload request.");
    if (!req.file) {
        console.log("No file uploaded.");
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    console.log(`File uploaded at ${filePath}`);

    const pythonProcess = spawn('python', ['D:\\Projects\\Pdf_extract\\ai_model\\extractor.py', filePath]);

    let dataString = '';
    pythonProcess.stdout.on('data', (data) => {
        console.log("Python script output:", data.toString());
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error("Python script error:", data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        if (code !== 0) {
            return res.status(500).json({ message: 'Failed to process file' });
        }
        try {
            const results = JSON.parse(dataString);
            res.json({ message: 'Data extracted successfully', data: results });
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse output', error: error.toString() });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});