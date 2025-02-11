import { useState, useEffect } from "react";
import './star_rating.css';

function StarRating({ movieId }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const savedRating = localStorage.getItem(`rating-${movieId}`);
        if (savedRating) {
            setRating(Number(savedRating));
        }
    }, [movieId]);

    const handleRating = (newRating) => {
      
        if (newRating === rating) {
            setRating(0);
            localStorage.setItem(`rating-${movieId}`, 0);
        } else {
            setRating(newRating);
            localStorage.setItem(`rating-${movieId}`, newRating);
        }
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? "star filled" : "star"}
                    onClick={() => handleRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default StarRating;