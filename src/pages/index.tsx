import Head from "next/head"
import Image from "next/image"
import HeaderContainer from "../components/HeaderContainer"
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
      <div className="bg-[#161616] border-b border-[#89898942]">
        <HeaderContainer />
      </div>
      {error && <div>There is an error, please try again</div>}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="bg-[#161616] min-h-[900px] md:pb-20 overflow-y-scroll">
          <div className=" flex flex-col py-5 overflow-x-scroll">
            <h2 className="text-white ml-5 font-Quicksand">ALL MOVIES</h2>
            <div className="relative flex cursor-pointer overflow-x-scroll scrollbar-hide overflow-y-hidden px-3">
              {allMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-[8px] py-2 md:py-4 last:pr-24"
                >
                  <div className="object-contain w-48">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 md:hover:scale-110 transition duration-500"
                      width={220}
                      height={120}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="absolute top-[134px] right-0 bg-gradient-to-l from-[#a7a4bf] h-[300px] w-1/12" />
          </div>
          <div className="flex flex-col py-5">
            <h2 className="text-white ml-5 font-Quicksand">ACTION MOVIES</h2>
            <div className="relative flex cursor-pointer overflow-x-scroll scrollbar-hide overflow-y-hidden px-3">
              {actionMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-[8px] py-2 md:py-4 last:pr-24"
                >
                  <div className="object-contain w-48 h-full">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 md:hover:scale-110 transition duration-500"
                      width={220}
                      height={120}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute top-[525px] right-0 bg-gradient-to-l from-[#a7a4bf] h-[300px] w-1/12" />
        </div>
      )}
    </>
  )
}

export default HomePage
