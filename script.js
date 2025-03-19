const uploadedFiles = [];
let vocabList = [];
const startTrainerButton = document.getElementById('startTrainerButton');

function listUploadedFiles() {
  const imageInput = document.getElementById('imageInput');
  const fileList = document.getElementById('uploadedFiles');
  uploadedFiles.length = 0;

  // Liste aller hochgeladenen Dateien aktualisieren
  for (const file of imageInput.files) {
    uploadedFiles.push(file);
  }

  if (uploadedFiles.length === 0) {
    fileList.innerText = "Keine Dateien hochgeladen.";
    return;
  }

  fileList.innerHTML = "<strong>Hochgeladene Dateien:</strong><br>" +
    uploadedFiles.map(file => file.name).join('<br>');

  // Nur wenn Dateien hochgeladen wurden, darf der Button zum Extrahieren aktiviert sein
  document.getElementById('processImagesButton').disabled = false;
}

async function processImages() {
  const output = document.getElementById('output');
  if (uploadedFiles.length === 0) {
    output.innerText = "Bitte lade zuerst Dateien hoch.";
    return;
  }

  output.innerText = "Texte werden verarbeitet...";
  vocabList = [];

  for (const file of uploadedFiles) {
    const reader = new FileReader();
    reader.onload = async function(event) {
      const img = new Image();
      img.src = event.target.result;

      try {
        const { data: { text } } = await Tesseract.recognize(img.src, 'deu');
        vocabList.push(...text.split(/\s+/));
      } catch (error) {
        output.innerText = `Fehler beim Verarbeiten von ${file.name}: ${error.message}`;
      }

      // Prüfen, ob alle Dateien verarbeitet wurden
      if (uploadedFiles.indexOf(file) === uploadedFiles.length - 1) {
        output.innerText = "Texte erfolgreich extrahiert! Du kannst den Vokabeltrainer starten.";
        startTrainerButton.disabled = false; // Vokabeltrainer aktivieren
      }
    };

    reader.readAsDataURL(file);
  }
}

