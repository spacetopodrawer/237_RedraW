import 'package:flutter/material.dart';

class ResultsSection extends StatelessWidget {
  final ProcessingResult? results;

  const ResultsSection({
    super.key,
    this.results,
  });

  @override
  Widget build(BuildContext context) {
    if (results == null) {
      return const Card(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Text(
            'Aucun résultat disponible',
            style: TextStyle(fontSize: 16),
          ),
        ),
      );
    }

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Résultats',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            _buildCoordinatesSection(results!.coordinates),
            const SizedBox(height: 16),
            _buildPrecisionSection(results!.precision),
          ],
        ),
      ),
    );
  }

  Widget _buildCoordinatesSection(Coordinates coords) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Coordonnées',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text('Latitude: ${coords.latitude.toStringAsFixed(8)}°'),
        Text('Longitude: ${coords.longitude.toStringAsFixed(8)}°'),
        Text('Altitude: ${coords.altitude.toStringAsFixed(3)}m'),
        const SizedBox(height: 8),
        Text('UTM Zone: ${coords.utm.zone}${coords.utm.hemisphere}'),
        Text('Est: ${coords.utm.easting.toStringAsFixed(3)}m'),
        Text('Nord: ${coords.utm.northing.toStringAsFixed(3)}m'),
      ],
    );
  }

  Widget _buildPrecisionSection(Precision precision) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Précision',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text('Horizontale: ${precision.horizontal.toStringAsFixed(3)}m'),
        Text('Verticale: ${precision.vertical.toStringAsFixed(3)}m'),
      ],
    );
  }
}
