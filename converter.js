const inputField = document.getElementById('input-temp');
const fromUnitField = document.getElementById('input-unit');
const toUnitField = document.getElementById('output-unit');
const outputField = document.getElementById('output-temp');
const form = document.getElementById('converter');

function convertTemp(value, fromUnit, toUnit) {
  if (fromUnit === 'c') {
    if (toUnit === 'f') {
      return value * 9 / 5 + 32;
    } else if (toUnit === 'k') {
      return value + 273.15;
    }
    return value;
  }
  if (fromUnit === 'f') {
    if (toUnit === 'c') {
      return (value - 32) * 5 / 9;
    } else if (toUnit === 'k') {
      return (value + 459.67) * 5 / 9;
    }
    return value;
  }
  if (fromUnit === 'k') {
    if (toUnit === 'c') {
      return value - 273.15;
    } else if (toUnit === 'f') {
      return value * 9 / 5 - 459.67;
    }
    return value;
  }
  throw new Error('Invalid unit');
}

async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0]; // Get the first selected file

  if (!file) {
    alert('Please select a file first!');
    return;
  }

  alert(file.name);

  return;

  const formData = new FormData();
  // Append the file to the FormData object with a key (e.g., 'uploadedFile')
  formData.append('uploadedFile', file);

  try {
    const response = await fetch('/upload-endpoint', {
      method: 'POST', // Use the POST method
      body: formData, // The FormData object automatically sets the correct Content-Type: multipart/form-data header
    });

    if (response.ok) {
      const result = await response.text();
      alert('File uploaded successfully: ' + result);
    } else {
      alert('File upload failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    alert('An error occurred during upload.');
  }
}

form.addEventListener('input', () => {
  const inputTemp = parseFloat(inputField.value);
  const fromUnit = fromUnitField.value;
  const toUnit = toUnitField.value;

  const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
  outputField.value = (Math.round(outputTemp * 100) / 100) + ' ' + toUnit.toUpperCase();
});
