var schema  = require("../types/Schema"),
    graphql = require("graphql"),
    GraphQL = graphql.graphql;

const GraphQLController = {
  routes: function() {
    return [
      { method: "post", url: "/graphql", fn: this.fetch, auth: true }
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
  }
};

module.exports = GraphQLController;
