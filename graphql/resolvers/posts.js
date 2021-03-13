// resolvers are the info you get back from the models so set up your models first then make a resolvers folder and import your models into  this
const Post = require('../../models/Post')

module.exports = {
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