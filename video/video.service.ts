import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import Video from "./video.model";

export const createVideo = async (videoPath: string) => {
  const lessonId = uuidv4();
  const outputPath = `./uploads/${lessonId}`;
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hlsPath", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  // no queue because of POC, not to be used in production
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    const videoUrl = "http://localhost:8080/" + `uploads/${lessonId}/index.m3u8`;

    Video.create({ url: videoUrl });
  });
};

export const getAllVideos = async () => {
  const videos = await Video.find();
  return videos;
};

export const deleteVideoById = async (id: string) => {
  await Video.findByIdAndDelete(id);
  return "deleted video";
};
