import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  }, { timestamps: true });

  const Review=mongoose.model('Review',reviewSchema)

  export default Review