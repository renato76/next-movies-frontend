import { CreateMovieApiRequest } from "../pages/create-movie"
import { MovieApiResponse } from "../fetchers/fetchMovies"

export const updateMovie = async ({
  id,
  ...values
}: CreateMovieApiRequest): Promise<MovieApiResponse> => {
  const rawResponse = await fetch(`/api/movies/${id}`, {
    method: "PUT",
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
    }),
  })
  const response = await rawResponse.json()
  return response
}
