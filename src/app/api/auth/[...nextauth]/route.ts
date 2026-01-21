import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            email: "test@example.com",
            password: "123456",
            name: "Test User"
          },
          {
            id: "2",
            email: "admin@example.com",
            password: "admin123",
            name: "Admin User"
          },
          {
            id: "3",
            email: "basri@info.com",
            password: "123456",
            name: "Basri"
          }
        ];

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
