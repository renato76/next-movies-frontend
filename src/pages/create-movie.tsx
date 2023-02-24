import { useSession, signIn } from "next-auth/react"
import Header from "@/components/Header"
import MovieForm from "@/components/MovieForm"

export interface CreateMovieApiRequest {
  id?: string
  title: string
  description: string
  starring: string
  duration: string
  ageRating: string
  year: string
  trailer: string
  genres: string[]
  imageUrl: string
  backdropUrl: string
}

const CreateMovie = () => {
  const initialValues: CreateMovieApiRequest = {
    title: "",
    description: "",
    starring: "",
    duration: "",
    ageRating: "",
    year: "",
    trailer: "",
    genres: [],
    imageUrl: "",
    backdropUrl: "",
  }

  const { data: session } = useSession()

  return (
    <>
      <div className="bg-gradient-to-r from-[#252242] to-[#0f0d23] border-b border-[#ffffff42]">
        <Header />
      </div>
      {!session && (
        <div className="text-center pt-8 pb-20 h-screen bg-gradient-to-r from-[#252242] to-[#0f0d23]">
          <div>
            <h2 className="text-white mt-8 text-lg">
              Please Sign In to create a movie
            </h2>
          </div>
          <div className="mt-8">
            <button
              onClick={() => signIn()}
              className="px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
      <div className="text-center pt-8 pb-20 h-full bg-gradient-to-r from-[#252242] to-[#0f0d23]">
        {session && <MovieForm data={initialValues} />}
      </div>
    </>
  )
}

export default CreateMovie
