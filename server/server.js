require('dotenv').config();
const { ApolloServer} = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express =require('express');
const http =  require('http');

// Connect to MongoDB
const mongoose = require('mongoose');
const connectionURL = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(connectionURL)
.then(()=> console.log('connected to DB'))
.catch(error => console.log(error))

// GraphQL
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolver')

//Apollo Server
async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || '';
        
       return {token}
      }
    });
  
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return {server, app};
  }

startApolloServer(typeDefs, resolvers);