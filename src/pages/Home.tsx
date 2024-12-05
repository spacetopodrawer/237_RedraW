import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenue sur 237_RedraW
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/gnss"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Post-traitement GNSS</h2>
          <p className="text-gray-600">
            Traitez vos données GNSS pour une précision optimale
          </p>
        </Link>
        <Link
          to="/rtk"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Monitoring RTK</h2>
          <p className="text-gray-600">
            Suivez vos connexions RTK en temps réel
          </p>
        </Link>
        <Link
          to="/gis"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Analyse SIG</h2>
          <p className="text-gray-600">
            Analysez et visualisez vos données géographiques
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;