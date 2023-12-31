export class MfaVerificationRequest {
    username!: string;
    totp!: string;
    constructor(username: string,
        totp: string){
            this.username = username!=null?username:"";
            this.totp = totp!=null?totp:"";
        }
}