/* eslint-disable react/require-default-props */
import { FC, PropsWithChildren } from "react"

interface ModalProps {
  size: "sm" | "md" | "lg" | "xl"
  theme: "light" | "dark"
  title?: string
  onClose: () => void
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  size,
  theme,
  title = undefined,
  onClose,
  children,
}) => {
  const modalSizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div
      aria-modal
      className="fixed top-0 left-0 right-0 bottom-0 z-[100] w-full flex items-center justify-center bg-[#1d183ca8]"
    >
      <div
        className={`${
          modalSizes[size]
        } w-full mx-5  mt-0 h-fit max-h-[90%] overflow-y-auto rounded-2xl border-light-grey bg-${
          theme === "light" ? "[#fdfdfd]" : "[#000]"
        } shadow-lg`}
      >
        <div className="mt-4 mr-4 flex justify-end">
          <button type="button" onClick={onClose}>
            <span aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.789"
                height="19.784"
                viewBox="0 0 19.789 19.784"
              >
                <path
                  data-name="Icon ionic-ios-close"
                  d="M23.524,21.181l7.068-7.068a1.656,1.656,0,1,0-2.342-2.342l-7.068,7.068-7.068-7.068a1.656,1.656,0,1,0-2.342,2.342l7.068,7.068-7.068,7.068a1.656,1.656,0,0,0,2.342,2.342l7.068-7.068,7.068,7.068a1.656,1.656,0,0,0,2.342-2.342Z"
                  transform="translate(-11.285 -11.289)"
                  fill={`${theme === "dark" ? "#fff" : "#021546"}`}
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="md:-p-0 pt-2">
          {title && <h2 className="text-center font-bold text-2xl">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
