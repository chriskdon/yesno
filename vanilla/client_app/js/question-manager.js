function QuestionManager() {
  this.onNewQuestionHandler = null;
  this.newQuestionQueue = [];
};

QuestionManager.prototype.onNewQuestion = function(callback) {
  if(this.onNewQuestionHandler) { throw Error("Handler already set."); }
  this.onNewQuestionHandler = callback;

  if(this.onNewQuestionHandler) {
    this.newQuestionQueue.forEach(function(question) {
      this.onNewQuestionHandler(question);
    }.bind(this));
  }
};

QuestionManager.prototype.newQuestion = function(question) {
  if(this.onNewQuestionHandler) {
      this.onNewQuestionHandler(question);
  } else {
    this.newQuestionQueue.push(question);
  }
};

module.exports = QuestionManager;
