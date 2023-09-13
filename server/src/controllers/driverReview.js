import User from "../models/UserModel";
import Review from "../models/Review";

export const createReview = async (req, res) => {
  try {
    const user = req.user._id;
    console.log(user._id.toString());
    if (!user._id) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const { comment, rating } = req.body;
    const driverId = req.params._id;
    console.log("driver:", driverId);
    console.log("review:", comment, " ", rating);

    const addReview = await Review.create({
      rating,
      comment,
      postedBy: user.toString(),
      driverId,
    });
    const userBeingReviewed = await User.findById(driverId);
    if (userBeingReviewed) {
      userBeingReviewed.reviews.push(addReview);
      await userBeingReviewed.save();
    }
    return res.status(201).json({ review: addReview });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
