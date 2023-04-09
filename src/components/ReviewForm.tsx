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
              <div className="flex w-5/6 m-auto justify-center mt-6 md:max-w-[550px] text-start rounded-lg px-5 py-6 bg-[#f3f3f3]">
                <Form>
                  <div className="flex flex-col">
                    <div className="">
                      <TextArea
                        label="Review"
                        name="review"
                        type="text"
                        rows={4}
                        cols={50}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="rating"
                        placeholder="Rating Choose 1-5 "
                        onChange={formik.handleChange}
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

export default ReviewForm
