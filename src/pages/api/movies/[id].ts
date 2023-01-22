import type {NextApiRequest, NextApiResponse} from 'next'
import moviesApiService from '@/services/moviesApiService'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const {id} = req.query
	const url = `${process.env.PET_ENDPOINT}/movies/${id}`

	if (req.method === 'GET') {
		const result = await moviesApiService(req, res, 'GET', url)
		res.status(200).end(JSON.stringify(result))
	}

}

export default handler