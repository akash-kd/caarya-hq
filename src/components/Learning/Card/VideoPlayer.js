import ReactPlayer from "react-player";
import { XIcon } from "@heroicons/react/solid";

function VideoPlayer({ url, closeModal }) {
  return (
    <div
      className={`w-full max-w-3xl mx-auto aspect-video bg-white rounded-[40px] p-5 relative`}
    >
      <div
        className="absolute top-5 right-5"
        onClick={() => {
          closeModal();
        }}
      >
        <XIcon className="w-4 h-4 text-primary-yellow-darkest cursor-pointer" />
      </div>
      <div className="p-5 aspect-video">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          playing
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
