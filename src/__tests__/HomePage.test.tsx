import renderWithQueryClient from "../test-utils"
import HomePage from "../pages/index"

describe("homepage tests", () => {
  test("renders response from query", async () => {
    renderWithQueryClient(<HomePage />)
  })

  // test("renders images from movies", async () => {
  //   renderWithQueryClient(<HomePage />)

  //   const movieImage = waitFor(() => {
  //     screen.queryByAltText("Top Gun")
  //     expect(movieImage).toBeInTheDocument()
  //   })
  // })
})
