import { GetStaticProps, GetStaticPaths } from "next"
import { MovieApiResponse } from "../../fetchers/fetchMovies"
import MovieDetails from "@/components/MovieDetails"

const Movie = ({ movie }: MovieApiResponse) => {
  return (
    <div>
      <MovieDetails movie={movie} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.MOVIES_ENDPOINT}/movies/${params?.id}`)
  const movie: MovieApiResponse = await res.json()

  return {
    props: {
      movie,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.MOVIES_ENDPOINT}/movies`)
  const movies = await response.json()

  const paths = movies.data.map((movie: any) => {
    return {
      params: { id: movie.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export default Movie
