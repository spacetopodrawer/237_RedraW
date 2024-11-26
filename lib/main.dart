import 'package:flutter/material.dart';
import 'services/file_service.dart';
import 'models/rinex_file.dart';
import 'widgets/import_section.dart';
import 'widgets/processing_section.dart';
import 'widgets/results_section.dart';

void main() {
  runApp(const GNSSPostProcessApp());
}

class GNSSPostProcessApp extends StatelessWidget {
  const GNSSPostProcessApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GNSS Post-Processing',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const GNSSHomePage(),
    );
  }
}

class GNSSHomePage extends StatefulWidget {
  const GNSSHomePage({super.key});

  @override
  State<GNSSHomePage> createState() => _GNSSHomePageState();
}

class _GNSSHomePageState extends State<GNSSHomePage> {
  final FileService _fileService = FileService();
  RinexFile? _selectedFile;
  bool _isProcessing = false;
  String? _processingResult;

  Future<void> _importRINEX() async {
    final file = await _fileService.pickRinexFile();
    if (file != null) {
      setState(() {
        _selectedFile = file;
        _processingResult = null;
      });
    }
  }

  Future<void> _processData() async {
    if (_selectedFile == null) return;

    setState(() {
      _isProcessing = true;
      _processingResult = null;
    });

    try {
      await Future.delayed(const Duration(seconds: 2));
      setState(() {
        _processingResult =
            'Traitement terminé avec succès!\nFichier traité: ${_selectedFile!.name}';
      });
    } catch (e) {
      setState(() {
        _processingResult = 'Erreur lors du traitement: $e';
      });
    } finally {
      setState(() {
        _isProcessing = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Post-traitement GNSS'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ImportSection(
              selectedFile: _selectedFile,
              onImport: _importRINEX,
            ),
            const SizedBox(height: 16),
            ProcessingSection(
              isEnabled: _selectedFile != null,
              isProcessing: _isProcessing,
              onProcess: _processData,
            ),
            const SizedBox(height: 16),
            ResultsSection(
              processingResult: _processingResult,
            ),
          ],
        ),
      ),
    );
  }
}
