import { NextApiRequest, NextApiResponse } from "next"

async function moviesApiService<ApiResponse>(
  req: NextApiRequest,
  res: NextApiResponse,
  method: string,
  uri: string,
  body?: BodyInit | null
): Promise<ApiResponse | Record<string, unknown>> {
  try {
    const response = await fetch(uri, {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body,
    })
    const data = (await response.json()) as ApiResponse
    return data
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export default moviesApiService
