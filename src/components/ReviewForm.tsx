import { addReview } from "@/mutations/addReview"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { Formik, Form } from "formik"
import { TextArea } from "@/components/TextArea"

export interface ReviewProps {
  id: string
  userId: string
  setShowReviewForm: (showReviewForm: boolean) => void
}

const ReviewForm = ({ id, userId, setShowReviewForm }: ReviewProps) => {
  const router = useRouter()

  const initialValues: any = {
    id,
    review: "",
    rating: 0,
  }

  const queryClient = useQueryClient()

  const { mutateAsync: createReviewMutate } = useMutation({
    mutationFn: addReview,
    mutationKey: "reviews/create",
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allMovies"] }),
  })

  const handleSubmit = async (values: any) => {
    await createReviewMutate({
      id,
      userId,
      ...values,
    })
    setShowReviewForm(false)
    router.push("/")
  }

  return (
    <>
      <div className="w-full h-full">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            handleSubmit(values)
          }}
          enableReinitialize
        >
          {(formik) => (
            <>
              <div className="flex w-5/6 m-auto justify-center my-6 md:max-w-[550px] text-start rounded-lg px-5 py-6 bg-[#f3f3f3]">
                <Form>
                  <div className="flex flex-col">
                    <div className="">
                      <TextArea
                        label="Comment"
                        name="review"
                        type="text"
                        rows={4}
                        cols={50}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="ml-2 text-sm font-bold">Rating</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        name="rating"
                        placeholder="Choose 1-5"
                        className="p-4 w-48 mt-2"
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <button
                    className="px-4 md:px-12 py-4 mt-6 w-full text-white border border-solid border-[#01b4e4] bg-[#01b4e4]  hover:bg-[#0099c3] transition duration-700 ease-in-out rounded-lg cursor-pointer"
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

export default ReviewForm
