import Header from "@/components/Header"
import { useQuery } from "react-query"
import { fetchAllMovies } from "../fetchers/fetchMovies"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
  const {
    data: allMovies,
    error,
    isLoading,
  } = useQuery("allMovies", fetchAllMovies)

  console.log(allMovies)

  return (
    <>
      <Header />
      <a className="flex cursor-pointer">
        {allMovies?.map((movie) => (
          <Link
            key={movie.id}
            href={`${process.env.MOVIES_ENDPOINT}/movies/${movie.id}`}
          >
            <img
              src={movie.attributes?.imageUrl}
              alt={movie.attributes.title}
              width={180}
              height={300}
            />
          </Link>
        ))}
      </a>
    </>
  )
}

export default Home
