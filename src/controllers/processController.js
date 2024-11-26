export const handleProcess = async (req, res) => {
  try {
    const { filename } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Nom de fichier manquant' });
    }

    // Simulation du traitement GNSS
    const results = await processGNSSData(filename);
    
    res.json({
      message: 'Traitement terminé',
      results: {
        filename,
        timestamp: new Date().toISOString(),
        status: 'success',
        ...results
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function processGNSSData(filename) {
  // Simulation du traitement
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
      altitude: 35
    },
    precision: {
      horizontal: 0.02,
      vertical: 0.05
    },
    satellites: {
      used: 12,
      visible: 15
    }
  };
}