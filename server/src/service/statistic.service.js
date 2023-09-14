import Booking from "../models/Booking";
import User from "../models/UserModel";
import Ride from "../models/Ride";

export const getStatistic = async (userId, startTime) => {
  const currentYear = new Date().getFullYear();
  const currentMonths = new Date().getMonth() + 1;

  const stats = [];

  let year = startTime.getFullYear();
  let month = startTime.getMonth();

  while (
    year < currentYear ||
    (year === currentYear && month <= currentMonths)
  ) {
    const nextMonth =
      month === 12 ? new Date(year + 1, 1, 1) : new Date(year, month, 1);

    const user = await User.findById({
      _id: userId,
    });

    const getRide = async () => {
      return user.role === "admin"
        ? Ride.find({
            createdAt: {
              $gte: new Date(year, month - 1, 1),
              $lt: nextMonth,
            },
          })
        : Ride.find({
            driverId: userId,
            createdAt: {
              $gte: new Date(year, month - 1, 1),
              $lt: nextMonth,
            },
          });
    };
    const rideData = await getRide();

    const getBooking = async () => {
      const rideIds = rideData.map((ride) => ride._id);
      return user.role === "admin"
        ? Booking.find({
            createdAt: {
              $gte: new Date(year, month - 1, 1),
              $lt: nextMonth,
            },
          })
        : user.role === "driver"
        ? Booking.find({
            ride_id: { $in: rideIds },
            createdAt: {
              $gte: new Date(year, month - 1, 1),
              $lt: nextMonth,
            },
          })
        : Booking.find({
            user_id: userId,
            createdAt: {
              $gte: new Date(year, month - 1, 1),
              $lt: nextMonth,
            },
          });
    };
    const bookingData = await getBooking();

    const totalBookingMoney = bookingData.reduce((total, bookingMoney) => {
      return total + bookingMoney.total_price;
    }, 0);
    const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
      month: "long",
    });

    stats.push({
      year: year.toString(),
      month: monthName,
      bookingNumber: bookingData.length,
      RideNumber: rideData.length,
      Booking: bookingData,
      Ride: rideData,
      allBookingMoney: totalBookingMoney,
    });
    month++;
    if (month > 12) {
      year++;
      month = 1;
    }
  }
  return stats;
};
