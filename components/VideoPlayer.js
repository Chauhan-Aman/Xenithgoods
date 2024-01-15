// Import React only for the client
import { useEffect, useState } from 'react';

const VideoPlayer = ({ width, height, url }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Do not render on the server
  }

  let videosrc = `/homevideos/home-video-${url}.mp4`;

  return (
    <div>
      <video width={width} height={height} autoPlay loop muted playsInline>
        <source src={videosrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
