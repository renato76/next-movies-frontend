import { FC } from "react"

export interface YoutubePlayerProps {
  embedId: string
}

const YoutubePlayer: FC<YoutubePlayerProps> = ({ embedId }) => {
  return (
    <div className="flex justify-center">
      <iframe
        className="w-[450px] md:w-[900px] h-[500px] md:h-[530px]"
        src={`https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Featured Movie"
      />
    </div>
  )
}

export default YoutubePlayer
