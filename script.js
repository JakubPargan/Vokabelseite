async function uploadFile() {
  const fileInput = document.getElementById('upload');
  if (fileInput.files.length === 0) {
    document.getElementById('message').innerText = "Bitte wähle eine Datei aus!";
    return;
  }
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  try {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });
    const result = await response.text();
    document.getElementById('message').innerText = result;
  } catch (error) {
    document.getElementById('message').innerText = "Fehler beim Hochladen!";
  }
}
