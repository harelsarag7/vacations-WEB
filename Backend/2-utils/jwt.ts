import { sign } from "jsonwebtoken";
import { UserModel } from "../4-models/UserModel";
import { hashPassword } from "./hash";

export function generateToken(user: UserModel) {
    return sign({
        "sub": user.id,
        "role": user.role,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email
    }, hashPassword(user.password), { expiresIn: '24h' });
    // }, hashPassword(user.password));
}