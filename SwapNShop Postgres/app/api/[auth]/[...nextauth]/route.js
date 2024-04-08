  import NextAuth from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  import { userExists,createUser } from "../../../../utils/actions/user.actions";
  import { conn } from "@/utils/db";

  export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      })
    ],
      callbacks: {
        async jwt({ token ,user}) {
          // save the username
          // console.log("user1",user);
          
          if (token) {
            token.username = token.email.split("@")[0]
            const fname = token.name.split(" ")[0]
            // format the name properly
            token.fname = fname[0].toUpperCase() + fname.slice(1).toLowerCase()
          }
          return token
        },
        async session({ session, token}) {
          session.username = token.username
          session.fname = token.fname
          session.bio = ''
          let id
          let result = await conn.query(`SELECT id FROM user WHERE username = $1`,[token.username])
          if (result.rows.length === 0) {
            const result = await conn.query(`
            INSERT INTO users (username, name, dp)
            VALUES ($1, $2, $3)
            RETURNING id;
          `, [session.username, session.fname, token.picture]);
          id = result.rows[0].id;
          }
          else{
          id = result.rows[0].id;
          }
          session.id = id;
          return session
        }
      },
  };

  export const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST };