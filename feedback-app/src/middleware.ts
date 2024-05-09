import { NextRequest,NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
 

export async function middleware(request: NextRequest) {

    const token = await getToken({req:request});
    const url = request.nextUrl;

    console.log('token is',token)

    // IF token is there means already logged in so redirect user to dashboard
    if(token && 
        (
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/verify') 
            // url.pathname.startsWith('/') 
        )
        ){
            console.log('here')
            return NextResponse.redirect(new URL('/dashboard',request.url))
        };

        if(!token && url.pathname.startsWith('/dashboard')){
            return NextResponse.redirect(new URL('/sign-up',request.url))
        }
        return NextResponse.next();
}
 
// files and paths where middlewares should/may run
export const config = {
  matcher: ['/sign-up','/login','/','/dashboard/:path*','/verify/:path*'],
}