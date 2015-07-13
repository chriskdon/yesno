var cache = [];

function getTemplateAjax(path) {
  var def = $.Deferred();

  if(cache[path]) {
    def.resolve(cache[path]);
  } else {
    $.ajax({
      url: path,
      success: function(data) {
        var template = Handlebars.compile(data);
        cache[path] = template;
        def.resolve(template);
      }
   });
  }

 return def.promise();
}

module.exports = getTemplateAjax;
