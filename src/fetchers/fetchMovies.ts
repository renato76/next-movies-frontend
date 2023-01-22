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

export const fetchAllMovies = async (): Promise<Movie[]> => {
  const endpoint = '/api/movies'
  const response = await fetch(endpoint).then((res) => res.json())
  return response.data
}
