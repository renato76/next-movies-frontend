import { FC, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import { parseCookies } from "nookies"
import { unsetToken } from "../../lib/auth"
import toast from 'react-hot-toast'

const DesktopNavigation: FC = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const isOnCreateMoviePage = router.asPath === "/create-movie"
  const isOnSignInPage = router.asPath === "/auth/signin"
  const isOnRegisterPage = router.asPath === "/auth/register"
  const cookies = parseCookies()

  const isLoggedIn = useCallback(() => {
    if (cookies.jwt) {
      setUserIsLoggedIn(true)
    } else {
      setUserIsLoggedIn(false)
    }
  }, [cookies.jwt])

  useEffect(() => {
    isLoggedIn()
  }, [isLoggedIn])

  return (
    <>
      {(session || userIsLoggedIn) && (
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
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    })
                    toast('Signing out...')
                    unsetToken()
                  }}
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
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                    })
                    toast('Signing out...')
                    unsetToken()
                  }}
                  className="px-4 md:px-12 py-2 border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
                >
                  <p>Sign out</p>
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {!session && !userIsLoggedIn && (
        <button
          onClick={() => router.push(`${!isOnSignInPage || isOnRegisterPage ? '/auth/signin' : '/'}`)}
          className="px-12 py-2 my-2 border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
        >
          {`${isOnSignInPage || isOnRegisterPage ? 'Home' : 'Sign In'}`}
        </button>
      )}
    </>
  )
}

export default DesktopNavigation
