var graphql           = require("graphql"),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString     = graphql.GraphQLString,
    GraphQLNonNull    = graphql.GraphQLNonNull;

var User = new GraphQLObjectType({
  name: "User",
  description: "A user",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "User's id",
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The identifier",
    },
    confirmation_token: {
      type: GraphQLString,
      description: "The tokent that was sent to the user"
    },
    confirmed_at: {
      type: GraphQLString,
      description: "When the user confirmed their email"
    },
    created_at: {
      type: GraphQLString,
      description: "The date the user added the website"
    }
  }
});

module.exports = User;
