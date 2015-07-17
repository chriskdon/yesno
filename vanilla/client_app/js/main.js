var _ = require('underscore');

var QuestionManager = require('./question-manager');
var tload = require('./template-loader');
var guid = require('./guid');

var $mainContainer = $("#main");
var templates = ['main', 'question', 'new-question', 'search'];

function registerTemplates(templates) {
  return $.when.apply($, templates.map(function(templateName) {
    return tload('templates/' + templateName + '.handlebars').done(function(template) {
      Handlebars.registerPartial(templateName, template);
    });
  }));
}

function initAppContainer($appContainer) {
  return registerTemplates(templates).done(function() {
    tload('templates/main.handlebars').done(function(template) {
      $appContainer.html(template());
    });
  });
}

function onNewQuestion($questionList, question) {
  tload('templates/question.handlebars').done(function(template) {
      $questionList.prepend(template(question));
  });
}

function onSearch($questionList, searchText) {
  // TODO: Search
}

function onAskNewQuestion(questionManager, question) {
  questionManager.newQuestion({
    questionId: guid();
    question: question,
    yes: 0,
    no: 0
  });
}

function initTestSetup(questionManager) {
  questionManager.newQuestion({
    questionId: guid(),
    question: "Is the world round?",
    yes: 0,
    no: 0
  });

  questionManager.newQuestion({
    questionId: guid(),
    question: "Is it going to rain today?",
    yes: 0,
    no: 0
  });
}

initAppContainer($mainContainer).done(function() {
  var questionManager = new QuestionManager();

  var $questionList = $("#questionList");
  var $btnAskQuestion = $("#btnAskQuestion");
  var $txtAskQuestion = $("#txtAskQuestion");
  var $btnSearch = $("#btnSearch");
  var $txtSearch = $("#txtSearch");

  $btnAskQuestion.click(function() {
    onAskNewQuestion(questionManager, $txtAskQuestion.val());
  });

  $btnSearch.click(function() {
    onSearch($questionList, $txtSearch.val());
  });

  questionManager.onNewQuestion(function(question) {
    onNewQuestion($questionList, question);
  });

  initTestSetup(questionManager);
});
