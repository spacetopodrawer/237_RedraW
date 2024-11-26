import { detectRinexVersion } from '../utils/rinexUtils.js';
import { promises as fs } from 'fs';
import { join } from 'path';

export const handleUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier n\'a été uploadé' });
        }

        // Vérifier que le dossier uploads existe
        const uploadsDir = join(process.cwd(), 'uploads');
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        // Détection de la version et du type RINEX
        const fileInfo = await detectRinexVersion(req.file.path);

        res.json({
            message: 'Fichier uploadé avec succès',
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            rinexInfo: fileInfo
        });
    } catch (error) {
        console.error('Erreur upload:', error);
        res.status(500).json({ error: error.message });
    }
};