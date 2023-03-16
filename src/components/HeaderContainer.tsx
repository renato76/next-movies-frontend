import { FC } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"

const HeaderContainer: FC = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </>
  )
}

export default HeaderContainer
