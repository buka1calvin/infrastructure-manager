import React, { useState, useEffect } from "react";
import { LinkP } from "./Link";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import notification from "../../assets/notifications.svg";
import dashboard from "../../assets/dashboard.svg";
import logout from "../../assets/logout.svg";
import getUserInfo from "../utils/UserInfo";
import logo from "../../assets/logo.png"

export const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  const flexBetween = "flex justify-between";
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const [isMenutoggled, setisMenuToggled] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const user = getUserInfo();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [navBackground, setNavBackground] = useState(
    isTopOfPage
      ? ""
      : "bg-[#2233ce18]  drop-shadow z-20 border-b border-gray-200 bg-white"
  );
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
      setNavBackground(
        isTopOfPage
          ? ""
          : "bg-[#2233ce18]  drop-shadow z-20 border-b border-gray-200 bg-white"
      );
  }, [location.pathname, isTopOfPage]);

  return (
    <>
      <nav>
        <div
          className={`${navBackground} flex  justify-between fixed z-30 w-full py-6`}
        >
          <div className={`${flexBetween} mx-auto w-full `}>
            <div className={`flex  justify-around w-full`}>
              <img src={logo} alt="logo" />
              {isAboveMediumScreen ? (
                <div className={` flex w-[50%] justify-end`}>
                  <div className={`${flexBetween} gap-10 text-md font-poppins`}>
                    <LinkP
                      page="Home"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <LinkP
                      page="About Us"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <LinkP
                      page="Contact"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    {isAuthenticated ? (
                      <div className="flex gap-4">
                        {user?.data?.role === "passenger" && (
                          <Link to="/bookings">bookings</Link>
                        )}
                        <Link to="/dashboard/content">
                          <img
                            className=" w-[24px] h-[24px]"
                            src={dashboard}
                            alt=""
                          />
                        </Link>
                        <Link onClick={() => handleLogout()}>
                          <img
                            className=" w-[24px] h-[24px]"
                            src={logout}
                            alt=""
                          />
                        </Link>
                      </div>
                    ) : (
                      <Link to="/auth/login">
                        <p className="border-[1px] bg-[#09B294] text-[white] py-[3px] px-[5px] rounded-xl">
                          Signin
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <button onClick={() => setisMenuToggled(!isMenutoggled)}>
                  <AiOutlineMenu style={{ color: "black", fontSize: "28px" }} />
                </button>
              )}
            </div>
          </div>
        </div>
        {!isAboveMediumScreen && isMenutoggled && (
          <div className="fixed bottom-0 right-0 z-40 h-full w-72 bg-white drop-shadow-2xl">
            <div className="flex justify-end  p-12">
              <button
                className="test-gray-400 h-6 w-6"
                onClick={() => setisMenuToggled(!isMenutoggled)}
              >
                <AiOutlineClose style={{ color: "black", fontSize: "28px" }} />
              </button>
            </div>
            <div className="ml-[23%] flex flex-col gap-8 text-xl font-poppins">
              <LinkP
                page="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkP
                page="Contact"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkP
                page="About Us"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              {isAuthenticated ? (
                <div className="flex gap-3">
                  <Link to="/dashboard/content">
                    <img
                      className=" w-[24px] h-[24px]"
                      src={dashboard}
                      alt=""
                    />
                  </Link>
                  <Link onClick={() => handleLogout()}>
                    <img className=" w-[24px] h-[24px]" src={logout} alt="" />
                  </Link>
                </div>
              ) : (
                <Link to="/auth/login">
                  <p className="border-[1px] border-[#5157E0] py-[3px] px-[5px] rounded-xl">
                    Signin
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
