import { GetStaticProps, GetStaticPaths } from "next"
import { MovieApiResponse } from "../../fetchers/fetchMovies"
import MovieDetails from "@/components/MovieDetails"
import { MovieProps } from "../../components/MovieForm"

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
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.MOVIES_ENDPOINT}/movies`)
  const movies = await response.json()

  const paths = movies?.data?.map((movie: MovieProps) => {
    return {
      params: { id: movie.id?.toString() },
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export default Movie
