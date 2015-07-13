var cache = [];

function getTemplateAjax(path, callback) {
  if(cache[path]) {
    if(callback) { callback(cache[path]); }
    return;
  }

  var source;
  var template;

  $.ajax({
    url: path,
    success: function(data) {
      source    = data;
      template  = Handlebars.compile(source);
      cache[path] = template;

      //execute the callback if passed
      if (callback) { callback(template); }
    }
 });
}

module.exports = getTemplateAjax;
