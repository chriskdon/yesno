var tload = require('./template-loader');

var $mainContainer = $("#main");

var templates = ['main', 'question'];

// TODO: Return promise indicating all templates loaded
function registerTemplates(templates) {
  templates.forEach(function(templateName) {
    tload('templates/' + templateName + '.handlebars').done(function(template) {
      Handlebars.registerPartial(templateName, template);
    });
  })
}

registerTemplates(templates);

tload('templates/main.handlebars').done(function(template) {
  $mainContainer.html(template());
});
