const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  // Hier kannst du das KI-Modell aufrufen
  res.send('Datei erfolgreich hochgeladen.');
});

app.listen(5000, () => {
  console.log('Server läuft auf Port 5000');
});
