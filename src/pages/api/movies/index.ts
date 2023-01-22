import { NextApiRequest, NextApiResponse } from "next"
import moviesApiService from "@/services/moviesApiService"

function fetchMovies(req: NextApiRequest, res: NextApiResponse) {
  return moviesApiService(
    req,
    res,
    "GET",
    `${process.env.MOVIES_ENDPOINT}/movies`
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

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
