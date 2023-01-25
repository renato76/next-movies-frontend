import { render, screen, waitFor } from "@testing-library/react"
import HomePage from "../pages/index"
import { QueryClient, QueryClientProvider } from "react-query"

describe("HomePage renders a sub heading", () => {
  const queryClient = new QueryClient()
  it("renders a sub heading", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>)

    const heading = screen.getByText("Next Movies")
    expect(heading).toBeInTheDocument()

  })
})