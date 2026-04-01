import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@auralens.com" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      authorize: async (credentials) => {
        // Hardcoded admin checking for demo purposes
        if (credentials.email === "admin@auralens.com" && credentials.password === "password") {
          return { id: "1", name: "AuraLens Admin", email: "admin@auralens.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login'
  }
})
