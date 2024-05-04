import { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";
import VideoUploadModal from "./VideoUploadModal";
import { Button } from "evergreen-ui";
import axios from "axios";
import { SERVER_URL } from "./constants";

export default function App() {
  const playerRef = useRef(null);
  const [videoUploadModalVisible, setVideoUploadModalVisible] = useState(false);
  const [videos, setVideos] = useState<{ url: string }[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(SERVER_URL + "video");
      console.log(response.data);

      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div>
      <div>
        <h1>Video player</h1>
      </div>
      {videos.map((video, index) => {
        console.log(video.url);

        return (
          <div key={index}>
            <VideoPlayer options={{ ...videoPlayerOptions, sources: [{ src: video.url, type: "application/x-mpegURL" }] }} onReady={handlePlayerReady} />
          </div>
        );
      })}
      <Button onClick={() => setVideoUploadModalVisible(true)}>Upload Video </Button>
      <VideoUploadModal showModal={videoUploadModalVisible} onClose={() => setVideoUploadModalVisible(false)} />
    </div>
  );
}
