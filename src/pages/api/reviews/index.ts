import { NextApiRequest, NextApiResponse } from "next"
import moviesApiService from "../../../services/moviesApiService"

async function createReview(req: NextApiRequest, res: NextApiResponse) {
  const { movie, review, rating, user } = req.body
  const body = {
    data: {
      movie,
      review,
      rating,
      user: user,
    },
  }

  return moviesApiService(
    req,
    res,
    "POST",
    `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/reviews`,
    JSON.stringify(body)
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      createReview(req, res)
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
