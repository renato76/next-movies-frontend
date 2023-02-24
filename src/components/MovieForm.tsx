import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { Formik, Form, Field } from "formik"
import { createMovie } from "@/mutations/createMovie"
import { updateMovie } from "@/mutations/updateMovie"
import { TextField } from "@/components/TextField"
import { TextArea } from "@/components/TextArea"
import { CreateMovieApiRequest } from "@/pages/create-movie"

export interface MovieProps {
  id?: string
  data: {
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
}

const MovieForm = ({ data, id }: MovieProps) => {
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
  const savedValues: CreateMovieApiRequest = {
    title: data.title,
    description: data.description,
    starring: data.starring,
    duration: data.duration,
    ageRating: data.ageRating,
    year: data.year,
    trailer: data.trailer,
    genres: [...data.genres],
    imageUrl: data.imageUrl,
    backdropUrl: data.backdropUrl,
  }
  const [formValues, setFormValues] = useState(savedValues)
  const isEditing = data.title.length > 0
  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutateAsync: createMovieMutate, isLoading: isSubmittingCreate } =
    useMutation({
      mutationFn: createMovie,
      mutationKey: "movies/create",
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["allMovies"] }),
    })

  const { mutateAsync: updateMovieMutate, isLoading: isSubmittingEdit } =
    useMutation({
      mutationFn: updateMovie,
    })

  const handleSubmit = async (values: CreateMovieApiRequest) => {
    if (isEditing) {
      await updateMovieMutate({
        id,
        ...values,
      })
    } else {
      await createMovieMutate(values)
    }
    router.push("/")
  }
  return (
    <>
      <div className="w-full h-full">
        <Formik
          initialValues={formValues || initialValues}
          onSubmit={async (values) => {
            handleSubmit(values)
          }}
          enableReinitialize
        >
          {(formik) => (
            <>
              <div className="flex w-5/6 m-auto justify-center mt-6 md:max-w-[550px] text-start rounded-lg md:px-5 py-6 bg-[#f3f3f3]">
                <Form>
                  <div className="flex flex-col">
                    <div className="">
                      <TextField
                        label="Title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                      />
                      <TextArea
                        label="Description"
                        name="description"
                        type="text"
                        rows={4}
                        cols={50}
                      />
                      <TextField label="Starring" name="starring" type="text" />
                      <TextField label="Duration" name="duration" type="text" />
                      <TextField
                        label="Age Rating"
                        name="ageRating"
                        type="text"
                      />
                    </div>
                    <div className="">
                      <TextField label="Year" name="year" type="text" />
                      <TextField label="Trailer" name="trailer" type="text" />
                      <label htmlFor="genres" className="ml-2 text-sm font-bold">
                        Choose Genres
                      </label>
                      <Field
                        component="select"
                        id="genres"
                        name="genres"
                        multiple={true}
                        className="h-48 mb-2 form-control mt-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
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
                      <TextField
                        label="Image URL"
                        name="imageUrl"
                        type="text"
                      />
                       <TextField
                        label="Backdrop URL"
                        name="backdropUrl"
                        type="text"
                      />
                    </div>
                  </div>
                  <button
                    className="w-full border border-none bg-[#334ae3] text-white text-xl text-bold hover:bg-[#3b53f0] transition duration-500 rounded-lg cursor-pointer mt-5 px-12 py-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  )
}

export default MovieForm
