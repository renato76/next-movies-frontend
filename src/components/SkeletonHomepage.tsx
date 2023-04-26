const SkeletonHomepage = () => {
  return (
    <div className="h-[900px] md:pb-20">
      <div className="pt-4">
        <h2 className="bg-[#474747] text-[#474747] w-24 ml-5">All Movies</h2>
        <div className="flex px-3 h-full">
          {Array(12)
            ?.fill(1)
            .map(() => (
              <div className="px-[6px] md:px-[8px] py-5 animate-pulse">
                <div className="object-contain w-40 md:w-56">
                  <div className="relative rounded-md h-[240px] md:h-[330px] bg-[#333333] flex justify-center items-end">
                    <p className="bg-[#808080] h-8 w-24 text-[#808080] mb-6 rounded-lg absolute b-4">
                      Movie Title
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="pt-4">
        <h2 className="bg-[#474747] text-[#474747] w-24 ml-5">All Movies</h2>
        <div className="flex px-3 h-full">
          {Array(12)
            ?.fill(1)
            .map(() => (
              <div className="px-[6px] md:px-[8px] py-5 animate-pulse">
                <div className="object-contain w-40 md:w-56">
                  <div className="relative rounded-md h-[240px] md:h-[330px] bg-[#333333] flex justify-center items-end">
                    <p className="bg-[#808080] h-8 w-24 text-[#808080] mb-6 rounded-lg absolute b-4">
                      Movie Title
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonHomepage
