export interface AllMoviesApiResponse {
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
    imageUrl: string
  }
}

export interface MovieApiResopnse {
  movie: {
    data: {
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
      }
    }
  }
}

export const fetchAllMovies = async (): Promise<AllMoviesApiResponse[]> => {
  const endpoint = "/api/movies"
  const response = await fetch(endpoint).then((res) => res.json())
  return response.data
}
