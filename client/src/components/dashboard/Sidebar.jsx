import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import getUserInfo from "../utils/UserInfo";
import { getUserProfile } from "../Actions/service/AuthUser";
import { AiTwotoneHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { getBookings } from "../Actions/service/bookings";

const Sidebar = () => {
  const [activeUserRole, setActiveUserRole] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getBookings();
        setBookings(bookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setActiveUserRole(info.data.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const profile = await getUserProfile();
        console.log("user profile==", profile?.userDetails);
        setUserInfo(profile?.userDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const menuItems = [
    {
      path: "/dashboard/content",
      name: "Dashboard",
      icon: <MdDashboard />,
      scope: ["admin"],
    },
    {
      path: "/",
      name: "Home",
      icon: <AiTwotoneHome />,
      scope: ["admin"],
    },
    {
      path: "/dashboard/profile",
      name: "users",
      icon: <FaUserEdit />,
      scope: [ "admin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.scope.includes(activeUserRole)
  );
  const excludedPaths = [
    "/dashboard/profile/update-profile",
    "/dashboard/profile/update-address",
  ];
  const shouldShowTopNavbar = !excludedPaths.some((path) =>
    location.pathname.includes(path)
  );
  return (
    <div className="flex  font-jost h-screen">
      <div className="flex h-screen w-[15%]">
        <div className="bg-primary mt-auto w-[100%] py-1 flex flex-col items-center drop-shadow-2xl h-[83vh] relative pt-[50px]">
          {filteredMenuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className="text-white mt-6 p-2 hover:bg-white hover:text-blue-500 w-full"
            >
              <div className="flex items-center pl-[10%]">
              {item.name === "Dashboard" ? (
                <MdDashboard size={32} />
              ) : (
                React.cloneElement(item.icon, { size: 22 })
              )}
              <span className="ml-2">{item.name}</span>
              </div>
            </Link>
          ))}
          <FiLogOut
            onClick={handleLogout}
            className="text-white  hover:text-red  w-full bottom-6 cursor-pointer absolute  "
            size={22}
          />
        </div>
      </div>
      <div className=" flex flex-col h-screen container justify-center">
        {/* <Outlet/> */}
        <div className="p-[20px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
