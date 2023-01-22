import { QueryFunctionContext } from "react-query"

interface Movie {
  id: string
  attributes: {
    title: string
    desctription: string
    starring: string
    duration: string
    ageRating: string
    year: string
    trailer: string
    genres: string[]
  }
}

interface MovieIDQuery {
  id?: string
}

type SingleMovieQueryKey = [string, MovieIDQuery]

export const fetchAllMovies = async (): Promise<Movie[]> => {
  const endpoint = "/api/movies"
  const response = await fetch(endpoint).then((res) => res.json())
  return response.data
}

export const fetchSingleMovie = async (
  context: QueryFunctionContext<SingleMovieQueryKey>
): Promise<Movie> => {
  const [, params] = context.queryKey
  const endpoint = `/api/movies/${params.id}`
  const response = await fetch(endpoint).then((res) => res.json())
  return response
}
