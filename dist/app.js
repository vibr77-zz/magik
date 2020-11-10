"use strict";

var _index = _interopRequireDefault(require("./graphql/types/index"));

var _index2 = _interopRequireDefault(require("./graphql/resolvers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var graphqlHTTP = require('express-graphql');

var _require = require('graphql'),
    buildSchema = _require.buildSchema; //import express from 'express';
//import graphqlHTTP from 'express-graphql';
//import { buildSchema } from 'graphql';


// Construct a schema, using GraphQL schema language

/*
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
*/
var schema = buildSchema(_index["default"]); // The root provides a resolver function for each API endpoint

var root = {
  quoteOfTheDay: function quoteOfTheDay() {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: function random() {
    return Math.random();
  },
  rollThreeDice: function rollThreeDice() {
    return [1, 2, 3].map(function (_) {
      return 1 + Math.floor(Math.random() * 6);
    });
  },
  rollDice: function rollDice(_ref) {
    var numDice = _ref.numDice,
        numSides = _ref.numSides;
    var output = [];

    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }

    return output;
  }
};
/*
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
*/

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: _index2["default"],
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');