import 'package:flutter_test/flutter_test.dart';
import 'package:puncakmas_app/main.dart';

void main() {
  testWidgets('app opens login screen after splash', (tester) async {
    await tester.pumpWidget(const PuncakMasApp());

    expect(find.text('PuncakMas'), findsOneWidget);
    expect(find.text('Wisata Alam Lampung'), findsOneWidget);

    await tester.pump(const Duration(seconds: 3));
    await tester.pumpAndSettle();

    expect(find.text('Masuk ke Akun'), findsOneWidget);
  });
}
