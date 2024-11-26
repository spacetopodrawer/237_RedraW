import 'package:flutter/material.dart';

class ImportSection extends StatelessWidget {
  final RinexFile? selectedFile;
  final VoidCallback onImport;

  const ImportSection({
    super.key,
    required this.selectedFile,
    required this.onImport,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'Import des données',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: onImport,
              icon: const Icon(Icons.file_upload),
              label: const Text('Importer fichier RINEX'),
            ),
            if (selectedFile != null)
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(
                  'Fichier sélectionné: ${selectedFile!.name}',
                  style: const TextStyle(fontWeight: FontWeight.w500),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
