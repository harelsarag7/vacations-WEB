import express from 'express';
import { addUser, login, validateEmail } from '../5-logic/users-logic';
import { BadCredentialsError } from '../4-models/BadCredentials';
import { generateToken } from '../2-utils/jwt';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserModel, UserRole } from '../4-models/UserModel';
import { checkEmail } from '../3-middleware/checkEmail';


import { hashPassword } from '../2-utils/hash';

export const authRouter = express.Router();

authRouter.post('/auth/register', checkEmail, async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        res.status(400).json("One of the fields is missing")
    }
      
    if (!validateEmail(email)) {
        res.status(400).json("Invalid Email")
    }
    
    if(password.length < 4){
        res.status(400).json("Password is too short - min 4")
    }

    let role: UserRole = UserRole.User;
    const hashedPassword = hashPassword(password);
    
    const result = await addUser(role, firstName, lastName, email, hashedPassword);
    let id = result.id
    const user: UserModel = {id, role, firstName, lastName, email, password }
    const token = generateToken(user);
    res.status(201).send(token);
});



authRouter.post('/auth/login', async (req, res, next) => {
    const {email, password} = req.body;
    const hashedPassword = hashPassword(password);
    // console.log(hashedPassword);

    if(!email || !password){
        res.status(400).json("One of the fields is missing")
    }
    
    if (!validateEmail(email)) {
        res.status(400).json("Invalid Email")
    }

    if(password.length < 4){
        res.status(400).json("Password is too short - min 4")
    }
    const result = await login( email, hashedPassword);
    if (!result) {
        next(new BadCredentialsError());
        res.status(404)
        return;
    }

    let id = result.id
    let role = result.role
    let firstName = result.firstName
    let lastName = result.lastName
    const user: UserModel = {id, role, firstName, lastName, email, password }


    const token = generateToken(user);
    res.status(201).send(token);
});