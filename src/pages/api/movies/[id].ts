import { NextApiRequest, NextApiResponse } from "next"
import moviesApiService from "../../../services/moviesApiService"

async function updateMovie(req: NextApiRequest, res: NextApiResponse) {
  const movie = req.body
  const { id } = req.query

  const body = {
    id,
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
    },
  }

  return moviesApiService(
    req,
    res,
    "PUT",
    `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/movies?populate[reviews][populate][0]=user`,
    JSON.stringify(body)
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "PUT") {
    return new Promise((resolve) => {
      updateMovie(req, res)
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
}
