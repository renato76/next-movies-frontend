import Image from "next/image"
import DesktopNavigation from "./DesktopNavigation"

const DesktopHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center py-2 text-white px-6">
        <div className="hidden md:flex">
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
            alt="tmdb logo"
            width={300}
            height={50}
          />
        </div>
        <DesktopNavigation />
      </div>
    </>
  )
}

export default DesktopHeader
