import { ErrorModel } from "./ErrorModel";

export class EmailTaken extends ErrorModel {
    constructor() {
        super();
        this.code = 403;
        this.message = 'Email is already taken';
    }
}