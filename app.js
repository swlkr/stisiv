var config         = require("./config"),
    app            = require("koa")(),
    bodyParser     = require("koa-bodyparser"),
    overrideMethod = require("koa-override-method"),
    logger         = require("koa-logger"),
    jwt            = require("koa-jwt"),
    route          = require("koa-route"),
    routes         = require("./routes")(app, route);

app.use(logger());
app.use(bodyParser());
app.use(function *(next) {
  this.request.method = overrideMethod.call(this, this.request.body);
  yield next;
});

app.use(function *(next) {
  this.set("Access-Control-Allow-Origin", config.app.origin);
  this.set("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, X-Requested-With");
  this.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

  if(this.method === "OPTIONS") {
    this.status = 200;
    this.body = "";
  } else {
    yield next;
  }
});

app.use(function *(next) {
  try {
    yield next;
  } catch(error) {
    this.status = error.status || 500;
    this.body = error.message;
  }
});

// Unauthenticated routes
routes.open().map(routes.setup);

// Eveything below this requires authentication
app.use(jwt({ secret: config.app.secret }));

// Authenticated routes
routes.auth().map(routes.setup);

app.listen(config.app.port);
console.log("listening on port %d", config.app.port);
