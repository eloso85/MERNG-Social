const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

//
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')//this is us importin resolvers and since it in the index this is all we have to require
const { MONGODB } = require('./config.js')




const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser:true})
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({port: 5000})
    })
    .then(res=>{
        console.log(`Server running at ${res.url}`)
    });// apollo serve uses express in the back its intalled in node modules

//server.listen({port: 5000})
    