import Header from "@/components/Header"
import { useQuery } from "react-query"
import { fetchAllMovies } from "../fetchers/fetchMovies"

const Home = () => {
  const {
    data: allMovies,
    error,
    isLoading,
  } = useQuery("allMovies", fetchAllMovies)

  console.log(allMovies)

  return (
    <>
      <Header />
      <div>
        <h1 className="flex text-2xl justify-center font-bold text-purple-800">
          Next Movies
        </h1>
      </div>
    </>
  )
}

export default Home
