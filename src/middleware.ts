import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Definimos qué rutas son públicas
  const isPublicRoute = nextUrl.pathname.startsWith("/login") || 
                        nextUrl.pathname.startsWith("/register");

  // 1. Si no está logueado y la ruta no es pública -> Redirigir a Login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. Si ya está logueado e intenta ir a Login/Register -> Redirigir al Dashboard
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
})

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
