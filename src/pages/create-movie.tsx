import { useSession, signIn } from "next-auth/react"
import { parseCookies } from "nookies"
import HeaderContainer from "@/components/Header/HeaderContainer"
import MovieForm from "@/components/MovieForm"
import { isLabeledStatement } from "typescript"

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

  const cookies = parseCookies()

  const { data: session } = useSession()

  const isLoggedIn = session || cookies.jwt

  return (
    <>
      <div className="bg-[#161616] border-b border-[#ffffff42]">
        <HeaderContainer />
      </div>
      {!isLoggedIn && (
        <div className="text-center pt-8 pb-20 h-screen bg-[#161616]">
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
      <div className="text-center pt-8 pb-20 h-full bg-[#161616]">
        {isLoggedIn && <MovieForm data={initialValues} />}
      </div>
    </>
  )
}

export default CreateMovie
