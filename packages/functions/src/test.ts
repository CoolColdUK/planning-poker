import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import express from 'express';
import * as functions from 'firebase-functions';

const app = express();

const server = new ApolloServer({
  typeDefs: 'type Query { x: ID }',
  resolvers: {Query: {x: () => 'hi!'}},
});
server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
app.use('*', expressMiddleware(server));

/**
 * Listen to account position changes
 */
export const test = functions.region('europe-west2').https.onRequest(app);
