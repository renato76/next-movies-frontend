import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { SessionProvider } from "next-auth/react"
import mockRouter from "next-router-mock"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"
import { loadTestServer } from "use-mock-service-worker"
import { rest } from "msw"
import { setupServer } from "msw/node"
import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByRole,
} from "@testing-library/react"
import "@testing-library/jest-dom"
import HomePage from "../pages/index"

const dataExpected = setupServer(
  rest.get("http://localhost:1337/api/movies", (_req, res, ctx) => {
    return res(
      ctx.json <
        AllMoviesApiResponse >
        [
          {
            id: "1",
            attributes: {
              title: "Top Gun",
              description: "Description",
              starring: "Tom Cruise",
              duration: "2h 11m",
              ageRating: "15",
              year: "2022",
              trailer: "http://trailer.uk",
              genres: ["action", "drama"],
              imageUrl: "http://tmdb.com",
            },
          },
        ]
    )
  })
)
const server = loadTestServer(dataExpected)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Header loads Sign In Button", async () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>
        <HomePage />
      </SessionProvider>
    </QueryClientProvider>,
    { wrapper: MemoryRouterProvider }
  )
  const buttonText = screen.getByRole("button", { Name: "Sign in" })

  expect(buttonText).toHaveTextContent("Sign in")
})

describe("useMockServiceWorker", () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>
        <HomePage />
      </SessionProvider>
    </QueryClientProvider>,
    { wrapper: MemoryRouterProvider }
  )

  test("hook is available", () => {
    expect(loadTestServer).toBeDefined()
  })

  test("image has correct name", async () => {
    // find images, expect 1 based on what msw returns
  const image = await screen.findAllByRole("img", { name: /tmdb$/i });
  expect(image).toHaveLength(1)
  })
})
