// Mustache Templates, but with partials etc
var fs = require('fs')
  , mustache = require("mustache")


module.exports = {
  
  
  compile: function (source, options) {
      if (typeof source == 'string') {
          return function(options) {
              options.locals = options.locals || {};
              options.partials = options.partials || {};
              if (options.body) // for express.js > v1.0
                  locals.body = options.body;
                  
              var inner = mustache.to_html(
                  source, options.locals, options.partials);
                  
              return mustache.to_html(fs.readFileSync('./views/base.html', 'utf8'), {content: inner})    
          };
      } else {
          return source;
      }
  },
  
  
  render: function (template, options) {
      template = this.compile(template, options);
      return template(options);
  }
}

