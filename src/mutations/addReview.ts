export interface AddReviewApiRequest {
    id: number
    userId: string
    review: string
    rating: number
}

export interface ReviewApiResponse {
  data: {
    id: number
    attributes: {
      review: string
      rating: number
    }
  }
}
export const addReview = async ({
  id,
  userId,
  ...values
}: AddReviewApiRequest): Promise<ReviewApiResponse> => {
  const rawResponse = await fetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review: values.review,
      rating: values.rating,
      movie: id,
      user: userId,
    }),
  })
  const response = await rawResponse.json()
  return response
}
