import 'package:equatable/equatable.dart';

class GnssData extends Equatable {
  final double latitude;
  final double longitude;
  final double altitude;
  final double accuracy;
  final DateTime timestamp;
  final Map<String, dynamic> rawData;

  const GnssData({
    required this.latitude,
    required this.longitude,
    required this.altitude,
    required this.accuracy,
    required this.timestamp,
    required this.rawData,
  });

  @override
  List<Object> get props => [
        latitude,
        longitude,
        altitude,
        accuracy,
        timestamp,
        rawData,
      ];

  Map<String, dynamic> toJson() => {
        'latitude': latitude,
        'longitude': longitude,
        'altitude': altitude,
        'accuracy': accuracy,
        'timestamp': timestamp.toIso8601String(),
        'rawData': rawData,
      };

  factory GnssData.fromJson(Map<String, dynamic> json) => GnssData(
        latitude: json['latitude'] as double,
        longitude: json['longitude'] as double,
        altitude: json['altitude'] as double,
        accuracy: json['accuracy'] as double,
        timestamp: DateTime.parse(json['timestamp'] as String),
        rawData: json['rawData'] as Map<String, dynamic>,
      );
}
