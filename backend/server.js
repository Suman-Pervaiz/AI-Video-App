import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//backend route
app.post("/api/generate-video", (req, res) => {
  //receiving source from the frontend
  const { source, tourStyle, tone, audience } = req.body;

  console.log("Request received. Selections:", req.body);
  //host the videos on cloudinary platform
  let videoFileName =
    "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190642/fpbrpvetfgkt91wxap06.mp4"; // Default video

  // for real estate options
  if (source === "real_estate") {
    if (tourStyle === "luxury") {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190295/jvfb2xwa1dr6cl6wwwgn.mp4"; // Video #1
    } else if (tourStyle === "modern") {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190308/zisjnqlcqgpwp7kupjae.mp4"; // Video #2
    }
  }
  // for suplimax options
  else if (source === "suplimax") {
    if (tone === "energetic" && audience === "athletes") {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190251/vz3zengmdvdoatw12wjz.mp4"; // Video #3
    } else if (tone === "professional" && audience === "fitness_enthusiasts") {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190281/z8wuw68xepnlxoypxdpz.mp4"; // Video #4
    } else if (tone === "energetic") {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190251/vz3zengmdvdoatw12wjz.mp4";
    } else {
      videoFileName =
        "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190281/z8wuw68xepnlxoypxdpz.mp4";
    }
  }

  console.log("Decided video file:", videoFileName);

  setTimeout(() => {
    res.json({
      videoUrl: videoFileName,
    });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
