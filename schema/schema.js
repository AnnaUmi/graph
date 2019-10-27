const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
  { id: "23", firstName: "Anna", age: 35 },
  { id: "24", firstName: "Tom", age: 36 }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`); // {data: {firstName: "Anna"}} it is nested in data and GQL doesnt know it
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
