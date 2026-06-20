import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { REVIEWS } from "../data";
import { Review } from "../types";
import { Star, MessageSquarePlus, User, Quote, Send, Sparkles } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [writingReview, setWritingReview] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Load reviews from localStorage + initial mock data
  useEffect(() => {
    const saved = localStorage.getItem("surya_kirana_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(REVIEWS);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: `custom-review-${Date.now()}`,
      name: reviewerName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      status: "Verified Neighbor"
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("surya_kirana_reviews", JSON.stringify(updated));

    // Clear and state change
    setReviewerName("");
    setReviewComment("");
    setReviewRating(5);
    setWritingReview(false);
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000); // clear celebration
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-amber-50/10 border-y border-orange-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span className="text-orange-600 font-display font-extrabold text-sm uppercase tracking-wider block mb-2">
              Words of Love and Satisfaction
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight leading-tight">
              What Our Neighbors Say
            </h2>
            <p className="text-sm text-gray-500 mt-2.5 max-w-lg">
              We look at customer smile as our true profit. Over 20+ years, we have built relations, not just business transactions.
            </p>
          </div>

          <button
            onClick={() => setWritingReview(!writingReview)}
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-display font-bold text-xs text-white uppercase tracking-wider cursor-pointer transition shadow-md hover:shadow-orange-500/10 flex items-center justify-center gap-2 block"
            id="btn-toggle-write-review"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {writingReview ? "Close Feedback Form" : "Share Your Feedback"}
          </button>
        </div>

        {/* Dynamic sliding review container or grid */}
        <AnimatePresence>
          {writingReview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 overflow-hidden"
            >
              <form 
                onSubmit={handleSubmitReview}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/50 shadow-md max-w-xl mx-auto"
                id="write-review-form"
              >
                <div className="flex items-center gap-2 mb-6 border-b border-orange-50 pb-4">
                  <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                  <h4 className="font-display font-bold text-lg text-gray-955">Tell Us About Your Retail Experience</h4>
                </div>
                
                <div className="space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="John Doe or Sharma Family"
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 text-gray-800 border border-gray-150 rounded-xl focus:ring-2 focus:ring-orange-300 focus:outline-none focus:bg-white text-sm font-medium transition"
                        id="review-name-input"
                      />
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none transition-transform hover:scale-115 text-yellow-400"
                          title={`${star} Stars`}
                          id={`star-${star}`}
                        >
                          <Star 
                            className={`w-7 h-7 stroke-[2] ${
                              star <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment box */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Your Review Comment
                    </label>
                    <textarea
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={3}
                      placeholder="Write your feedback regarding staple quality, prices, friendliness, or same-day delivery service..."
                      className="w-full p-4 bg-gray-50 text-gray-800 border border-gray-150 rounded-xl focus:ring-2 focus:ring-orange-300 focus:outline-none focus:bg-white text-sm font-medium transition"
                      id="review-comment-input"
                    ></textarea>
                  </div>

                  {/* Submit trigger button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition shadow-md flex items-center justify-center gap-2"
                    id="review-submit-btn"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Verified Feedback
                  </button>

                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Successful Notification Banner */}
        <AnimatePresence>
          {justSubmitted && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="mb-8 max-w-lg mx-auto bg-green-500 text-white text-sm font-semibold rounded-2xl p-4 text-center shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              Thank you! Your verified neighbor review has been successfully appended.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Cards List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-150/45 shadow-xs relative flex flex-col justify-between group hover:border-orange-200 transition-all duration-200"
            >
              {/* Quote marks layout marker */}
              <div className="absolute top-6 right-6 text-orange-200/40 group-hover:text-orange-200 transition-colors pointer-events-none">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <div>
                {/* Stars container */}
                <div className="flex items-center gap-0.5 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rev.rating) ? "fill-current" : "text-gray-250"
                      }`}
                    />
                  ))}
                  {rev.rating % 1 !== 0 && (
                    <span className="text-xs text-gray-500 ml-1.5 font-bold">({rev.rating})</span>
                  )}
                </div>

                {/* Comment text body */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom reviewer info card */}
              <div className="border-t border-orange-50/50 pt-4 flex items-center justify-between">
                <div>
                  <h5 className="font-display font-extrabold text-sm text-gray-950">
                    {rev.name}
                  </h5>
                  {rev.status && (
                    <span className="text-[10px] text-green-600 font-extrabold uppercase mt-0.5 tracking-wider block">
                      ✓ {rev.status}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  {rev.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
