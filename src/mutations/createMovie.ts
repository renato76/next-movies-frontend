import { CreateMovieApiRequest } from "../pages/create-movie"
import { MovieApiResponse } from "../fetchers/fetchMovies"

export const createMovie = async (
  values: CreateMovieApiRequest
): Promise<MovieApiResponse> => {
  const rawResponse = await fetch("/api/movies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: values.title,
      description: values.description,
      starring: values.starring,
      duration: values.duration,
      ageRating: values.ageRating,
      year: values.year,
      trailer: values.trailer,
      genres: [...values.genres],
      imageUrl: values.imageUrl,
      backdropUrl: values.backdropUrl,
    }),
  })
  const response = await rawResponse.json()
  return response
}
