// this combines all the resolvers

const postsResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports ={
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation//mutation means editing database
    }
}