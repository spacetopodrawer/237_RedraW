import L from 'leaflet';

export class GNSSMap {
  constructor(containerId) {
    this.map = L.map(containerId).setView([0, 0], 2);
    this.layers = {};
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    
    this.layerControl = L.control.layers({}, {}).addTo(this.map);
  }
  
  addTrack(points, options = {}) {
    const { name = 'Track', color = '#FF0000', group = 'tracks' } = options;
    
    if (!this.layers[group]) {
      this.layers[group] = L.layerGroup().addTo(this.map);
      this.layerControl.addOverlay(this.layers[group], group);
    }
    
    const polyline = L.polyline(points.map(p => [p.lat, p.lon]), {
      color,
      weight: 3,
      opacity: 0.8
    }).addTo(this.layers[group]);
    
    this.map.fitBounds(polyline.getBounds());
    
    return polyline;
  }
  
  addMarker(lat, lon, options = {}) {
    const { title = '', group = 'markers' } = options;
    
    if (!this.layers[group]) {
      this.layers[group] = L.layerGroup().addTo(this.map);
      this.layerControl.addOverlay(this.layers[group], group);
    }
    
    const marker = L.marker([lat, lon])
      .bindPopup(title)
      .addTo(this.layers[group]);
    
    return marker;
  }
  
  clearLayer(group) {
    if (this.layers[group]) {
      this.layers[group].clearLayers();
    }
  }
  
  setLayerVisibility(group, visible) {
    if (this.layers[group]) {
      if (visible) {
        this.map.addLayer(this.layers[group]);
      } else {
        this.map.removeLayer(this.layers[group]);
      }
    }
  }
}