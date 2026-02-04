const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // tests router'ından paylaşılan veriyi app.js üzerinden aktaracağız
  const attempt = req.app.locals.lastAttempt;

  if (!attempt) {
    return res.render("analysis", {
      title: "Konu Bazlı Analiz",
      empty: true,
    });
  }

  const topicStats = attempt.topicStats || {};

  const topicsWithScore = Object.keys(topicStats).map((topic) => {
    const s = topicStats[topic];
    const score = (s.correct || 0) - (s.wrong || 0); // basit MVP skor
    return {
      name: topic,
      correct: s.correct || 0,
      wrong: s.wrong || 0,
      blank: s.blank || 0,
      score,
    };
  });

  // MVP eşikleri (daha küçük aralıklar)
  const weak = topicsWithScore.filter(t => t.score <= 0);
  const medium = topicsWithScore.filter(t => t.score >= 1 && t.score <= 2);
  const good = topicsWithScore.filter(t => t.score >= 3);

  // Öneri: zayıfları önce öner
  weak.sort((a, b) => a.score - b.score);
  const recommendations = weak.map(t => `${t.name} konusu için test çöz (öncelik)`);

  return res.render("analysis", {
    title: "Konu Bazlı Analiz",
    empty: false,
    subject: attempt.testTitle,
    weak,
    medium,
    good,
    recommendations,
  });
});

module.exports = router;
