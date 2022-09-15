import { Rating } from "@smastrom/react-rating";
import { useState } from "react";

const ShowRating = () => {
  const [ratingValue, setRatingValue] = useState(3); // <-- Init with 0 for no initial value

  return (
    <Rating
      style={{ maxWidth: 250 }}
      value={ratingValue}
      onChange={(selectedValue) => setRatingValue(selectedValue)}
    />
  );
};

export default ShowRating;
