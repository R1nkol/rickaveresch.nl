"use client";

export default function IntensityStars({ intensity = 3 }) {
  const getIntensityColor = (value) => {
    switch (value) {
      case 1:
        return "text-green-400";
      case 2:
        return "text-green-300";
      case 3:
        return "text-yellow-400";
      case 4:
        return "text-orange-400";
      case 5:
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const starColor = getIntensityColor(intensity);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-gray-400">Heftigheid:</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= intensity ? starColor : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

