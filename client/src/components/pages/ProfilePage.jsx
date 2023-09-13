import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const allowedPaths = [
    "/dashboard/profile",
    "/dashboard/profile/update-profile",
    "/dashboard/profile/update-address"
  ];

  const hideNavBarPaths = ["/dashboard/profile/user-driver"];

  const shouldShowNavBar =
    allowedPaths.some((path) => location.pathname.includes(path)) &&
    !hideNavBarPaths.some((path) => location.pathname.includes(path));

  return (
    <div className="flex container flex-col font-jost">
      {shouldShowNavBar && (
        <div className="flex flex-col pl-[10%] gap-8">
        <h1 className="text-[40px] font-bold">Edit profile</h1>
        <nav className="flex gap-3">
        <Link
              to="/dashboard/profile/update-profile"
              className={`text-[#5157E0] font-bold ${
                activeLink === "profile" ? "text-[#8c90e0]" : ""
              }`}
              onClick={() => handleLinkClick("profile")}
            >
              Edit Profile
            </Link>
            <Link
              to="/dashboard/profile/update-address"
              className={`text-[#5157E0] font-bold ${
                activeLink === "address" ? "text-[#8c90e0]" : ""
              }`}
              onClick={() => handleLinkClick("address")}
            >
              Edit Address
            </Link>
        </nav>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ProfilePage;
