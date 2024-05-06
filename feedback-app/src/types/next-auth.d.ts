import 'next-auth'
import { DefaultSession } from 'next-auth';

// redifine or modify modules/datatypes
// packages like next need to be modified it's module to change datatypes

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean;
        username?:string;
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            isAcceptingMessage?:boolean;
            username?:string; 
        } & DefaultSession['user']
    }
}



// alternative way of above
declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean;
        username?:string;
    }
}