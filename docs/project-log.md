## 2026-02-04
- İstek: Lean Canvas baz alınarak nereden başlanacağı soruldu.
- Gerekçe: Kurs ödevi olduğu için MVP kapsamı netleşmeden koda girilmemeli.
- Yapılan: MVP kapsamını tanımlayan docs/mvp-scope.md oluşturuldu.
- Hata: -
- Çözüm: -
- Sonuç: Projenin ilk öğrenme hedefi ve sınırları kilitlendi.

## 2026-02-04
- İstek: Lean Canvas’a göre MVP’nin ilk uçtan uca akışı istendi.
- Gerekenler: /tests/new formu, POST kaydı, /analysis ekranı.
- Yapılanlar: tests route + analysis route + 2 pug view eklendi. Geçici veri app.locals ile paylaşıldı.
- Hata: (varsa Erdal yazacak)
- Çözüm: (varsa Erdal yazacak)
- Sonuç: Kullanıcı test girişi → konu analizi → öneri akışı çalışır hale geldi.

## 2026-02-04
- İstek: /analysis ekranı, test çözme akışından gelen veriye göre otomatik analiz ve öneri üretsin.
- Gerekenler: lastAttempt.topicStats verisini okuyup konu skorlarını hesaplamak; zayıf/orta/iyi sınıflamak; öneri listesi üretmek.
- Yapılanlar: src/routes/analysis.js içinde lastResult bağımlılığı kaldırıldı; lastAttempt.topicStats tabanlı hesaplama eklendi; subject alanı test başlığına bağlandı.
- Hata: -
- Çözüm: -
- Sonuç: Öğrenci test çözüyor → sonuç ekranı → konu bazlı analiz + öneri akışı otomatik çalışıyor.
