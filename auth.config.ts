import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { publicRotePrefixes, publicRoutes } from "./routes";
import { db } from "./lib/db";
import { compare } from "bcryptjs";
// import logo from "@/assets/unknown.png";

// class CustomError extends CredentialsSignin {
//   code = "Test code";
//   // message: string = "test message";
// }
export const authConfig = {
  basePath: process.env.AUTH_BASE_PATH,
  // pages: { signIn: "/auth/login" },
  // theme: { logo: logo.src },
  callbacks: {
    authorized({ auth, request }) {
      // Invoked when a user needs authorization, using Middleware.
      //You can override this behavior by returning a NextResponse.
      console.log("\x1b[34m In authorized callback \x1b[0m");

      console.log({ auth });
      console.log({ path: request.nextUrl.pathname });
      console.log("-----------------------");

      if (
        publicRoutes.includes(request.nextUrl.pathname) ||
        // request.nextUrl.pathname.startsWith(authRoute) ||
        publicRotePrefixes.some((prefix) =>
          request.nextUrl.pathname.startsWith(prefix)
        )
      ) {
        return true;
      }
      // return Response.redirect(request.nextUrl) // for example
      return !!auth;
    },
    // Controls whether a user is allowed to sign in or not.
    // signIn(params) {
    //   // console.log("\x1b[31m In SignIn callback \x1b[0m");
    //   // console.log(params);
    //   // const {account,user,credentials,email,profile}  =params;
    //   // console.log("-----------------------");

    //   return true;
    // },
    session(params) {
      console.log("\x1b[33m In Session callback \x1b[0m");
      console.log(params);

      const { newSession, session, token, user, trigger } = params;
      // console.log({ user });
      // if(!session.user.id){
      // }
      console.log("-----------------------");

      // return session.user.id
      //   ? session
      //   : { ...session, user: { ...session.user, id: token.sub } };
      return { ...session, user: { ...session.user, id: token.sub } };
    },
    // jwt(params) {
    //   console.log("\x1b[33m In JWT callback \x1b[0m");
    //   console.log(params);

    //   const {} = params;
    //   console.log("-----------------------");

    //   return params.token;
    // },
  },
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "john@doe.ex" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        console.log("\x1b[35m In credentials authorize \x1b[0m");
        console.log({ credentials });

        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin();
        }

        const isUser = await db.user.findUnique({
          where: { email: email as string },
          select: { email: true, password: true, id: true },
        });

        if (!isUser?.password) {
          throw new CredentialsSignin();
        }
        const matchPassword = await compare(
          password as string,
          isUser.password
        );
        if (!matchPassword) {
          throw new CredentialsSignin();
        }
        console.log("-----------------------");
        return { email: credentials.email as string, id: isUser.id };
      },
    }),
  ],
} satisfies NextAuthConfig;
