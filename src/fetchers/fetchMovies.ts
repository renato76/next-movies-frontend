export interface AllMoviesApiResponse {
  id: string
  attributes: {
    title: string
    description: string
    starring: string
    duration: string
    ageRating: string
    year: string
    trailer: string
    genres: string[]
    imageUrl: string
    backdropUrl: string
  }
}

export interface MovieApiResponse {
  movie: {
    data: {
      id?: string
      attributes: {
        title: string
        description: string
        starring: string
        duration: string
        ageRating: string
        year: string
        trailer: string
        genres: string[]
        imageUrl: string
        backdropUrl: string
      }
    }
  }
}

export const fetchAllMovies = async (): Promise<AllMoviesApiResponse[]> => {
  const endpoint = "/api/movies"
  const response = await fetch(endpoint).then((res) => res.json())
  return response.data
}
