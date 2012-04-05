var express = require('express')
  , app = express.createServer()
  , mustache = require("mustache")

var tmpl = {
  compile: function (source, options) {
      if (typeof source == 'string') {
          return function(options) {
              options.locals = options.locals || {};
              options.partials = options.partials || {};
              if (options.body) // for express.js > v1.0
                  locals.body = options.body;
              return mustache.to_html(
                  source, options.locals, options.partials);
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

app.use(express.logger())

app.use(app.router);
app.use(express.bodyParser());

app.use("/static/", express.static(__dirname + '/../public'));
app.set("views", __dirname + "/../views");

app.set("view options", {layout: false});
app.register(".html", tmpl);


app.get('/', function(req, res){
  res.render('index.html');
});


app.post('/signup', function(req, res){
});


app.listen(1995)      