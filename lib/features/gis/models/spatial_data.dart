import 'package:equatable/equatable.dart';
import 'package:geojson/geojson.dart';

class SpatialData extends Equatable {
  final String id;
  final GeoJsonFeature feature;
  final Map<String, dynamic> properties;
  final DateTime createdAt;
  final DateTime updatedAt;

  const SpatialData({
    required this.id,
    required this.feature,
    required this.properties,
    required this.createdAt,
    required this.updatedAt,
  });

  @override
  List<Object> get props => [
        id,
        feature,
        properties,
        createdAt,
        updatedAt,
      ];

  Map<String, dynamic> toJson() => {
        'id': id,
        'feature': feature.toJson(),
        'properties': properties,
        'createdAt': createdAt.toIso8601String(),
        'updatedAt': updatedAt.toIso8601String(),
      };

  factory SpatialData.fromJson(Map<String, dynamic> json) => SpatialData(
        id: json['id'] as String,
        feature:
            GeoJsonFeature.fromJson(json['feature'] as Map<String, dynamic>),
        properties: json['properties'] as Map<String, dynamic>,
        createdAt: DateTime.parse(json['createdAt'] as String),
        updatedAt: DateTime.parse(json['updatedAt'] as String),
      );
}
