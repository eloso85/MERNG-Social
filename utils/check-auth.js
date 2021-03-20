const { AuthenticationError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}= require('../config');

module.exports = (context)=> {
    //context = {...headers}
    const authHeader = context.req.headers.authorization;
    if(authHeader){//if we have do this with token
        // Bear .....
        const token = authHeader.split('Bearer ')[1];////split by bear by space is first string
        if(token){
            try {
                const user = jwt.verify(token,  SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }
        throw new Error('Autherization token must be \'Bearer [token]')
    }
    throw new Error('Authenticatin header must be provided')
    
}