var graphql           = require("graphql"),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString     = graphql.GraphQLString,
    GraphQLNonNull    = graphql.GraphQLNonNull;

var Token = new GraphQLObjectType({
  name: "Token",
  description: "An auth token",
  fields: {
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The value of the token",
    }
  }
});

module.exports = Token;
