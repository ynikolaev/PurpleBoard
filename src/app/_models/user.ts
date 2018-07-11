export class User {
    id: number;
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    password: string = '';
    firstTime: boolean = true;
    isAdmin: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}