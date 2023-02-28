// import { dal } from "../2-utils/dal";
import { OkPacket } from "mysql2";
import { execute } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/UserModel";

export async function getUsers(): Promise<UserModel[]>{
    const query = "SELECT * FROM vacations.users;";
    const [rows] = await execute<UserModel[]>(query);
    return rows
}

export async function getUserById(id: number): Promise<UserModel>{
    const query = "SELECT * FROM vacations.users WHERE id = ?;";
    const [rows] = await execute<UserModel[]>(query, [id]);
    if(rows.length === 0) return null;
    return rows[0];
}


export function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}


export async function login(email, password): Promise<UserModel>{
    const query = "SELECT * FROM vacations.users WHERE email = ? and password = ?;";
    const [rows] = await execute<UserModel[]>(query, [email, password]);
    if(rows.length === 0) return null;
    return rows[0];
}


export async function addUser(role: UserRole.User, firstName: string, lastName: string, email: string, password: string) {
//    password = crypto.createHash("sha256").update(password).digest("hex");

    const query = `INSERT INTO vacations.users(role,firstName, lastName, email, password) VALUES(?,?,?,?,?)`;
    const [results] = await execute<OkPacket>(query, [role, firstName, lastName, email, password])
    // if()


    const id = results.insertId;
    return {
        id,
        role,
        firstName,
        lastName,
        email,
        password
    };
}
