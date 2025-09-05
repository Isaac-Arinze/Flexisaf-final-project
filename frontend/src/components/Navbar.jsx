import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, logout } = useContext(AppContext);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-32 md:w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 px-20 font-medium">
          {["/", "/doctors", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `relative py-1 ${isActive ? "text-primary" : "text-gray-700"}`
              }
            >
              <li className="hover:text-primary transition">
                {path.slice(1).toUpperCase() || "HOME"}
                {({ isActive }) =>
                  isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-0.5 bg-primary"></span>
                  )
                }
              </li>
            </NavLink>
          ))}
        </ul>

        {/* User Options and Create Account Button */}
        <div className="flex items-center gap-4 ml-auto">
          {token ? (
            <>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300 shadow-md object-cover"
                  src={assets.profile_pic}
                  alt="Profile"
                />
                <img
                  className="w-2 md:w-3"
                  src={assets.dropdown_icon}
                  alt="Dropdown Icon"
                />
              </div>
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-3 w-56 z-50 border border-gray-200">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    className="hover:text-primary cursor-pointer py-2 px-4 transition"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                    className="hover:text-primary cursor-pointer py-2 px-4 transition"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="hover:text-primary cursor-pointer py-2 px-4 transition"
                  >
                    Logout
                  </p>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-6 py-2 rounded-full transition hover:bg-primary-dark"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <ul
          className="flex flex-col md:hidden bg-white shadow-lg absolute top-0 right-0 w-3/4 sm:w-1/2 h-screen z-50 pt-20"
          onClick={() => setShowMenu(false)}
        >
          {["/", "/doctors", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `block px-6 py-4 border-b border-gray-100 ${
                  isActive ? "text-primary" : "text-gray-700"
                }`
              }
            >
              {path.slice(1).toUpperCase() || "HOME"}
            </NavLink>
          ))}
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="block bg-primary text-white px-6 py-3 m-4 rounded-full transition hover:bg-primary-dark"
            >
              Create Account
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};
