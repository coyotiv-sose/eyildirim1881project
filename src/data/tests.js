// src/data/tests.js
// Öğrenci konu etiketini görmez; biz backend'de tutarız.

const TESTS = {
  "math-test-001": {
    id: "math-test-001",
    title: "Matematik Deneme - 001",
    // MVP: Soru metinleri placeholder, sonra gerçek sorular eklenebilir.
    questions: Array.from({ length: 20 }, (_, idx) => {
      const n = idx + 1;

      // MVP için basit konu dağılımı (4 konu x 5 soru)
      const topic =
        n <= 5 ? "Fonksiyonlar" :
        n <= 10 ? "Polinomlar" :
        n <= 15 ? "Trigonometri" :
        "Olasılık";

      // MVP: örnek cevap anahtarı (A/B/C/D döngüsü)
      const correct = ["A", "B", "C", "D"][idx % 4];

      return {
        id: n,
        text: `Soru ${n}`,
        options: ["A", "B", "C", "D"],
        correct,
        topic
      };
    })
  }
};

function getTest(testId) {
  return TESTS[testId] || null;
}

module.exports = { getTest };
