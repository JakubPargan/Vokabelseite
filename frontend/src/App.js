import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:5000/upload', formData);
    alert('Datei hochgeladen!');
  };

  return (
    <div>
      <h1>Vokabel-KI</h1>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Hochladen</button>
    </div>
  );
}

export default App;
