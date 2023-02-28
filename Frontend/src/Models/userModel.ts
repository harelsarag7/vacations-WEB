export enum UserRole {
    Admin, User
}


export interface userModel {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
}