const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
        body: String,
        username: String,
        createdAt: String
        }
    ],
    likes:[
        {
            username: String,
            createdAt: String
        }
    ],
    user:{
        type: Schema.Types.ObjectId,//linking data models with orem allows to later use moonge to populate data field
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);/// model name is user and schema is new schem 