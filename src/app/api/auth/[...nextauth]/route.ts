// rota para login: app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
    pages: {
        signIn:("/login")
    },
    
    providers: [
    
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
              email: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                  return null;
                }
        
                const user = await prisma.user.findUnique({
                  where: { email: credentials.email },
                });
        
                if (!user) return null;
        
                const isValid = await bcrypt.compare(credentials.password, user.password);
        
                if (!isValid) return null;
        
                // Aqui garantimos que o id está presente
                return {
                  id: user.id.toString(), // convertendo para string se for number
                  name: user.name,
                  email: user.email,
                };
            }
          })

    ]

})

export { handler as GET, handler as POST }