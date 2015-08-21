var graphql           = require("graphql"),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString     = graphql.GraphQLString,
    GraphQLNonNull    = graphql.GraphQLNonNull;

var Site = new GraphQLObjectType({
  name: "Site",
  description: "A website belonging to a user",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the site",
    },
    identifier: {
      type: GraphQLString,
      description: "The identifier of the website",
    },
    url: {
      type: GraphQLString,
      description: "The url of the website"
    },
    created_at: {
      type: GraphQLString,
      description: "The date the user added the website"
    },
    visit_count: {
      type: GraphQLString,
      description: "The number of total visitors this website has received",
    }
  }
});

module.exports = Site;
