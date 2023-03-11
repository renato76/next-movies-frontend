import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"

import { MovieApiResponse } from "../../fetchers/fetchMovies"
import MovieDetails from "@/components/MovieDetails"
import { MovieProps } from "../../components/MovieForm"

const Movie = ({ movie }: MovieApiResponse) => {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <MovieDetails movie={movie} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/movies/${params?.id}`
  )
  const movie: MovieApiResponse = await res.json()

  return {
    props: {
      movie,
    },
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/movies`
    )
    const movies = await response.json()

    const moviePaths = movies?.data?.map((movie: MovieProps) => {
      return {
        params: { id: movie.id?.toString() },
      }
    })
    return {
      paths: [...moviePaths],
      fallback: true,
    }
  } catch (err) {
    console.log("there has been an error in getStaticPaths", err)
    return {
      fallback: false,
      paths: [],
    }
  }
}

export default Movie
