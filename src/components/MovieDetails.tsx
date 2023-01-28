import { useRouter } from "next/router"
import { MovieApiResponse } from "../fetchers/fetchMovies"
import { FaPlay, FaEdit } from "react-icons/fa"

const MovieDetails = ({
  movie: {
    data: { attributes: movie },
  },
}: MovieApiResponse) => {
  const router = useRouter()

  const handleEditMovie = () => [console.log("clicked edit")]

  console.log(movie)
  return (
    <div className="bg-[#1d183c] w-full md:py-10 md:pl-10 min-h-screen">
      <button type="button" onClick={() => router.back()}>
        <p className="text-white pt-5 pl-5 md:pt-0">Back to home</p>
      </button>
      <div className="flex flex-col items-center md:flex-row md:items-start md:w-full">
        <div className="flex-0">
          <div className="flex justify-center my-10 mx-3 object-contain h-auto">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-96 rounded-md"
            />
          </div>
        </div>
        <div className="flex grow flex-col md:pt-10 pb-20 md:pb-5 md:pl-5 md:w-2/3">
          <div className="flex text-white font-bold text-2xl md:text-4xl lg:text-5xl justify-center md:justify-start">
            <div className="">
              <h1>{movie.title}&nbsp;</h1>
            </div>
            <div>
              <h1>({movie.year})</h1>
            </div>
          </div>
          <div className="text-white flex text-center py-5 justify-center md:justify-start">
            {movie?.genres?.map((genre) => (
              <div className=" bg-pink-600 mr-2 text-center text-sm rounded-lg">
                <p className="px-4 py-1">{genre}</p>
              </div>
            ))}
          </div>
          <div className="flex text-white items-center justify-center md:justify-start">
            <div className="mr-5 text-center border-solid border-2 border-[#ffffffb7] px-2 py-1">
              <p>{movie.ageRating}</p>
            </div>
            <div>{movie.duration}</div>
          </div>
          <div className="text-white flex pt-5 justify-between items-center mb-2">
            <h3 className="font-bold text-xl pl-8 md:pl-0">Overview</h3>
            <div
              className="text-white flex mr-20 pb-2 cursor-pointer"
              onClick={handleEditMovie}
            >
              <FaEdit size={"25px"} />
            </div>
          </div>
          <div className="text-white pr-12 mb-8 pl-8 md:pl-0">
            <p className="text-start">{movie.description}</p>
          </div>
          <div className="text-white flex flex-col items-start pl-8 md:pl-0 pb-8">
            <a
              className="cursor-pointer flex items-center"
              href={movie.trailer}
              target="_blank"
            >
              <FaPlay className="" color={"white"} />
              <p className="flex items-center ml-4">Play Trailer</p>
            </a>
          </div>
          <div className="text-white flex flex-col pl-8 md:pl-0">
            <div>
              <h4 className="font-bold text-lg">Starring</h4>
            </div>
            <div>
              <p>{movie.starring}</p>
            </div>
          </div>
          {/* <div className="mt-8 text-white">
            <button
              // onClick=""
              className="px-4 md:px-12 py-2 bg-[#334ae3] hover:bg-[#3b53f0] transition duration-500 rounded-lg cursor-pointer"
            >
              <p>Edit Movie</p>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
