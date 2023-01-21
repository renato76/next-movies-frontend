import React, {useState, FC, useEffect} from 'react'

const Header: FC = () => {
  return (
    <header className="sticky bg-[#32165e] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <h1 className="text-white">Header</h1>
    </header>
  )
}

export default Header