import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
  },
  // session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.jti
      session.jwt = token.jwt
      session.id = token.id
      return session
    },
    async jwt({ token, account, user }) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          )
          const data = await response.json()
          token.jwt = data.jwt
          token.id = data.user.id
        } catch (err) {
          throw new Error(`${err}`)
        }
      }
      // Persist the OAuth access_token to the token right after signin
      return Promise.resolve(token)
    },
  },
})
