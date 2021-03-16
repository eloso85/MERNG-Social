const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/Users')

function generateToken(user){
    return jwt.sign({/// this will take payload data 
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h'} )
}

module.exports = {
    Mutation:{ //parent turns into _ args is the register input context, info is just genral info
        async login(_, {username, password}){
            const { errors, valid }= validateLoginInput(username, password);

            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong Credintials';
                throw new UserInputError('Wrong Credentials', { errors });
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id:user._id,
                token
            }
        },
        async register(
            _,
            { registerInput:{username,email,password, confirmPassword}}
            ,context,
             info
             ){
           //TODO Validate user data
           const { valid, errors } = validateRegisterInput(
               username, 
               email, 
               password, 
               confirmPassword)
                if(!valid){
                    throw new UserInputError('Errors', { errors })
                }
            //make sure user doesnt already exist
            const user = await User.findOne({ username });//58.27 time video
            if(user){
                throw new UserInputError('Username is taken',{
                    errors: {
                        username: 'this username is taken'
                    }
                })
            }
            // hash paswword and create an auth token 
            password = await bcrypt.hash(password,12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();//saves to data base

            const token = generateToken(res)

            return {
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}