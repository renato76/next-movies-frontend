import Head from "next/head"
import Header from "../components/Header"
import { useQuery } from "react-query"
import { fetchAllMovies } from "../fetchers/fetchMovies"
import Link from "next/link"
import { FadeLoader } from "react-spinners"

const HomePage = () => {
  const {
    data: allMovies,
    error,
    isLoading,
  } = useQuery({
    queryKey: "allMovies",
    queryFn: fetchAllMovies,
    staleTime: Infinity,
  })

  const actionMovies = allMovies?.filter((movie) =>
    movie?.attributes?.genres?.find((genre) => genre.includes("Action"))
  )

  return (
    <>
      <Head>
        <title>Next Movies</title>
      </Head>
      <div className="bg-[#041791]">
        <Header />
      </div>
      <div className="bg-[#041791] flex justify-center">
        <h1 className="text-4xl text-bold text-white">Next Movies</h1>
      </div>
      {error && <div>There is an error, please try again</div>}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="bg-[#041791]">
          <div className="flex flex-col py-5 overflow-x-scroll">
            <h2 className="text-white ml-5 mb-2">ALL MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll px-3">
              {allMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-1"
                >
                  <div className="contain w-48">
                    <img
                      src={movie.attributes?.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col py-5">
            <h2 className="text-white ml-5 mb-2">ACTION MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll px-3">
              {actionMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-1"
                >
                  <div className="contain w-48">
                    <img
                      src={movie.attributes?.imageUrl}
                      alt={movie.attributes.title}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
