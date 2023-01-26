import { useRouter } from "next/router"
import { MovieApiResponse } from "../fetchers/fetchMovies"
import { FaPlay } from "react-icons/fa"

const MovieDetails = ({ movie }: MovieApiResponse) => {
  const router = useRouter()
  return (
    <div className="bg-[#1d183c] w-full md:py-10 md:pl-10 min-h-screen">
      <button type="button" onClick={() => router.back()}>
        <p className="text-white md:pl-10">Back to home</p>
      </button>
      <div className="flex flex-col items-center md:flex-row md:items-start md:w-full">
        <div className="md:w-1/3">
          <div className="flex justify-center my-10 mx-3 object-contain h-auto">
            <img
              src={movie.data.attributes.imageUrl}
              alt={movie.data.attributes.title}
              className="w-96 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col md:pt-20 pb-20 md:pl-5 md:w-2/3">
          <div className="flex text-white text-lg md:text-3xl lg:text-5xl justify-center md:justify-start">
            <div>
              <h1>{movie.data.attributes.title}&nbsp;</h1>
            </div>
            <div>
              <h1>({movie.data.attributes.year})</h1>
            </div>
          </div>
          <div className="text-white flex text-center py-5 justify-center md:justify-start">
            {movie?.data?.attributes?.genres?.map((genre) => (
              <div className=" bg-pink-600 mr-2 text-center text-sm rounded-lg">
                <p className="px-4 py-1">{genre}</p>
              </div>
            ))}
          </div>
          <div className="flex text-white items-center justify-center md:justify-start">
            <div className="mr-5 text-center border-solid border-2 border-[#ffffffb7] px-2 py-1">
              <p>{movie.data.attributes.ageRating}</p>
            </div>
            <div>{movie.data.attributes.duration}</div>
          </div>
          <div className="text-white flex flex-col pt-5 justify-center md:justify-start pr-8 pl-8 md:pl-0 md:pr-20 pb-12">
            <h3 className="text-xl">Overview</h3>
            <p className="text-start">{movie.data.attributes.description}</p>
          </div>
          <div className="text-white flex flex-col items-start pl-8 md:pl-0">
            <a
              className="cursor-pointer flex items-center"
              href={movie.data.attributes.trailer}
              target="_blank"
            >
              <FaPlay className="" color={"white"} />
              <p className="flex items-center ml-4">Play Trailer</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
