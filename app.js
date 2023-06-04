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

// Inicjalizacja rozpoznawania obiektów
function initObjectDetection() {
  cocoSsd.load()
    .then(function (model) {
      detectObjects(model);
    })
    .catch(function (error) {
      console.log('Wystąpił błąd podczas ładowania modelu COCO-SSD:', error);
    });
}

// Wykrywanie obiektów i wyświetlanie informacji
function detectObjects(model) {
  model.detect(videoElement)
    .then(function (predictions) {
      displayPredictions(predictions);
      requestAnimationFrame(function () {
        detectObjects(model);
      });
    })
    .catch(function (error) {
      console.log('Wystąpił błąd podczas wykrywania obiektów:', error);
    });
}

// Wyświetlanie predykcji obiektów na interfejsie HUD
function displayPredictions(predictions) {
  // Wyczyszczenie poprzednich predykcji
  while (hudContainer.firstChild) {
    hudContainer.removeChild(hudContainer.firstChild);
  }

  // Wyświetlanie ramki i etykiety dla każdej predykcji
  predictions.forEach(function (prediction) {
    const box = document.createElement('div');
    box.className = 'prediction-box';
    box.style.top = prediction.bbox[1] + 'px';
    box.style.left = prediction.bbox[0] + 'px';
    box.style.width = prediction.bbox[2] + 'px';
    box.style.height = prediction.bbox[3] + 'px';

    const label = document.createElement('div');
    label.className = 'prediction-label';
    label.innerText = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

    box.appendChild(label);
    hudContainer.appendChild(box);
  });
}
