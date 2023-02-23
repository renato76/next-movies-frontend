import { NextApiRequest, NextApiResponse } from "next"
import moviesApiService from "../../../services/moviesApiService"

function fetchMovies(req: NextApiRequest, res: NextApiResponse) {
  return moviesApiService(
    req,
    res,
    "GET",
    `${process.env.MOVIES_ENDPOINT}/movies?populate=*`
  )
}

async function createMovie(req: NextApiRequest, res: NextApiResponse) {
  const movie = req.body

  const body = {
    data: {
      title: movie.title,
      description: movie.description,
      starring: movie.starring,
      duration: movie.duration,
      ageRating: movie.ageRating,
      year: movie.year,
      trailer: movie.trailer,
      genres: [...movie.genres],
      imageUrl: movie.imageUrl,
      backdropUrl: movie.backdropUrl,
      overlayColor: movie.overlayColor,
    },
  }

  return moviesApiService(
    req,
    res,
    "POST",
    `${process.env.MOVIES_ENDPOINT}/movies`,
    JSON.stringify(body)
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      createMovie(req, res)
        .then((response) => {
          res.status(200).end(JSON.stringify(response))
          resolve()
        })
        .catch((error) => {
          res.status(405).json(error)
          resolve()
        })
    })
  }

  return new Promise((resolve) => {
    fetchMovies(req, res)
      .then((response) => {
        res.status(200).end(JSON.stringify(response))
        resolve()
      })
      .catch((error) => {
        res.status(405).json(error)
        resolve()
      })
  })
}
