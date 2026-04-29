import React from "react";

interface StarRatingProps {
    rating: number; // امتیاز فعلی (مثلاً 0 تا 5)
    maxRating?: number; // حداکثر ستاره‌ها، پیش‌فرض 5
    count?: number; // تعداد لایک یا review
    className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    count = 0,
    className = "",
}) => {
    // پر کردن آرایه ستاره‌ها
    const stars = Array.from({ length: maxRating }, (_, i) => i < rating);

    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            {stars.map((filled, idx) => (
                <svg
                    key={idx}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill={filled ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                </svg>
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-300">
                ({count})
            </span>
        </div>
    );
};

export default StarRating;
