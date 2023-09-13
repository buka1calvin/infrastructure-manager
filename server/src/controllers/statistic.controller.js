import { verifyToken } from "../utils/generateToken";
import { getStatistic } from "../service/statistic.service";

export const statistic = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const details = verifyToken(token, process.env.JWT_SECRET);

    if (!details || !details.data || !details.data._id  || !details.data.role) {
      return res.status(401).send({ message: "Unauthorized User" });
    }
    const startTime = new Date("2023-07-01T00:00:00Z");
    const stats = await getStatistic(details.data._id, startTime);

    return res.status(200).json(stats);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "internal server error" });
  }
};
