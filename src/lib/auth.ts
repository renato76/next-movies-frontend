import { parseCookies, setCookie, destroyCookie } from "nookies"

export const setToken = (data: any) => {
  const cookies = parseCookies()

  if (typeof window !== "undefined") {
    setCookie(null, "id", data?.user?.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    setCookie(null, "username", data?.user?.username, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    setCookie(null, "jwt", data?.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  }

  return { cookies }
}

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return
  }

  if (typeof window !== "undefined") {
    destroyCookie({}, "id")
    destroyCookie({}, "username")
    destroyCookie({}, "jwt")
  }
}

export default setToken
