import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Image from "next/image"
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai"
import { RiLogoutCircleLine, RiLoginBoxLine } from "react-icons/ri"
import { BiAddToQueue } from "react-icons/bi"

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MobileNavigation = ({ isOpen, setIsOpen }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const isOnCreateMoviePage = router.asPath === "/create-movie"

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="absolute top-0 left-0 h-[1000px] w-full bg-[#252242] px-6 py-2">
        <div className="flex flex-col">
          <div onClick={handleClick} className="text-3xl font-bold mb-6 mt-2">
            <AiOutlineClose />
          </div>
          {session?.user?.image && (
            <div className="flex justify-center mb-8">
              <Image
                src={session?.user?.image}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-full mb-6"
              />
            </div>
          )}
          <ul className="text-xl font-bold">
            {session ? (
              <>
                {!isOnCreateMoviePage && (
                  <>
                    <div
                      onClick={() => {
                        router.push("/create-movie")
                      }}
                      className="flex items-center border-b border-[#efefef24]"
                    >
                      <div className="mr-1 ml-2 text-2xl">
                        <BiAddToQueue />
                      </div>
                      <li className="py-3 ">
                        <p className="ml-2">Add Movie</p>
                      </li>
                    </div>
                    <div
                      onClick={() => signOut()}
                      className="flex items-center border-b border-[#efefef24]"
                    >
                      <div className="mr-1 ml-2 text-2xl">
                        <RiLogoutCircleLine />
                      </div>
                      <li className="py-3">
                        <p className="ml-2">Sign Out</p>
                      </li>
                    </div>
                  </>
                )}
                {isOnCreateMoviePage && (
                  <>
                    <div
                      onClick={() => {
                        router.push("/")
                      }}
                      className="flex items-center border-b border-[#efefef24]"
                    >
                      <div className="mr-1 ml-2 text-2xl">
                        <AiOutlineHome />
                      </div>
                      <li className="py-3 ">
                        <p className="ml-2">Home</p>
                      </li>
                    </div>
                    <div
                      onClick={() => signOut()}
                      className="flex items-center border-b border-[#efefef24]"
                    >
                      <div className="mr-1 ml-2 text-2xl">
                        <RiLogoutCircleLine />
                      </div>
                      <li className="py-3">
                        <p className="ml-2">Sign Out</p>
                      </li>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center border-b border-t border-[#efefef24]">
                <div className="mr-1 ml-2 text-white text-2xl">
                  <RiLoginBoxLine />
                </div>
                <li className="py-3">
                  <p onClick={() => signIn()} className="ml-2">
                    Sign In
                  </p>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MobileNavigation
