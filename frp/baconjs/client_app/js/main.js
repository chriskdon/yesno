var tload = require('./template-loader');

var $mainContainer = $("#main");

tload('templates/main.handlebars').done(function(template) {
  $mainContainer.html(template());
});
