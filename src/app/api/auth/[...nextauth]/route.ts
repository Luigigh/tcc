import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    pages: {
        signIn:("/login")
    },
    
    providers: [
    
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
              email: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials) {
                    return null
                }

                if (
                    credentials.email === "luigi@gmail.com" &&
                    credentials.password === "123"
                ) {
                    return {
                        id: "1",
                        name: "Luigi",
                        email: "luigi@gmail.com"
                    }
                }

                return null
            }
          })

    ]

})

export { handler as GET, handler as POST }