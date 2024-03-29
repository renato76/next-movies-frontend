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
    reviews?: {
      data: [
        {
          id: 1,
          attributes: {
            review: string,
            rating: number,
            movie: string,
            createdAt: string,
            user: {
              data: {
                attributes: {
                  username: string
                  email: string
                }
              }
            }
          }
        }
      ]
    }
  }
}

export interface MovieApiResponse {
  movie: {
    data: AllMoviesApiResponse
    }
}

export const fetchAllMovies = async (): Promise<AllMoviesApiResponse[]> => {
  const endpoint = "/api/movies"
  const response = await fetch(endpoint).then((res) => res.json())
  return response.data
}
