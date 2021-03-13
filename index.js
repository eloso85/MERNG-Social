const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//
const Post = require('./models/Post')
const { MONGODB } = require('./config.js')

const typeDefs = gql`
    type Post{
        id:ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;
const resolvers ={    // for each query or mustation or subcription it has corresponding resolver ex if query is say hi it will have return login
    Query:{
        async getPosts(){
        try {
            const posts = await Post.find();
            return posts;
        } catch (error) {
            throw new Error(err);
        }
        }
    }
}

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
    