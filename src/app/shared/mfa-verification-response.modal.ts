export class MfaVerificationResponse {
    username!: string;
    jwt!: string;
    authValid!: boolean;
    mfaRequired!: boolean;
    tokenValid!: boolean;
    message!: string;
    constructor(username: string,
        jwt: string,
        tokenValid: boolean,
        authValid: boolean,
        mfaRequired: boolean,
        message: string){
            this.username = username!=null?username:"";
            this.jwt = jwt!=null?jwt:"";
            this.message = message!=null?message:"";
            this.mfaRequired = mfaRequired!=null?mfaRequired:false;
            this.tokenValid = tokenValid!=null?tokenValid:false;
            this.authValid = authValid!=null?authValid:false;
        }
}