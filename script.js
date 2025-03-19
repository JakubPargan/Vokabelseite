// Lade Tesseract.js und führe Textverarbeitung durch
async function processImage() {
  const imageInput = document.getElementById('imageInput');
  const output = document.getElementById('output');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  if (imageInput.files.length === 0) {
    output.innerText = "Bitte wähle ein Bild aus!";
    return;
  }

  const file = imageInput.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    // OCR-Verarbeitung mit Tesseract.js
    output.innerText = "Verarbeite das Bild...";
    const { createWorker } = Tesseract;
    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('deu');
    await worker.initialize('deu');

    const { data: { text } } = await worker.recognize(canvas);
    output.innerText = `Extrahierter Text:\n\n${text}`;

    await worker.terminate();

    // Starte den Vokabeltrainer mit dem extrahierten Text
    startTrainer(text);
  };
}

// Verarbeite den Text und führe einen Vokabeltrainer durch
function startTrainer(text) {
  const output = document.getElementById('output');
  const words = text.split(/\s+/).filter(word => word.length > 3); // Extrahiere Wörter mit mehr als 3 Buchstaben
  let currentWordIndex = 0;

  // Anzeige des ersten Vokabelworts
  if (words.length === 0) {
    output.innerText = "Keine Vokabeln gefunden!";
    return;
  }

  output.innerText = `Lernmodus gestartet! Vokabeln: ${words.length}\n`;
  askQuestion();

  // Funktion zur Abfrage
  function askQuestion() {
    if (currentWordIndex >= words.length) {
      output.innerText += "\nSuper! Du hast alle Vokabeln durch!";
      return;
    }

    const currentWord = words[currentWordIndex];
    const userAnswer = prompt(`Was bedeutet: "${currentWord}"? (Nur eine beispielhafte Logik)`);

    if (userAnswer !== null) {
      output.innerText += `\n"${currentWord}" -> Deine Antwort: ${userAnswer}`;
      currentWordIndex++;
      askQuestion();
    } else {
      output.innerText += "\nVokabeltrainer beendet.";
    }
  }
}
