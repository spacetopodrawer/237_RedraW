import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/processing_service.dart';
import '../widgets/import_section.dart';
import '../widgets/processing_section.dart';
import '../widgets/results_section.dart';
import '../widgets/map_section.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

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
              selectedFile: context.watch<ProcessingService>().selectedFile,
              onImport: () => context.read<ProcessingService>().importFile(),
            ),
            const SizedBox(height: 16),
            ProcessingSection(
              isEnabled: context.watch<ProcessingService>().canProcess,
              isProcessing: context.watch<ProcessingService>().isProcessing,
              onProcess: () => context.read<ProcessingService>().processData(),
            ),
            const SizedBox(height: 16),
            const Expanded(
              child: MapSection(),
            ),
            const SizedBox(height: 16),
            ResultsSection(
              results: context.watch<ProcessingService>().results,
            ),
          ],
        ),
      ),
    );
  }
}
