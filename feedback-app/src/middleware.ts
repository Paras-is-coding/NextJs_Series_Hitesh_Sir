import { NextRequest,NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
 

export async function middleware(request: NextRequest) {

    const token = await getToken({req:request});
    const url = request.nextUrl;

    // IF token is there means already logged in so redirect user to dashboard
    if(token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/verify') ||
            url.pathname.startsWith('/') 
        )
        ){
            return NextResponse.redirect(new URL('/dashboard',request.url))
        }
        if(!token && url.pathname.startsWith('/dashboard')){
            return NextResponse.redirect(new URL('/sign-in',request.url))
        }
        return NextResponse.next();
}
 
// files and paths where middlewares should/may run
export const config = {
  matcher: ['/sign-in','/login','/','/dashboard/:path*','/verify/:path*'],
}