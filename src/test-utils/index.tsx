import { render, RenderResult } from "@testing-library/react"
import { ReactElement } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

const generateQueryClient = () => {
  return new QueryClient()
}

export default function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>{ui}</SessionProvider>
    </QueryClientProvider>,
    { wrapper: MemoryRouterProvider }
  )
}
