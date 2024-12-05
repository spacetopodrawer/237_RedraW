import 'package:flutter/material.dart';
import 'package:gnss_post_process/features/gnss/screens/gnss_screen.dart';
import 'package:gnss_post_process/features/rtk/screens/rtk_screen.dart';
import 'package:gnss_post_process/features/gis/screens/gis_screen.dart';

class NavigationScreen extends StatefulWidget {
  const NavigationScreen({super.key});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    GnssScreen(),
    RtkScreen(),
    GisScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.satellite_alt),
            label: 'GNSS',
          ),
          NavigationDestination(
            icon: Icon(Icons.router),
            label: 'RTK',
          ),
          NavigationDestination(
            icon: Icon(Icons.map),
            label: 'GIS',
          ),
        ],
      ),
    );
  }
}
