import { Router } from "express";
import { upload } from "./middleware/multer.middleware";
import { createVideo, deleteVideoById, getAllVideos } from "./video/video.service";

const router = Router();

router.get("/", async (_, res) => {
  const videos = await getAllVideos();
  res.json({ videos });
});

router.get("/:id", async (req, res) => {
  await deleteVideoById(req.params.id);
  res.json({ success: true });
});

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return;
  await createVideo(req.file.path);

  res.json({ success: true });
});

export default router;
