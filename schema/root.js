var graphql           = require("graphql"),
    GraphQLSchema     = graphql.GraphQLSchema,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString     = graphql.GraphQLString,
    GraphQLList       = graphql.GraphQLList,
    GraphQLNonNull    = graphql.GraphQLNonNull,
    User              = require("./user.js"),
    Users             = require("../services/users.js"),
    Token             = require("./token.js"),
    Tokens            = require("../services/tokens.js");

/*
  mutation RootMutation {
    createUser(email: "", password: "") {
      email, created_at
    }
  }*/

var Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Root",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (user) => {
          return "world";
        }
      }
      /*sites: {
        type: new GraphQLList(Site),
        resolve: (user) => {
          return Site.list(user.id);
        }
      }*/
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutation",
    fields: {
      createUser: {
        type: User,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        description: "Adds a user",
        resolve: (user, data) => {
          Users.emit("insert", data.email, data.password);

          return new Promise((resolve, reject) => {
            Users.on("inserted", (user) => {
              resolve(user);
            })

            Users.on("error", (error) => {
              reject(error);
            })
          });
        }
      },
      updateUser: {
        type: User,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        description: "Updates a user",
        resolve: (user, data) => {
          return Users.update((user || {}).id, data);
        }
      },
      createToken: {
        type: Token,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        description: "Creates an auth token",
        resolve: (user, data) => {
          return Tokens.create(data.email, data.password);
        }
      }
    }
  })
});

module.exports = Schema;
