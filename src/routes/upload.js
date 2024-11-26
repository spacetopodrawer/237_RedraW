import express from 'express';
import { upload } from '../config/multer.js';
import { handleUpload } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.post('/upload', upload.single('file'), handleUpload);

export { uploadRouter };