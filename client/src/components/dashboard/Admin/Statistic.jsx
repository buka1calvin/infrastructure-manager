import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/stats-animation.json";
import animationDB from "../../../assets/animation_db.json";
import { AdminStatistic } from "../../Actions/service/statistic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyStatistics, setMonthlyStatistics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const statistic = await AdminStatistic();
        setMonthlyStatistics(statistic);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);

  const labels = monthlyStatistics.map((stat) => stat.month);
  const passengerData = monthlyStatistics.map((stat) => stat.bookingNumber);
  const driverData = monthlyStatistics.map((stat) => stat.RideNumber);
  const bookingMoney = monthlyStatistics.map((stat) => stat.allBookingMoney);

  const createChartData = (label, data, color) => {
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: color,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 0,
          data: data,
        },
      ],
    };
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div
          className="bg-white p-4 rounded-md shadow-md"
          style={{ height: "400px" }}
        >
          <h1 className="text-xl font-semibold mb-2">
            Bookings in every month
          </h1>
          <Bar data={createChartData("Bookings", passengerData, "#47A1DE")} 
          options={{maintainAspectRatio: false,}}/>
        </div>
        <div
          className="bg-white p-4 rounded-md shadow-md"
          style={{ height: "400px" }}
        >
          <h1 className="text-xl font-semibold mb-2">Rides in every month</h1>
          <Bar data={createChartData("Rides", driverData, "#30AAB3")} options={{maintainAspectRatio: false,}}/>
        </div>
        <div
          className="bg-white p-4 rounded-md shadow-md"
          style={{ height: "400px" }}
        >
          <h1 className="text-xl font-semibold mb-2">
            Transactions in every month
          </h1>
          <Bar data={createChartData("Money", bookingMoney, "#7b9a6d")} options={{maintainAspectRatio: false,}}/>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
