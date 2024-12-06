import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Upload, Database, FileOutput } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Traitement GNSS Professionnel
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Importez, analysez et visualisez vos données GNSS en toute simplicité
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={Upload}
            title="Import RINEX"
            description="Support complet des fichiers RINEX pour un traitement précis"
          />
          <FeatureCard
            icon={Database}
            title="Analyse NMEA"
            description="Traitement avancé des données NMEA en temps réel"
          />
          <FeatureCard
            icon={FileOutput}
            title="Export Flexible"
            description="Exportez vos résultats en PDF, DXF ou GeoJSON"
          />
        </div>

        <Link to="/register" className="btn btn-primary">
          Commencer maintenant
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}