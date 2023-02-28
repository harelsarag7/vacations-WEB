export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
}

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}