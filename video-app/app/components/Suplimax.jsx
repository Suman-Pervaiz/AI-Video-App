import { useState } from "react";

export default function SuplimaxForm({
  handleGenerateVideo,
  loading,
  error,
  setError,
}) {
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("professional");
  const [style, setStyle] = useState("modern");
  const [audience, setTargetAudience] = useState("athletes");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!features.trim()) {
      setError("Please enter product features for Suplimax video.");
      return;
    }
    const body = {
      source: "suplimax",
      tone,
      style,
      audience,
      features,
    };
    handleGenerateVideo(body);
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="features" className={labelStyle}>
          Product Features
        </label>
        <textarea
          id="features"
          rows={4}
          placeholder="Enter key product features for Suplimax..."
          value={features}
          onChange={(e) => {
            setFeatures(e.target.value);
            setError("");
          }}
          className={`${inputStyle} resize-y`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="tone" className={labelStyle}>
            Video Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className={inputStyle}
          >
            <option value="professional">Professional</option>
            <option value="energetic">Energetic</option>
          </select>
        </div>
        <div>
          <label htmlFor="audience" className={labelStyle}>
            Target Audience
          </label>
          <select
            id="audience"
            value={audience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className={inputStyle}
          >
            <option value="athletes">Athletes</option>
            <option value="fitness_enthusiasts">Fitness Enthusiasts</option>
          </select>
        </div>
        <div>
          <label htmlFor="style" className={labelStyle}>
            Video Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className={inputStyle}
          >
            <option value="modern">Modern</option>
            <option value="urban">Urban</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </span>
        ) : (
          "🚀 Generate Suplimax Video"
        )}
      </button>
    </form>
  );
}
