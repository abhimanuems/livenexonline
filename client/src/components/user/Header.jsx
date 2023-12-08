import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLogoutMutation,
  useSubscriptionMutation,
} from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [subscribe] = useSubscriptionMutation();
  const [pro, setPro] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo)
      subscribe()
        .unwrap()
        .then((isSubscribed) => {
          if (isSubscribed) {
            setPro(true);
          }
        })
        .catch((err) => {
          console.error(err.message);
          toast.error(err.message);
        });
  }, [pro]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall()
        .unwrap()
        .then((res) => {
          toast.error("logout successfully");
          dispatch(logout());
          navigate("/login");
        })
        .catch((err) => {
          toast.error("internal error");
          console.error(err);
        });
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-[#0B2447]">
        <div className="max-w-screen-l flex flex-wrap items-start justify-between mx-auto p-3">
          <span
            className="text-white font-bold text-lg cursor-pointer lg:p-3 mx-4"
            onClick={() => navigate("/")}
          >
            LiveNex
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:flex md:w-auto md:items-center justify-end"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-[#0B2447] md:dark:bg-[#0B2447] dark:border-gray-700 lg:p-2">
              <li>
                {pro ? (
                  <Link to="/pro">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                      pro
                    </button>
                  </Link>
                ) : (
                  <Link to="/pro">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                      upgrade
                    </button>
                  </Link>
                )}
              </li>
              <li>
                <button
                  className="text-white font-medium block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <header className="flex items-center justify-between bg-[#0B2447] p-4">
        <div className="flex items-center space-x-2">
          <span
            className="text-white font-bold text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            LiveNex
          </span>
        </div>
        <div className="flex space-x-4">
          {pro ? (
            <Link to="/pro">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                pro
              </button>
            </Link>
          ) : (
            <Link to="/pro">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                upgrade
              </button>
            </Link>
          )}

          <button className="text-white font-medium" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </header> */}
    </>
  );
};

export default Header;
