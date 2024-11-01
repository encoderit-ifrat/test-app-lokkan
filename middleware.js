// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const publicPaths = [
    "/",
    "/cadastro-de-proprietario",
    "/cadastro-de-corretor",
    "/buscar-imoveis",
    "/other-information",
    "/registration",
    "/reset-password",
    "/visualizacao-da-propriedade",
    "/visualizacao-do-projeto",
    "/visualizacao-de-detalhes-do-corretor",
    "/auth/facebook/callback",
    "/auth/google/callback",
    "/user-loading",
    "/contato",
    "/politicas-de-privacidade",
    "/termos-de-uso",
    "/select-company",
    "/broker-review",
    "/vehicle-review",
    "/api/getCep",
  ];

  const requestPath = req.nextUrl.pathname;
  // console.log({ requestPath });
  // const isPublicPath = publicPaths.includes(requestPath);
  const isPublicPath = publicPaths.some(
    (path) => requestPath === path || requestPath.startsWith(`${path}/`)
  );

  // console.log({ isPublicPath });

  if (isPublicPath || token) {
    return NextResponse.next();
  }
  

  return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
  matcher: [
    "/((?!api/auth|/api/getCep|_next/static|_next/image|favicon.ico|termos-de-uso|politicas-de-privacidade|contato|cadastro-de-proprietario|cadastro-de-corretor|buscar-imoveis|other-information|broker-review|vehicle-review|select-company|registration|reset-password|auth/facebook/callback|auth/google/callback).*)",
  ],
};
