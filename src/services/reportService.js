import PDFDocument from 'pdfkit';
import { promises as fs } from 'fs';
import { join } from 'path';
import nodemailer from 'nodemailer';

export class ReportService {
  async generateReport(data, options = {}) {
    const doc = new PDFDocument();
    const filename = `report_${Date.now()}.pdf`;
    const path = join(process.cwd(), 'reports', filename);
    
    await fs.mkdir(join(process.cwd(), 'reports'), { recursive: true });
    const writeStream = fs.createWriteStream(path);
    
    doc.pipe(writeStream);
    
    // En-tête
    doc.fontSize(20).text('Rapport de Post-traitement GNSS', { align: 'center' });
    doc.moveDown();
    
    // Informations générales
    doc.fontSize(14).text('Informations générales');
    doc.fontSize(12)
      .text(`Date: ${new Date().toLocaleDateString()}`)
      .text(`Fichier traité: ${data.filename}`)
      .text(`Méthode: ${data.method}`);
    doc.moveDown();
    
    // Coordonnées
    doc.fontSize(14).text('Coordonnées');
    doc.fontSize(12)
      .text('WGS84:')
      .text(`  Latitude: ${data.coordinates.lat}°`)
      .text(`  Longitude: ${data.coordinates.lon}°`)
      .text(`  Altitude: ${data.coordinates.alt}m`)
      .moveDown()
      .text('UTM:')
      .text(`  Zone: ${data.coordinates.utm.zone}${data.coordinates.utm.hemisphere}`)
      .text(`  Est: ${data.coordinates.utm.easting}m`)
      .text(`  Nord: ${data.coordinates.utm.northing}m`);
    
    // Statistiques
    if (data.statistics) {
      doc.moveDown()
        .fontSize(14).text('Statistiques')
        .fontSize(12)
        .text(`Précision horizontale: ${data.statistics.horizontalPrecision}m`)
        .text(`Précision verticale: ${data.statistics.verticalPrecision}m`)
        .text(`PDOP: ${data.statistics.pdop}`)
        .text(`Satellites utilisés: ${data.statistics.satellites}`);
    }
    
    doc.end();
    await new Promise(resolve => writeStream.on('finish', resolve));
    
    return { filename, path };
  }
  
  async emailReport(to, reportPath, options = {}) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: options.subject || 'Rapport de post-traitement GNSS',
      text: options.text || 'Veuillez trouver ci-joint votre rapport de post-traitement GNSS.',
      attachments: [{
        filename: reportPath.split('/').pop(),
        path: reportPath
      }]
    });
    
    return info;
  }
}