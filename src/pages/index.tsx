import Header from "@/components/Header"
import { useQuery } from "react-query"
import { fetchAllMovies } from "../fetchers/fetchMovies"
import Link from "next/link"
import { FadeLoader } from "react-spinners"

const Home = () => {
  const {
    data: allMovies,
    error,
    isLoading,
  } = useQuery({
    queryKey: "allMovies",
    queryFn: fetchAllMovies,
    staleTime: Infinity,
  })

  console.log(allMovies)

  return (
    <>
      <Header />
      {error && <div>There is an error, please try again</div>}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <a className="flex cursor-pointer">
          {allMovies?.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <img
                src={movie.attributes?.imageUrl}
                alt={movie.attributes.title}
                width={180}
                height={300}
              />
            </Link>
          ))}
        </a>
      )}
    </>
  )
}

export default Home
