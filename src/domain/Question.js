class Question {
  constructor({ id, text, options, correctKey, topicTag }) {
    this.id = id;
    this.text = text;
    this.options = options;     // ["A","B","C","D"]
    this.correctKey = correctKey;
    this.topicTag = topicTag;   // internal use only
  }
}

module.exports = Question;
