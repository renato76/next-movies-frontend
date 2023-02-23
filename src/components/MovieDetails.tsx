import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { MovieApiResponse } from "../fetchers/fetchMovies"
import Modal from "./Modal"
import { FaPlay, FaEdit } from "react-icons/fa"
import MovieForm from "./MovieForm"

const MovieDetails = ({ movie }: MovieApiResponse) => {
  const [showMovieForm, setShowMovieForm] = useState(false)
  const router = useRouter()

  const handleEditMovie = () => {
    setShowMovieForm(true)
  }

  return (
    <div className="h-[1400px] md:h-[900px] lg:h-[700px]">
      <div className="h-full w-full relative overflow-y-scroll">
        <Image
          src={movie?.data?.attributes?.backdropUrl}
          alt={movie.data.attributes.title}
          className="w-full h-full object-cover absolute"
          width={800}
          height={500}
        />
        <div
          className={`w-full h-full absolute top-0 left-0 bg-[#272727] opacity-90`}
        ></div>
        <div className="w-full md:pl-10 absolute top-0 left-0">
          <button type="button" onClick={() => router.back()}>
            <p className="text-white pl-5 pt-5">Back to home</p>
          </button>
          <div className="flex flex-col items-center md:flex-row md:items-start md:w-full">
            <div className="flex opacity-100">
              <div className="flex justify-center mb-3 mx-3 object-contain h-auto md:mt-5">
                <Image
                  src={movie?.data?.attributes?.imageUrl}
                  alt={movie?.data?.attributes?.title}
                  className="rounded-md opacity-100"
                  width={380}
                  height={500}
                />
              </div>
            </div>
            <div className="flex grow flex-col pb-20 md:pt-5 md:pb-5 md:pl-5 md:w-2/3">
              <div className="flex text-white font-bold text-2xl md:text-4xl lg:text-5xl justify-center md:justify-start">
                <div className="">
                  <h1>{movie.data.attributes.title}&nbsp;</h1>
                </div>
                <div>
                  <h1>({movie.data.attributes.year})</h1>
                </div>
              </div>
              <div className="text-white flex text-center py-5 justify-center md:justify-start">
                {movie.data.attributes?.genres?.map((genre) => (
                  <div
                    key={genre}
                    className=" bg-pink-600 mr-2 text-center text-sm rounded-lg"
                  >
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
                <p className="text-start">
                  {movie.data.attributes.description}
                </p>
              </div>
              <div className="text-white flex flex-col items-start pl-8 md:pl-0 pb-8">
                <a
                  className="cursor-pointer flex items-center"
                  href={movie.data.attributes.trailer}
                  target="_blank"
                >
                  <FaPlay color={"white"} />
                  <p className="flex items-center ml-4">Play Trailer</p>
                </a>
              </div>
              <div className="text-white flex flex-col pl-8 md:pl-0">
                <div>
                  <h4 className="font-bold text-lg">Starring</h4>
                </div>
                <div>
                  <p>{movie.data.attributes.starring}</p>
                </div>
              </div>
            </div>
          </div>
          {showMovieForm && (
            <Modal
              size="lg"
              onClose={() => setShowMovieForm(false)}
              title="Edit Movie"
            >
              <MovieForm data={movie.data.attributes} id={movie.data.id} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
