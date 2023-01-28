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
      <div className="bg-gradient-to-r from-[#252242] to-[#0f0d23] border-b border-[#ffffff42]">
        <Header />
      </div>
      {error && <div>There is an error, please try again</div>}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#252242] to-[#0f0d23] pb-20">
          <div className="flex justify-center pt-8">
            <h1 className="text-4xl text-bold text-white">Next Movies</h1>
          </div>
          <div className="flex flex-col py-5 overflow-x-scroll">
            <h2 className="text-white ml-5 mb-2">ALL MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll overflow-y-hidden px-3">
              {allMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-[5px]"
                >
                  <div className="object-contain w-48">
                    <img
                      src={movie.attributes?.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col py-5">
            <h2 className="text-white ml-5 mb-2">ACTION MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll overflow-y-hidden px-3">
              {actionMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-1"
                >
                  <div className="object-contain w-48 h-full">
                    <img
                      src={movie.attributes?.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 transition duration-500"
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
