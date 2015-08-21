var schema  = require("../types/Schema"),
    root    = require("../schema/root"),
    graphql = require("graphql"),
    GraphQL = graphql.graphql;

const GraphQLController = {
  routes: function() {
    return [
      { method: "post", url: "/graphql", fn: this.fetch, auth: true },
      { method: "post", url: "/query", fn: this.query, auth: false }
    ];
  },
  fetch: function *() {
    var query = this.request.body.query;

    var result = yield GraphQL(schema, query, this.state.user);

    var errors = result.errors || [];

    if(errors.length > 0) {
      throw { status: 500, message: errors[0].message };
    }

    this.body = result;
  },
  query: function *() {
    var query = this.request.body.query;

    var result = yield GraphQL(root, query, this.state);

    var errors = result.errors || [];

    if(errors.length > 0) {
      throw { status: errors[0].status || 500, message: errors[0].message };
    }

    this.body = result;
  }
};

module.exports = GraphQLController;
