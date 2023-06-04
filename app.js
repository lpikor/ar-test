// Zdefiniowanie stałych
const videoElement = document.getElementById('videoElement');
const hudContainer = document.getElementById('hudContainer');

// Sprawdzenie dostępności kamery
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    videoElement.srcObject = stream;
    initObjectDetection();
  })
  .catch(function (error) {
    console.log('Wystąpił błąd podczas uzyskiwania dostępu do kamery:', error);
  });

  alert('mobile test');