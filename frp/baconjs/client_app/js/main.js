var tload = require('./template-loader');

tload('templates/test.handlebars', function(template) {
  console.log(template());
});

console.log("Init");
