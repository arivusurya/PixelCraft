import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaUser, FaCalendarAlt } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Review interface
interface Review {
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  // Review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null); // Success/Error message

  // Star rating component
  const StarRating = ({
    rating,
    onRatingChange,
    interactive = false,
    size = "text-base",
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
    size?: string;
  }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
      <div className="flex items-center space-x-1">
        {stars.map((star) =>
          interactive ? (
            <motion.button
              key={star}
              type="button"
              onClick={() => onRatingChange && onRatingChange(star)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${size} focus:outline-none transition-colors duration-200`}
            >
              {star <= rating ? (
                <FaStar className="text-red-500 hover:text-red-600" />
              ) : (
                <FaRegStar className="text-red-300 hover:text-red-400" />
              )}
            </motion.button>
          ) : (
            <span key={star} className={size}>
              {star <= rating ? (
                <FaStar className="text-red-500" />
              ) : (
                <FaRegStar className="text-red-300" />
              )}
            </span>
          )
        )}
      </div>
    );
  };

  // Handle review submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Reset message
    if (newReview.rating === 0 || newReview.comment.trim() === "") {
      setMessage({
        type: "error",
        text: "Please provide a rating and comment",
      });
      return;
    }

    setLoading(true); // Set loading
    try {
      // Simulate review submission (replace with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay

      const submittedReview: Review = {
        id: Math.random().toString(),
        userId: "12345", // Replace with user ID
        userName: "Anonymous User", // Replace with actual user name
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date(),
      };

      setReviews((prevReviews) => [submittedReview, ...prevReviews]); // Add new review
      setMessage({ type: "success", text: "Review submitted successfully!" });
      setNewReview({ rating: 0, comment: "" }); // Reset form
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit review. Please try again.",
      });
    } finally {
      setLoading(false); // Reset loading
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border-red-500">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-black">
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating Summary */}
          <div className="grid md:grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-base font-bold text-black mb-2">
                Average Rating
              </h3>
              <div className="flex items-center space-x-2">
                <StarRating rating={Math.round(averageRating)} size="text-lg" />
                <span className="text-sm font-medium text-gray-700">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-600 text-center md:text-right">
                Based on {reviews.length} Reviews
              </p>
            </div>
          </div>

          {/* Review Submission Form */}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={newReview.rating}
                interactive
                size="text-xl"
                onRatingChange={(rating) =>
                  setNewReview((prev) => ({ ...prev, rating }))
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Your Review
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your thoughts about this product"
                className="w-full text-sm border-red-500"
              />
            </div>

            <Button
              type="submit"
              variant="destructive"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>

            {/* Success/Error Message */}
            {message && (
              <p
                className={`text-center text-sm mt-2 ${
                  message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>

          {/* Existing Reviews */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center text-sm text-gray-500 py-4">
                No reviews yet. Be the first to review!
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <div className="flex items-center space-x-2 mb-2 md:mb-0">
                      <FaUser className="text-gray-500 text-sm" />
                      <span className="text-sm font-medium text-black">
                        {review.userName}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="text-base" />
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <FaCalendarAlt className="text-sm" />
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
