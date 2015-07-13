var tload = require('./template-loader');

var $mainContainer = $("#main");

var templates = ['main', 'question'];

function registerTemplates(templates) {
  return $.when.apply($, templates.map(function(templateName) {
    return tload('templates/' + templateName + '.handlebars').done(function(template) {
      Handlebars.registerPartial(templateName, template);
    }));
  })
}

function initAppContainer($appContainer) {
  registerTemplates(templates).done(function() {
    tload('templates/main.handlebars').done(function(template) {
      $appContainer.html(template());
    });
  });
}

initAppContainer($mainContainer);
