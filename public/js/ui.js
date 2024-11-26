// Gestionnaire d'interface utilisateur
export function updateUploadStatus(message, isError = false) {
  const uploadStatus = document.getElementById('uploadStatus');
  uploadStatus.textContent = message;
  uploadStatus.className = isError ? 'error' : 'success';
}

export function updateProcessingStatus(message, isError = false) {
  const processingStatus = document.getElementById('processingStatus');
  processingStatus.textContent = message;
  processingStatus.className = isError ? 'error' : 'success';
}

export function displayFileDetails(fileInfo) {
  const fileDetails = document.getElementById('fileDetails');
  fileDetails.innerHTML = `
    <h4>Détails du fichier</h4>
    <p>Nom: ${fileInfo.originalName}</p>
    <p>Taille: ${formatFileSize(fileInfo.size)}</p>
    ${fileInfo.rinexInfo ? `
      <p>Version RINEX: ${fileInfo.rinexInfo.version || 'Non détectée'}</p>
      <p>Type: ${fileInfo.rinexInfo.type || 'Non détecté'}</p>
    ` : ''}
  `;
  fileDetails.classList.add('visible');
}

export function displayResults(data) {
  const results = document.getElementById('results');
  results.innerHTML = `
    <div class="results-grid">
      <div class="result-item">
        <h4>Coordonnées WGS84</h4>
        <p>Latitude: ${data.results.coordinates.lat.toFixed(8)}°</p>
        <p>Longitude: ${data.results.coordinates.lon.toFixed(8)}°</p>
        <p>Altitude: ${data.results.coordinates.alt.toFixed(3)}m</p>
      </div>
      <div class="result-item">
        <h4>Coordonnées UTM</h4>
        <p>Zone: ${data.results.coordinates.utm.zone}${data.results.coordinates.utm.hemisphere}</p>
        <p>Est: ${data.results.coordinates.utm.easting.toFixed(3)}m</p>
        <p>Nord: ${data.results.coordinates.utm.northing.toFixed(3)}m</p>
      </div>
      <div class="result-item">
        <h4>Précision</h4>
        <p>Horizontale: ${data.results.statistics.horizontalPrecision.toFixed(3)}m</p>
        <p>Verticale: ${data.results.statistics.verticalPrecision.toFixed(3)}m</p>
        <p>PDOP: ${data.results.statistics.pdop.toFixed(2)}</p>
      </div>
      <div class="result-item">
        <h4>Satellites</h4>
        <p>Utilisés: ${data.results.statistics.satellites}</p>
      </div>
    </div>
  `;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}