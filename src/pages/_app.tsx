import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
