import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import MapView from './components/map/MapView';
import AuthMapOverlay from './components/map/AuthMapOverlay';
import GnssProcessing from './pages/GnssProcessing';
import RtkMonitoring from './pages/RtkMonitoring';
import GisAnalysis from './pages/GisAnalysis';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="h-[calc(100vh-4rem)] relative">
        <MapView />
        <AuthMapOverlay />
        {isAuthenticated && (
          <Routes>
            <Route path="/gnss" element={<GnssProcessing />} />
            <Route path="/rtk" element={<RtkMonitoring />} />
            <Route path="/gis" element={<GisAnalysis />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;