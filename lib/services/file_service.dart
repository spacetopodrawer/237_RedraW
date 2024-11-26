import 'package:file_picker/file_picker.dart';

class FileService {
  Future<RinexFile?> pickRinexFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['rnx', '21o', '22o', 'obs'],
      );

      if (result != null) {
        return RinexFile(
          path: result.files.single.path!,
          name: result.files.single.name,
          timestamp: DateTime.now(),
        );
      }
    } catch (e) {
      print('Erreur lors de la sélection du fichier: $e');
    }
    return null;
  }
}
