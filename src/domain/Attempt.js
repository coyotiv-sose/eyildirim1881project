class Attempt {
  constructor({ id, testId, userId, answers, createdAt }) {
    this.id = id;                 // ör: "att-001" (şimdilik string)
    this.testId = testId;         // ör: "math-test-001"
    this.userId = userId || null; // Auth yok → şimdilik null olabilir
    this.answers = answers || {}; // ör: { q1: "A", q2: "C", ... }
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Attempt;
