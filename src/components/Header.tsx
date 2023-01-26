import { FC } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"

const Header: FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const isOnCreateMoviePage = router.asPath === "/create-movie"

  return (
    <header className="sticky text-white bg-[#041791] top-0 z-[1000] flex justify-center sm:justify-end items-center px-4 md:px-6 h-[72px]">
      <div>
        {session && (
          <div className="flex">
            <div className="space-x-2">
              {!isOnCreateMoviePage && (
                <>
                  <button
                    onClick={() => {
                      router.push("/create-movie")
                    }}
                    className="px-4 md:px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
                  >
                    <p>Create Movie</p>
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="px-4 md:px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
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
                    className="px-4 md:px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
                  >
                    <p>Home</p>
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="px-4 md:px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
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
            className="px-12 py-2 bg-[#334ae3] rounded-lg cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
