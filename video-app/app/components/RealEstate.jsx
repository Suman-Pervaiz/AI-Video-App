import { useState } from "react";

export default function RealEstateForm({ handleGenerateVideo, loading }) {
  const [tourStyle, setTourStyle] = useState("luxury");

  const propertyDetails = {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: "5",
    bathrooms: "6.5",
    area: "6,100",
    features:
      "Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      source: "real_estate",
      tourStyle,
    };
    handleGenerateVideo(body);
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="mt-4">
      <div className="space-y-3 text-base mb-6 text-gray-700 border border-gray-200 p-6 rounded-xl bg-gray-50 shadow-sm">
        <p>
          <strong>📍 Address:</strong> {propertyDetails.address}
        </p>
        <p>
          <strong>💰 Price:</strong> {propertyDetails.price}
        </p>
        <p>
          <strong>🛏 Bedrooms:</strong> {propertyDetails.bedrooms}
        </p>
        <p>
          <strong>🛁 Bathrooms:</strong> {propertyDetails.bathrooms}
        </p>
        <p>
          <strong>📐 Area:</strong> {propertyDetails.area} sqft
        </p>
        <p>
          <strong>✨ Features:</strong> {propertyDetails.features}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tourStyle" className={labelStyle}>
            Tour Style
          </label>
          <select
            id="tourStyle"
            value={tourStyle}
            onChange={(e) => setTourStyle(e.target.value)}
            className={inputStyle}
          >
            <option value="luxury">Luxury</option>
            <option value="modern">Modern</option>
          </select>
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
            "🏡 Generate Real Estate Tour"
          )}
        </button>
      </form>
    </div>
  );
}
