import React from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { createMovie } from "@/mutations/createMovie"
import { Formik, Form, Field } from "formik"
import { TextField } from "@/components/TextField"
import { TextArea } from "@/components/TextArea"

export interface CreateMovieApiRequest {
  title: string
  description: string
  starring: string
  duration: string
  ageRating: string
  year: string
  trailer: string
  genres: string[]
  imageUrl: string
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
  }

  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutateAsync: createMovieMutate, isLoading: isSubmittingCreate } =
    useMutation({
      mutationFn: createMovie,
      mutationKey: "movies/create",
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["allMovies"] }),
    })

  const handleSubmit = async (values: any) => {
    await createMovieMutate(values)
    router.push("./")
  }
  return (
    <div className="text-center pt-10 pb-20 h-screen bg-[#323235]">
      <h1 className="text-white text-4xl text-bold">Create A Movie</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          handleSubmit(values)
        }}
      >
        <div className="flex justify-center mt-6 w-1/2 m-auto text-start rounded-lg px-5 py-6 bg-[#f0f0f0]">
          <Form>
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div>
                <TextField label="Title" name="title" type="text" />
                <TextArea label="Description" name="description" type="text" />
                <TextField label="Starring" name="starring" type="text" />
                <TextField label="Duration" name="duration" type="text" />
                <TextField label="Age Rating" name="ageRating" type="text" />
              </div>
              <div>
                <TextField label="Year" name="year" type="text" />
                <TextField label="Trailer" name="trailer" type="text" />
                <label htmlFor="genres" className="">
                  Choose Genres
                </label>
                <Field
                  component="select"
                  id="genres"
                  name="genres"
                  multiple={true}
                  className="w-full h-48 mb-2 form-control mt-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                >
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="War">War</option>
                  <option value="Crime">Crime</option>
                  <option value="Drama">Drama</option>
                  <option value="Family">Family</option>
                  <option value="Fantasy">Fantasy</option>
                </Field>
                <TextField label="Image URL" name="imageUrl" type="text" />
              </div>
            </div>
            <button
              className="w-full border border-black mt-5 px-12 py-3"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  )
}

export default CreateMovie
