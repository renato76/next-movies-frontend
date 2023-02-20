import { rest } from "msw"
import { AllMoviesApiResponse } from "@/fetchers/fetchMovies"

export const handlers = (
  rest.get("http://localhost:1337/api/movies", (_req, res, ctx) => {
    return res(
      ctx.json<AllMoviesApiResponse>({
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
          imageUrl: "http://imageurl.com",
          backdropUrl: "http://imageurl.com",
        },
      })
    )
  })
)
