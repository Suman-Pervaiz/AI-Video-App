"use client";

import { useState } from "react";
import SuplimaxForm from "./Suplimax";
import RealEstate from "./RealEstate";

export default function VideoGenerator() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("suplimax"); // State for active tab

  //calling here the backend api route
  const handleGenerateVideo = async (requestBody) => {
    setIsLoading(true);
    setError("");
    setVideoUrl(null); // Clear previous video

    console.log("🚀 Sending request to backend with:", requestBody);

    try {
      const response = await fetch("http://localhost:5000/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          "Server responded with an error. Please check the backend console."
        );
      }

      const data = await response.json();
      console.log("Received response from backend:", data);

      if (data.videoUrl) {
        setVideoUrl(data.videoUrl); // Set the new video URL
      } else {
        setError("Video generation failed or no video URL was returned.");
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setError(err.message || "Failed to generate video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle tab switching and clear video/error
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setVideoUrl(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          ✨ AI Video Generator
        </h1>

        {/* Tabs section */}
        <div className="flex justify-center mb-8 bg-gray-100 rounded-xl p-2 shadow-inner">
          <button
            className={`cursor-pointer px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 ease-in-out ${
              activeTab === "suplimax"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("suplimax")}
          >
            Suplimax Video
          </button>
          <button
            className={`cursor-pointer ml-4 px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 ease-in-out ${
              activeTab === "real_estate"
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("real_estate")}
          >
            Real Estate Tour
          </button>
        </div>

        {/* --- Tab Content --- */}
        <div className="mt-4">
          {activeTab === "suplimax" && (
            <SuplimaxForm
              handleGenerateVideo={handleGenerateVideo}
              loading={loading}
              error={error}
              setError={setError}
            />
          )}

          {activeTab === "real_estate" && (
            <RealEstate
              handleGenerateVideo={handleGenerateVideo}
              loading={loading}
            />
          )}
        </div>

        {/* --- DYNAMIC RESULT SECTION --- */}
        <div className="mt-10 text-center">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
              <p className="mt-4 text-xl font-medium text-gray-600 animate-pulse">
                Generating your video, this may take a moment...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative shadow-md"
              role="alert"
            >
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {/* Video Playback & Download */}
          {videoUrl && !loading && !error && (
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                🎬 Your Video is Ready!
              </h3>

              <video
                key={videoUrl}
                controls
                autoPlay
                muted
                className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-xl border border-gray-200"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <a
                href={videoUrl.replace("/upload/", "/upload/fl_attachment/")}
                download="generated-video.mp4"
                className="inline-block w-full"
              >
                <button className="cursor-pointer mt-6 w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                  ⬇️ Download Video
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
