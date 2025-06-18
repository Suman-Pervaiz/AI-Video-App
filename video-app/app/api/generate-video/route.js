// Correct Code for: app/api/generate-video/route.js
import { NextResponse } from "next/server";

// The function MUST be named after the HTTP method (e.g., GET, POST)
export async function POST(req) {
  try {
    // 1. Get the request body by using await req.json()
    const { source, tourStyle, tone, audience } = await req.json();

    console.log("Request received in App Router. Selections:", {
      source,
      tourStyle,
      tone,
      audience,
    });

    // 2. Your video selection logic remains EXACTLY the same
    let videoFileName =
      "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190642/fpbrpvetfgkt91wxap06.mp4"; // Default video

    // for real estate options
    if (source === "real_estate") {
      if (tourStyle === "luxury") {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190295/jvfb2xwa1dr6cl6wwwgn.mp4";
      } else if (tourStyle === "modern") {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190308/zisjnqlcqgpwp7kupjae.mp4";
      }
    }
    // for suplimax options
    else if (source === "suplimax") {
      if (tone === "energetic" && audience === "athletes") {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190251/vz3zengmdvdoatw12wjz.mp4";
      } else if (
        tone === "professional" &&
        audience === "fitness_enthusiasts"
      ) {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190281/z8wuw68xepnlxoypxdpz.mp4";
      } else if (tone === "energetic") {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190251/vz3zengmdvdoatw12wjz.mp4";
      } else {
        videoFileName =
          "https://res.cloudinary.com/dmejlmkgo/video/upload/v1750190281/z8wuw68xepnlxoypxdpz.mp4";
      }
    }

    console.log("Decided video file:", videoFileName);

    // 3. Return the response using NextResponse.json()
    // The setTimeout is not ideal but can be kept for now.
    // We'll return a promise that resolves after 2 seconds.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({ videoUrl: videoFileName });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
