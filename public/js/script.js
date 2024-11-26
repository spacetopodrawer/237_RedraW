import { uploadFile, processFile } from './api.js';
import { updateUploadStatus, updateProcessingStatus, displayFileDetails, displayResults } from './ui.js';
import { GNSSMap } from './map.js';
import { RTKInterface } from './rtk.js';
import { EntityManager } from './entityManager.js';
import { GeoreferenceManager } from './georeferenceManager.js';

let map;
let currentFile;
let rtkInterface;
let entityManager;
let georeferenceManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des gestionnaires
    map = new GNSSMap('map', {
        defaultLayer: 'osm',
        offlineSupport: true
    });
    
    entityManager = new EntityManager(map);
    georeferenceManager = new GeoreferenceManager(map);
    rtkInterface = new RTKInterface(map);

    // Éléments UI
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const processButton = document.getElementById('processButton');
    const processingMethod = document.getElementById('processingMethod');
    const baseFileGroup = document.getElementById('baseFileGroup');
    const sppOptions = document.getElementById('sppOptions');
    const generateReportButton = document.getElementById('generateReport');
    const emailReportButton = document.getElementById('emailReport');

    // Gestionnaires d'événements pour le traitement
    processingMethod.addEventListener('change', () => {
        const method = processingMethod.value;
        baseFileGroup.style.display = method === 'base-rover' ? 'block' : 'none';
        sppOptions.style.display = method === 'spp' ? 'block' : 'none';
    });

    // Upload de fichiers
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) {
            updateUploadStatus('Veuillez sélectionner un fichier', true);
            return;
        }

        const submitButton = uploadForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        updateUploadStatus('Upload en cours...', false);

        try {
            const data = await uploadFile(file);
            updateUploadStatus('Fichier uploadé avec succès');
            displayFileDetails(data);
            currentFile = data.filename;
            processButton.disabled = false;

            // Gérer les différents types de fichiers
            if (file.name.toLowerCase().endsWith('.dxf')) {
                await entityManager.importDXF(data.path);
            } else if (file.name.toLowerCase().endsWith('.shp')) {
                await entityManager.importShapefile(data.path);
            } else if (isImageFile(file.name)) {
                await georeferenceManager.loadImage(data.path);
            } else {
                // Fichiers GNSS standards
                if (data.coordinates) {
                    map.addTrack(data.coordinates, {
                        color: '#3388ff',
                        weight: 3,
                        group: 'track'
                    });
                    map.fitBounds(data.coordinates);
                }
            }
        } catch (error) {
            updateUploadStatus(error.message || 'Erreur lors de l\'upload', true);
            processButton.disabled = true;
        } finally {
            submitButton.disabled = false;
        }
    });

    // Traitement des données
    processButton.addEventListener('click', async () => {
        if (!currentFile) return;

        processButton.disabled = true;
        updateProcessingStatus('Traitement en cours...');

        try {
            const method = processingMethod.value;
            const options = {
                method,
                startTime: document.getElementById('startTime').value,
                endTime: document.getElementById('endTime').value
            };

            // Options SPP spécifiques
            if (method === 'spp') {
                options.maskAngle = parseFloat(document.getElementById('maskAngle').value);
                options.troposphereModel = document.getElementById('troposphereModel').value;
                options.ionosphereModel = document.getElementById('ionosphereModel').value;
            }

            const data = await processFile(currentFile, options);
            updateProcessingStatus('Traitement terminé avec succès');
            displayResults(data);

            // Mise à jour de la carte
            map.clearLayer('results');
            
            const { lat, lon } = data.results.coordinates;
            map.addMarker(lat, lon, {
                title: `Position calculée<br>
                       Lat: ${lat.toFixed(8)}°<br>
                       Lon: ${lon.toFixed(8)}°<br>
                       Alt: ${data.results.coordinates.alt.toFixed(3)}m<br>
                       UTM: ${data.results.coordinates.utm.zone}${data.results.coordinates.utm.hemisphere} 
                       ${data.results.coordinates.utm.easting.toFixed(3)}E 
                       ${data.results.coordinates.utm.northing.toFixed(3)}N`,
                group: 'results'
            });

            if (data.results.track) {
                map.addTrack(data.results.track, {
                    color: '#ff3388',
                    weight: 3,
                    group: 'results'
                });
            }

            map.fitBounds('results');

        } catch (error) {
            updateProcessingStatus(error.message || 'Erreur lors du traitement', true);
        } finally {
            processButton.disabled = false;
        }
    });

    // Gestion des entités
    document.getElementById('createEntity').addEventListener('click', () => {
        const type = document.getElementById('entityType').value;
        entityManager.startCreating(type);
    });

    // Géoréférencement
    document.getElementById('startGeoreference').addEventListener('click', () => {
        georeferenceManager.startCalibration();
    });

    // Gestion des calques
    document.getElementById('toggleLayers').addEventListener('click', () => {
        const panel = document.getElementById('layersPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    document.querySelectorAll('.layer-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            map.toggleLayer(e.target.id, e.target.checked);
        });
    });

    // Gestion des cartes hors-ligne
    document.getElementById('saveOffline').addEventListener('click', async () => {
        try {
            const bounds = map.getBounds();
            await map.saveOfflineArea(bounds);
            updateStatus('Zone sauvegardée avec succès');
        } catch (error) {
            updateStatus('Erreur sauvegarde zone: ' + error.message, 'error');
        }
    });

    // Export/Import
    document.getElementById('exportData').addEventListener('click', () => {
        const format = prompt('Format d\'export (kml, kmz, csv, dxf, shp):', 'kml');
        if (!format) return;

        map.exportData(format.toLowerCase()).then(url => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `export_${Date.now()}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }).catch(error => {
            alert('Erreur lors de l\'export: ' + error.message);
        });
    });

    document.getElementById('importData').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.kml,.kmz,.csv,.dxf,.shp';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const data = await map.importData(file);
                map.addTrack(data, {
                    color: '#33ff88',
                    weight: 3,
                    group: 'imported'
                });
                map.fitBounds('imported');
            } catch (error) {
                alert('Erreur lors de l\'import: ' + error.message);
            }
        };
        input.click();
    });

    // Gestion des rapports
    generateReportButton.addEventListener('click', async () => {
        const format = document.getElementById('reportFormat').value;
        try {
            const response = await fetch('/api/report/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    format,
                    filename: currentFile
                })
            });

            if (!response.ok) throw new Error('Erreur génération rapport');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rapport_${Date.now()}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert('Erreur lors de la génération du rapport: ' + error.message);
        }
    });

    emailReportButton.addEventListener('click', async () => {
        const email = prompt('Adresse email pour l\'envoi du rapport:');
        if (!email) return;

        try {
            const response = await fetch('/api/report/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    filename: currentFile,
                    format: document.getElementById('reportFormat').value
                })
            });

            if (!response.ok) throw new Error('Erreur envoi email');

            alert('Rapport envoyé avec succès');
        } catch (error) {
            alert('Erreur lors de l\'envoi du rapport: ' + error.message);
        }
    });

    // Utilitaires
    function isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.tif', '.tiff'];
        return imageExtensions.some(ext => 
            filename.toLowerCase().endsWith(ext)
        );
    }

    function updateStatus(message, level = 'info') {
        const status = document.getElementById('status');
        if (status) {
            status.textContent = message;
            status.className = `status-${level}`;
        }
    }
});