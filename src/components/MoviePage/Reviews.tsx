import { useState } from "react"
import { useSession } from "next-auth/react"
import { parseCookies } from "nookies"
import ReviewForm from "../ReviewForm"
import Modal from "../Modal"
import moment from "moment"

import { MovieApiResponse } from "../../fetchers/fetchMovies"

const Reviews = ({ movie }: MovieApiResponse) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const review = movie?.data?.attributes?.reviews?.data
  const { data: session }: any = useSession()
  const cookies = parseCookies()
  const handleAddReview = () => {
    setShowReviewForm(true)
  }
  return (
    <>
      <div className="h-auto bg-[#f0f0f0] pb-20">
        <div className="flex flex-col w-full px-4 items-center">
          <div className="flex justify-center">
            <h2 className="pt-12 pb-4 font-bold text-2xl md:text-4xl">
              Reviews
            </h2>
          </div>

          <>
            <div className="flex flex-col items-center">
              {!review?.length!! && <h2>There are no reviews yet...</h2>}
              {(cookies.username || session) && (
                <p
                  className="font-bold cursor-pointer text-[#01b4e4]"
                  onClick={handleAddReview}
                >
                  Add a Review
                </p>
              )}
              {!cookies.username && !session && <p>Login to add a review</p>}
            </div>
          </>

          {showReviewForm && (
            <Modal
              size="lg"
              onClose={() => setShowReviewForm(false)}
              title="Add Review"
            >
              <ReviewForm
                id={movie.data.id}
                userId={cookies?.id || session?.id}
                setShowReviewForm={(showReviewForm) =>
                  setShowReviewForm(showReviewForm)
                }
              />
            </Modal>
          )}
          {review?.length!! > 0 && (
            <div className="w-full h-auto flex flex-col md:w-2/3 ">
              {review?.map((review) => (
                <div className="overflow-y-scroll bg-[#f0f0f0] border border-[#c7c5c5] rounded-xl shadow-2xl my-6 px-6 md:px-20 py-6">
                  <div className="pb-2 ">
                    <h3 className="font-bold text-xl text-[#2f2f2f]">
                      A review by{" "}
                      <span className="italic">
                        {" "}
                        {review?.attributes?.user?.data?.attributes?.username}
                      </span>
                    </h3>
                    <h3 className="text-sm">
                      Written on:{" "}
                      {moment(review?.attributes?.createdAt).format("Do MMM YY")}
                    </h3>
                    <div className="bg-[#01b4e4] text-sm py-[2px] w-[44px] text-white flex justify-center items-center rounded-lg mt-1">
                      <p>
                        <span>{review?.attributes?.rating}.0</span>
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className="line-clamp-8 pr-6 text-[#2f2f2f] leading-relaxed text-ellipsis overflow-hidden">
                      {review?.attributes?.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Reviews
