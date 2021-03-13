const User = require('../../models/Users')

module.exports = {
    Mutation:{ //parent turns into _ args is the register input context, info is just genral info
        register(_,args,context, info){
           //TODO Validate user data
            //make user user doesnt already exist
            // hash paswword and create an auth token 
        }
    }
}