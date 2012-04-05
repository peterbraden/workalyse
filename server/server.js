var express = require('express')
  , app = express.createServer()
  , mustache = require("mustache")
  , fs = require('fs')
  , email = require('mailer')

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


var mailSignup = function(recip){
  
  var json = JSON.parse(fs.readFileSync(__dirname + "/../signupemails.json", "utf8"))
  json['emails'].push(recip)
  fs.writeFileSync(__dirname + "/../signupemails.json", JSON.stringify(json))


  email.send({
    to : recip,
    from : "signup@workalyse.com",
    subject : "Welcome to Workalyse",
    template : __dirname + "/../emails/beta.txt", 
    host : "localhost",              // smtp server hostname
    port : "25",                     // smtp server port
    domain : "localhost",           // domain used by client to identify itself to server
    authentication : "login",        // auth login is supported; anything else is no auth
    username : "my_username",        // username
    password : "my_password"         // password
  }, function(err, resp){
    console.log("MAIL:", err, resp);
  })
}

app.use(express.logger())
app.use(express.bodyParser());
app.use(app.router);

app.use("/static/", express.static(__dirname + '/../public'));
app.set("views", __dirname + "/../views");

app.set("view options", {layout: false});
app.register(".html", tmpl);


app.get('/', function(req, res){
  res.render('index.html');
});


app.post('/signup', function(req, res){
  
  if (req.body && req.body.email){
    mailSignup(req.body.email);
  }  
  
  res.render('thanks-for-signup.html')
  
});


app.listen(1995)      