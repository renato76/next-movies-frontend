import { FC } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Image from "next/image"

const DesktopHeader: FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const isOnCreateMoviePage = router.asPath === "/create-movie"
  return (
    <>
      <div className="flex justify-between items-center py-2 text-white px-6">
        <div className="hidden md:flex">
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
            alt="tmdb logo"
            width={300}
            height={50}
          />
        </div>
        {session && (
          <div className="hidden md:flex my-2">
            <div className="space-x-2">
              {!isOnCreateMoviePage && (
                <>
                  <button
                    onClick={() => {
                      router.push("/create-movie")
                    }}
                    className="px-4 md:px-12 py-2 border border-solid border-[#01b4e4]  hover:bg-[#01b4e4] transition duration-700 ease-in-out rounded-lg cursor-pointer"
                  >
                    <p>Add Movie</p>
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="px-4 md:px-12 py-2 border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
                  >
                    <p>Sign out</p>
                  </button>
                </>
              )}
              {isOnCreateMoviePage && (
                <>
                  <button
                    onClick={() => {
                      router.push("/")
                    }}
                    className="px-4 md:px-12 py-2 border border-solid border-[#01b4e4]  hover:bg-[#01b4e4] transition duration-700 ease-in-out rounded-lg cursor-pointer"
                  >
                    <p>Home</p>
                  </button>
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="px-4 md:px-12 py-2 border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
                  >
                    <p>Sign out</p>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {!session && (
          <button
            onClick={() => signIn()}
            className="px-12 py-2 my-2 border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </>
  )
}

export default DesktopHeader
