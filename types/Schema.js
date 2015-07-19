const graphql           = require("graphql"),
      GraphQLSchema     = graphql.GraphQLSchema,
      GraphQLObjectType = graphql.GraphQLObjectType,
      GraphQLString     = graphql.GraphQLString,
      GraphQLNonNull    = graphql.GraphQLNonNull,
      GraphQLList       = graphql.GraphQLList,
      SiteType          = require("./SiteType"),
      Site              = require("../models/site");

var Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Root",
    fields: {
      sites: {
        type: new GraphQLList(SiteType),
        resolve: (user) => {
          return Site.list(user.id);
        }
      }
    }
  })
});

module.exports = Schema;
