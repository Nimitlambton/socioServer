const { ApolloServer } = require("apollo-server");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const { MONGODB } = require("./config");

mongoose
  .connect(MONGODB, { useNewURLParser: true })
  .then(() => {
    console.log("MongoDb connected ");
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log(`${res.url}`);
  });

const server = new ApolloServer({ typeDefs, resolvers });
