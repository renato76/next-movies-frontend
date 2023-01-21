import Header from "@/components/Header"
import { useQuery } from "react-query"

const Home = () => {
  const fetchMovies = async () => {
    const res = await fetch('http://localhost:1337/api/movies?populate=*')
    return res.json()
  }

  const {data, error, isLoading} = useQuery('allMovies', fetchMovies)

  console.log(data)

  return (
    <>
    <Header />
      <div>
        <h1 className="flex text-2xl justify-center font-bold text-purple-800">Next Movies</h1>
      </div>
    </>
  )
}

export default Home
