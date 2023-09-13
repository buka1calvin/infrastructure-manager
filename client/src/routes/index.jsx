import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import WelcomePage from "../pages/welcomePage";
import OtpForm from "../components/forms/OtpForm";
import UpdateUserProfile from "../components/forms/UpdateUserProfile";
import UpdateAdress from "../components/forms/UpdateAdress";
import ItemRegister from "../components/forms/ItemRegister";
import DriverApprovalForm from "../components/forms/DriverApprovalForm";
import Loader from "../components/layouts/Loader";
import Home from "../components/pages/Home";
import { SearchPage } from "../components/searchPages/searchPage";
import CreateRideForm from "../components/forms/CreateRideForm";
import { Email } from "../components/forms/Email";
import { ResetPassword } from "../components/forms/ResetPassword";
import { VerifyEmail } from "../components/forms/verify";
import CreateBookingPage from "../components/pages/CreateBookingPage";
import BookingApproval from "../components/forms/BookingApproval";
import BookingsPerUser from "../pages/BookingsPerUser";
import PaymentPage from "../components/pages/PaymentPage";
import SuccessPage from "../components/pages/SuccessPage";
import ChatContainer from "../pages/ChatContainerPage";
import PassengerBookingsPage from "../components/pages/PassengerBookingsPage";
import Sidebar from "../components/dashboard/Sidebar";
import ProfilePage from "../components/pages/ProfilePage";
import RidesPage from "../components/pages/RidesPage";
import DashBoardContent from "../components/dashboard/DashBoardContent";
import PassengerBookingsTable from "../components/tables/PassengerBookingsTable";
import DriverBookingsTable from "../components/tables/DriverBookings";
import RidesTable from "../components/tables/Rides";
import GetUsers from "../components/dashboard/Admin/GetUsers";
import Statistic from "../components/dashboard/Admin/Statistic";
import ChatBot from "../components/forms/ChatBot";

export const Navigator = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="auth/login" element={<Login />}></Route>
        <Route path="auth/signup" element={<Signup />}></Route>
        <Route path="/home" element={<WelcomePage />}></Route>
        <Route path="/auth/2fa?" element={<OtpForm />}></Route>
        <Route
          path="/profile/user-verification/:id"
          element={<DriverApprovalForm />}
        ></Route>
        <Route path="/auth/email" element={<Email />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify" element={<VerifyEmail />} />
        <Route
          path="/rides/:id/booking"
          element={<CreateBookingPage />}
        ></Route>
        <Route
          path="/booking-approve/:id"
          element={<BookingApproval />}
        ></Route>
        <Route path="/bookings" element={<PaymentPage />}></Route>
        <Route
          path="/payment-success/checkout-success"
          element={<SuccessPage />}
        />
        <Route path="/bookings" element={<BookingsPerUser />}></Route>
        <Route path="/chat/:id" element={<ChatContainer />}></Route>
        <Route path="/item-register" element={<ItemRegister />}></Route>
        <Route
          path="/rides/:id/booking"
          element={<CreateBookingPage />}
        ></Route>
        <Route
          path="/booking-approve/:id"
          element={<BookingApproval />}
        ></Route>
        <Route path="update-profile" element={<UpdateUserProfile />}></Route>
        <Route path="dashboard" element={<Sidebar />}>
          <Route path="content" element={<DashBoardContent />}></Route>
          {/* this is for the profile pages */}
          <Route path="profile" element={<ProfilePage />}>
            <Route path="update-address" element={<UpdateAdress />}></Route>
          </Route>
          {/* this is for the rides page */}
          {/* <Route path="rides" element={<RidesPage />}> */}
          <Route path="create-ride" element={<CreateRideForm />}></Route>
          {/* </Route> */}
          <Route
            path="passenger-Bookings"
            element={<PassengerBookingsPage />}
          />
          <Route
            path="driver-Bookings/:id"
            element={<DriverBookingsTable />}
          ></Route>
          <Route path="rides" element={<RidesTable />}></Route>
          <Route path="statistic" element={<Statistic />}></Route>
        </Route>

        <Route
          path="/rides/:id/booking"
          element={<CreateBookingPage />}
        ></Route>
        <Route
          path="/booking-approve/:id"
          element={<BookingApproval />}
        ></Route>
        <Route path="/bookings" element={<PaymentPage />}></Route>
        <Route
          path="/payment-success/checkout-success"
          element={<SuccessPage />}
        />
        <Route path="/bookings" element={<BookingsPerUser />}></Route>
        <Route path="/chat-bot" element={<ChatBot />}></Route>
      </Routes>
    </>
  );
};
