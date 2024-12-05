import 'package:equatable/equatable.dart';

enum RtkConnectionStatus { disconnected, connecting, connected, streaming }

class RtkConnection extends Equatable {
  final String host;
  final int port;
  final String mountpoint;
  final RtkConnectionStatus status;
  final DateTime? lastUpdate;

  const RtkConnection({
    required this.host,
    required this.port,
    required this.mountpoint,
    this.status = RtkConnectionStatus.disconnected,
    this.lastUpdate,
  });

  @override
  List<Object?> get props => [
        host,
        port,
        mountpoint,
        status,
        lastUpdate,
      ];

  RtkConnection copyWith({
    String? host,
    int? port,
    String? mountpoint,
    RtkConnectionStatus? status,
    DateTime? lastUpdate,
  }) =>
      RtkConnection(
        host: host ?? this.host,
        port: port ?? this.port,
        mountpoint: mountpoint ?? this.mountpoint,
        status: status ?? this.status,
        lastUpdate: lastUpdate ?? this.lastUpdate,
      );
}
