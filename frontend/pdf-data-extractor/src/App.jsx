import { useState, useEffect } from 'react';
import './App.css';
import logo from './lg.png';
import Confetti from 'react-confetti';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    role: '',
  });

  const [hasData, setHasData] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timer;
    if (confettiTrigger > 0) {
      setShowConfetti(true);
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [confettiTrigger]);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Only PDF files are allowed.');
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: result.data.Name,
          phone: result.data.Phone,
          address: result.data.Address,
          role: result.data.Role,
        });
        setHasData(true);
        setConfettiTrigger((prev) => prev + 1);
      } else {
        console.error('Failed to extract data from PDF', result);
        alert('Failed to extract data from PDF');
        setHasData(false);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Error uploading file');
      setHasData(false);
    }
  };

  return (
    <div className="app-container">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <header className="app-header">
        <img src={logo} alt="PDF Logo" className="logo" />
        <h1>PDF Extractor App</h1>
        <p className="sub-header">
          Made by Saurabh Dubey for Jobsforce - Fullstack ML Developer
        </p>
      </header>

      <form onSubmit={handleFileUpload} className="form">
        <input 
          type="file" 
          id="fileInput" 
          accept=".pdf,application/pdf"
        />
        <button type="submit">Upload File</button>
      </form>

      {hasData && (
        <div className="results">
          <h2>Extraction Results:</h2>
          <p>Name: {formData.name}</p>
          <p>Phone: {formData.phone}</p>
          <p>Address: {formData.address}</p>
          <p>Role: {formData.role}</p>
        </div>
      )}

      <footer className="footer">
        <p>
          Contact me at{' '}
          <a href="mailto:saurabhdubeykpl@gmail.com">
          saurabhdubeykpl@gmail.com
          </a>
        </p>
        <p>
          Visit my{' '}
          <a href="https://github.com/Saurabh-d-7717">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
