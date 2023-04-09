import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header/HeaderContainer"
import { useQuery } from "react-query"
import { fetchAllMovies } from "../fetchers/fetchMovies"
import SkeletonHomepage from "../components/SkeletonHomepage"
import Link from "next/link"

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
      <div className="bg-[#1a1a1a] border-b border-[#ffffff42]">
        <Header />
      </div>
      {error && <div>There is an error, please try again</div>}
      {isLoading ? (
        <div className="flex items-center justify-start bg-[#130d37]">
          <SkeletonHomepage />
        </div>
      ) : (
        <div className="bg-[#1a1a1a] h-[900px] md:pb-20 overflow-y-scroll">
          <div className=" flex flex-col py-5 overflow-x-scroll">
            <h2 className="text-gray-300 font-bold ml-5">ALL MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide overflow-y-hidden px-3">
              {allMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-[6px] md:px-[8px] py-5"
                >
                  <div className="hidden md:block object-contain w-56">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-110 transition duration-500"
                      width={300}
                      height={160}
                    />
                  </div>
                  <div className="flex md:hidden object-contain w-40">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 transition duration-500"
                      width={200}
                      height={140}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col py-5">
            <h2 className="text-gray-300 font-bold ml-5">ACTION MOVIES</h2>
            <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide overflow-y-hidden px-3">
              {actionMovies?.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="px-[6px] md:px-[8px] py-5"
                >
                  <div className="hidden md:block object-contain w-56 h-full">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-110 transition duration-500"
                      width={300}
                      height={160}
                    />
                  </div>
                  <div className="flex md:hidden object-contain w-40 h-full">
                    <Image
                      src={movie.attributes.imageUrl}
                      alt={movie.attributes.title}
                      className="rounded-md hover:scale-105 transition duration-500"
                      width={200}
                      height={140}
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
