import React, { useState, FC, useEffect } from "react"

const Header: FC = () => {
  return (
    <header className="sticky text-white bg-[#041791] top-0 z-[1000] flex justify-end items-center px-10 md:px-12 h-[72px]">
      <div className="cursor-pointer">
        <button type="submit" className="px-12 py-2 bg-[#334ae3] rounded-lg">
          Login
        </button>
      </div>
    </header>
  )
}

export default Header
