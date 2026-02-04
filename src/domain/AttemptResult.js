class AttemptResult {
  constructor({ attemptId, testId, testTitle, correctCount, wrongCount, blankCount, topicStats }) {
    this.attemptId = attemptId;
    this.testId = testId;
    this.testTitle = testTitle;

    this.correctCount = correctCount || 0;
    this.wrongCount = wrongCount || 0;
    this.blankCount = blankCount || 0;

    // { topicName: { correct: n, wrong: n, blank: n } }
    this.topicStats = topicStats || {};
  }
}

module.exports = AttemptResult;
