import { useState } from "react"
import { useRouter } from "next/router"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "../api/auth/[...nextauth]"
import HeaderContainer from "@/components/Header/HeaderContainer"
import { setToken } from "@/lib/auth"
import { FcGoogle } from "react-icons/fc"
import { BsGithub } from "react-icons/bs"

export default function SignIn<ApiResponse>({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [data, setData] = useState({
    identifier: "",
    password: "",
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOVIES_ENDPOINT}/auth/local`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: data?.identifier,
            password: data?.password,
          }),
        }
      )
      const userData = (await response.json()) as ApiResponse
      setToken(userData)
      router.push("/")
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  return (
    <>
      <div className="bg-[#130d37] border-b border-[#ffffff42]">
        <HeaderContainer />
      </div>
      <div className="bg-[#130d37] h-screen py-4 overflow-y-scroll px-4">
        <div className="max-w-md my-0 mx-auto">
          <div className="flex flex-col items-center pt-6 border h-[590px] rounded-lg bg-[#ededed]">
            <div>
              <h1 className="text-4xl font-bold mb-6 text-gray-700">Login</h1>
            </div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className=" my-1 w-full px-4">
                <button
                  onClick={() => {
                    signIn(provider.id)
                    router.push("/")
                  }}
                  className="flex w-full max-w-[330px] mx-auto my-0 items-center justify-center border border-[#272727] bg-[#ededed] rounded-md text-[#272727] px-5 py-2 hover:bg-[#272727] hover:text-white transition duration-700 ease-in-out"
                >
                  {provider.name === "Google" ? (
                    <FcGoogle className="mr-2 text-xl" />
                  ) : (
                    <BsGithub className="mr-2 text-xl" />
                  )}{" "}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
            <div className="mt-4 text-[#272727]flex flex-col items-center w-full">
              <div className="flex items-center py-4">
                <div className="flex-grow h-px bg-gray-400"></div>
                <span className="flex-shrink text-2xl text-gray-500 px-4 italic font-light">
                  or
                </span>
                <div className="flex-grow h-px bg-gray-400"></div>
              </div>
              <h2 className="font-bold text-xl flex justify-center mb-2 text-gray-700">
                Sign in with email
              </h2>
              <form
                className="flex flex-col items-center w-full px-4"
                onSubmit={handleSubmit}
              >
                <input
                  placeholder="email adddress"
                  className="mt-2 px-2 py-2 w-full max-w-[330px] text-gray-700 bg-[#ededed] border rounded-md border-[#6b6b6b] focus:outline-[#350ef7]"
                  type="text"
                  onChange={(e) =>
                    setData({
                      ...data,
                      identifier: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="password"
                  className="mt-2 px-2 py-2 w-full max-w-[330px] text-gray-700 bg-[#ededed] border rounded-md border-[#6b6b6b] focus:outline-[#350ef7] relative"
                  type="password"
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                />
                <button className="px-4 md:px-12 py-2 mt-4 w-full max-w-[330px] text-white border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer">
                  Sign In
                </button>
                <div className="mt-3">
                  <p>Need an Account ? <span className="cursor-pointer" onClick={() => router.push("/auth/register")}>Register here</span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
