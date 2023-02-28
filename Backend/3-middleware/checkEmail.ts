import { NextFunction, Request, Response } from "express";
import { EmailTaken } from "../4-models/EmailTaken";
import { getUsers } from "../5-logic/users-logic";

export async function checkEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    let allUsers = await getUsers();
    const duplicate = allUsers.filter(u => u.email === email);
    console.log(duplicate);
    
    
    if(duplicate.length > 0){
        next(new EmailTaken());
    }
    next();
    return;
}