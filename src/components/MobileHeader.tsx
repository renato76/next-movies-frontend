import { FC, useState } from "react"
import Image from "next/image"
import MobileNavigation from "./MobileNavigation"
import { GiHamburgerMenu } from "react-icons/gi"

const MobileHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative flex justify-between items-center text-white py-[22px] px-4">
      <div onClick={handleClick} className="text-3xl">
        <GiHamburgerMenu />
      </div>
      {isOpen && (
        <MobileNavigation
          isOpen={isOpen}
          setIsOpen={(isOpen) => setIsOpen(isOpen)}
        />
      )}
      <div>
        <Image
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="logo"
          width={130}
          height={50}
        />
      </div>
    </div>
  )
}

export default MobileHeader
