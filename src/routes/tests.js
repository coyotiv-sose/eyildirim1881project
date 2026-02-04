const express = require("express");
const router = express.Router();

const { getTest } = require("../data/tests");


// Basit geçici hafıza (MVP için)
let lastResult = null;

// GET /tests/new  -> form
router.get("/new", (req, res) => {
  res.render("tests-new", {
    title: "Test Sonucu Gir",
  });
});

// POST /tests -> kaydet ve analize yönlendir
router.post("/", (req, res) => {
  // Basit örnek: 3 konu alıyoruz (MVP)
  const { subject, topic1, correct1, wrong1, topic2, correct2, wrong2, topic3, correct3, wrong3 } = req.body;

  lastResult = {
    subject: subject || "Bilinmiyor",
    topics: [
      { name: topic1, correct: Number(correct1 || 0), wrong: Number(wrong1 || 0) },
      { name: topic2, correct: Number(correct2 || 0), wrong: Number(wrong2 || 0) },
      { name: topic3, correct: Number(correct3 || 0), wrong: Number(wrong3 || 0) },
    ].filter(t => (t.name || "").trim().length > 0),
  };

  return res.redirect("/analysis");
});

// DİKKAT: analysis route burada değil, ayrı tutacağız (daha temiz)
// lastResult'u analysis route okuyacak.
router._getLastResult = () => lastResult;

// GET /tests/:testId -> öğrenci test ekranı
router.get("/:testId", (req, res) => {
  const testId = req.params.testId;
  const test = getTest(testId);

  if (!test) {
    return res.status(404).send("Test bulunamadı.");
  }

  return res.render("tests-take", {
    title: "Test",
    testId: test.id,
    testTitle: test.title,
    questions: test.questions,
  });
});

// POST /tests/:testId/submit -> otomatik değerlendirme + sonuç + analize hazırla
router.post("/:testId/submit", (req, res) => {
  const testId = req.params.testId;
  const test = getTest(testId);

  if (!test) {
    return res.status(404).send("Test bulunamadı.");
  }

  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;

  const topicStats = {}; // { topic: { correct, wrong, blank } }

  for (const q of test.questions) {
    const key = `q${q.id}`;
    const selected = (req.body[key] || "").trim().toUpperCase();

    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { correct: 0, wrong: 0, blank: 0 };
    }

    if (!selected) {
      blankCount += 1;
      topicStats[q.topic].blank += 1;
      continue;
    }

    if (selected === q.correct) {
      correctCount += 1;
      topicStats[q.topic].correct += 1;
    } else {
      wrongCount += 1;
      topicStats[q.topic].wrong += 1;
    }
  }

  // Son denemeyi paylaş (results + analysis ekranları okuyacak)
  req.app.locals.lastAttempt = {
    testId: test.id,
    testTitle: test.title,
    correctCount,
    wrongCount,
    blankCount,
    topicStats,
  };

  return res.redirect("/results");
});


module.exports = router;
