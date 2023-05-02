import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Image from "next/image"
import { MovieApiResponse } from "../../fetchers/fetchMovies"
import Modal from "../Modal"
import MovieForm from "../MovieForm"
import { FaPlay, FaEdit } from "react-icons/fa"
import { AiOutlineHome } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import Reviews from "./Reviews"
import YoutubePlayer from "@/components/YoutubePlayer"

const MovieDetails = ({ movie }: MovieApiResponse) => {
  const [showMovieForm, setShowMovieForm] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const { data: session }: any = useSession()
  const cookies = parseCookies()
  const isLoggedIn = session || cookies.jwt
  const router = useRouter()

  const handleEditMovie = () => {
    setShowMovieForm(true)
  }

  const handleShowTrailer = () => {
    setShowTrailer(true)
  }

  const getAverageRating = useCallback(() => {
    if (
      movie.data.attributes.reviews &&
      movie.data.attributes.reviews.data.length > 0
    ) {
      const allRatingsArray = movie?.data?.attributes?.reviews?.data.map(
        (review) => review?.attributes?.rating
      )
      const totalRatings = allRatingsArray?.reduce((acc, curr) => acc + curr)
      return ((totalRatings!! * 20) / allRatingsArray!.length).toFixed(0)
    } else {
      return 67
    }
  }, [movie.data.attributes.reviews])
  useEffect(() => {
    getAverageRating()
  }, [getAverageRating])

  return (
    <>
      <div className="h-[1400px] sm:h-[1200px] md:h-[900px] lg:h-[700px] w-full relative">
        <Image
          src={movie.data.attributes.backdropUrl}
          alt={movie.data.attributes.title}
          className="w-full h-full object-cover absolute"
          width={800}
          height={500}
          priority={true}
        />
        <div
          className={`w-full h-full absolute top-0 left-0 bg-[#0a123d] opacity-90`}
        ></div>
        <div className="w-full md:pl-10 absolute top-0 left-0">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-5 mb-5 ml-8 md:mb-0 md:ml-[13px] border hover:bg-[#e0e0e0] rounded-lg cursor-pointer px-3 py-1 text-white hover:text-[#0a123d] transition duration-700 ease-in-out"
            >
              <div className="flex items-center">
                <div className="mr-1">
                  <AiOutlineHome />
                </div>
                <p>Home</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center md:flex-row md:items-start md:w-full">
            <div className="flex justify-center mb-3 mx-8 md:mx-3 object-contain h-auto md:mt-5">
              <Image
                src={movie.data.attributes.imageUrl}
                alt={movie.data.attributes.title}
                className="rounded-md opacity-100"
                width={360}
                height={500}
              />
            </div>
            <div className="flex grow flex-col pb-20 md:pt-5 md:pb-5 md:pl-5 md:w-2/3">
              <div className="flex text-white font-bold text-2xl md:text-4xl lg:text-5xl justify-center md:justify-start">
                <div className="pr-12 mb-2 md:mb-0 pl-8 md:pl-0">
                  <h1>{movie.data.attributes.title}&nbsp;</h1>
                </div>
              </div>
              <div className="text-white flex text-center py-5 justify-center md:justify-start">
                {movie.data.attributes.genres.map((genre) => (
                  <div
                    key={genre}
                    className=" bg-pink-600 mr-2 text-center text-sm rounded-lg"
                  >
                    <p className="px-4 py-1">{genre}</p>
                  </div>
                ))}
              </div>
              <div className="flex text-white items-center justify-center md:justify-start">
                <div className="mr-2 text-center border-solid border-2 border-[#ffffffb7] px-2 py-0">
                  <p>{movie.data.attributes.ageRating}</p>
                </div>
                <span className="text-3xl">
                  <BsDot />
                </span>
                <div>{movie.data.attributes.duration}</div>
                <span className="text-3xl">
                  <BsDot />
                </span>
                <div>
                  <h1>{movie.data.attributes.year}</h1>
                </div>
              </div>
              <div className="text-white flex pt-5 justify-between items-center mb-2">
                <h3 className="font-bold text-xl pl-8 md:pl-0">Overview</h3>
                {isLoggedIn && (
                  <div
                    className="text-white flex mr-20 pb-2 cursor-pointer"
                    onClick={handleEditMovie}
                  >
                    <FaEdit size={"25px"} />
                  </div>
                )}
              </div>

              <div className="text-white pr-12 mb-8 pl-8 md:pl-0">
                <p className="text-start">
                  {movie.data.attributes.description}
                </p>
              </div>
              <div className="flex pb-8 items-center">
                <div className="pl-8 md:pl-0">
                  <div className="flex justify-center items-center mr-12">
                    <div className="flex flex-col font-bold text-sm mr-2 text-white">
                      <h4>User</h4>
                      <h4>Score</h4>
                    </div>
                    <div className="bg-[#2d3c74] rounded-full h-[75px] w-[75px] relative">
                      <div className="h-[65px] w-[65px] font-bold absolute top-[5px] left-[5px]">
                        <CircularProgressbar
                          value={Number(getAverageRating())}
                          text={`${getAverageRating()}%`}
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "26px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor: `rgba(26, 211, 174, 1), ${
                              Number(getAverageRating()) / 100
                            })`,
                            textColor: "#fff",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#313131",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-white items-start pl-0 md:pl-0 hover:text-[#1ad3ae] transition duration-500">
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={handleShowTrailer}
                  >
                    <FaPlay />
                    <p className="flex items-center ml-2">Play Trailer</p>
                  </div>
                </div>
              </div>
              {showTrailer && (
                <Modal
                  size="xl"
                  theme="dark"
                  onClose={() => setShowTrailer(false)}
                >
                  <YoutubePlayer embedId={movie.data.attributes.trailer} />
                </Modal>
              )}
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
              theme="light"
              onClose={() => setShowMovieForm(false)}
              title="Edit Movie"
            >
              <MovieForm data={movie.data.attributes} id={movie.data.id} />
            </Modal>
          )}
        </div>
      </div>
      <Reviews movie={movie} />
    </>
  )
}

export default MovieDetails
