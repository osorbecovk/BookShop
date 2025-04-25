import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiShoppingCart,
  HiUser,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { IoIosAddCircle } from "react-icons/io";
import { PiBookLight } from "react-icons/pi";
import { BodyLanguage, logout } from "../../Context/RootContext";
import { CiLogin } from "react-icons/ci";
import { IoCartSharp } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { language, setLanguage, isAuthenticated } = useContext(BodyLanguage);
  const navigate = useNavigate();

  const Menu = () => {
    setMenuOpen((el) => !el);
  };

  const LanguageChange = (e) => {
    const selectLanguage = e.target.value;
    setLanguage(selectLanguage);
    i18n.changeLanguage(selectLanguage);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white h-[70px] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full px-4">
          <NavLink to="/">
            <h1 className="font-montserrat text-2xl font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300">
              Asman
            </h1>
          </NavLink>
          <div className="hidden md:flex items-center gap-6 flex-1">
            <div className="flex-1 mx-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={t("input")}
                  className="w-full py-2 px-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 border border-white/20"
                />
                <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors duration-300" />
              </div>
            </div>
            <select
              className="bg-transparent text-white font-montserrat text-sm border border-white/20 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 cursor-pointer"
              value={language}
              onChange={LanguageChange}
            >
              <option value="kg" className="bg-[#2E2E2E]">
                KG
              </option>
              <option value="ru" className="bg-[#2E2E2E]">
                RU
              </option>
              <option value="en" className="bg-[#2E2E2E]">
                EN
              </option>
            </select>
            <NavLink
              to="/basket"
              className="flex items-center gap-1 hover:text-gray-300 hover:scale-110 transition-all duration-300"
            >
              <IoCartSharp className="w-6 h-6" />
              <span className="text-sm font-montserrat">{t("cart")}</span>
            </NavLink>
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-gray-300 hover:scale-110 transition-all duration-300"
              >
                <CiLogin className="w-6 h-6" />
                <span className="text-sm font-montserrat">{t("logout")}</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-1 hover:text-gray-300 hover:scale-110 transition-all duration-300"
              >
                <HiUser className="w-6 h-6" />
                <span className="text-sm font-montserrat">{t("login")}</span>
              </NavLink>
            )}
          </div>
          <button
            onClick={Menu}
            className="text-white transition cursor-pointer hover:text-gray-300 ml-[24px]"
          >
            {menuOpen ? (
              <HiXMark className="w-6 h-6" />
            ) : (
              <HiBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div
            className="bg-gradient-to-b from-[#2E2E2E]/90 to-[#1A1A1A]/90 py-6 px-4 absolute right-4 top-[70px] w-72 rounded-xl shadow-2xl z-50 border border-white/10 backdrop-blur-md transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-fadeIn"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <div className="md:hidden flex flex-col items-center space-y-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t("search")}
                  className="w-full py-2.5 px-4 rounded-full bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 border border-white/10 shadow-sm hover:bg-white/10"
                />
                <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-white transition-colors duration-200" />
              </div>
              <select
                className="bg-white/5 text-white font-montserrat text-sm border border-white/10 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 cursor-pointer w-full hover:bg-white/10 shadow-sm"
                value={language}
                onChange={LanguageChange}
              >
                <option value="kg" className="bg-[#2E2E2E] text-white">
                  KG
                </option>
                <option value="ru" className="bg-[#2E2E2E] text-white">
                  RU
                </option>
                <option value="en" className="bg-[#2E2E2E] text-white">
                  EN
                </option>
              </select>
              <NavLink
                to="/books"
                className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                onClick={Menu}
              >
                <PiBookLight className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm font-montserrat">{t("books")}</span>
              </NavLink>
              <NavLink
                to="/basket"
                className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                onClick={Menu}
              >
                <IoCartSharp  className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm font-montserrat">{t("cart")}</span>
              </NavLink>
              <NavLink
                to="/create"
                className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                onClick={Menu}
              >
                <IoIosAddCircle className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm font-montserrat">{t("addBook")}</span>
              </NavLink>
              {isAuthenticated() ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                >
                  <CiLogin className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="text-sm font-montserrat">{t("logout")}</span>
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                  onClick={Menu}
                >
                  <HiUser className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="text-sm font-montserrat">
                    {t("login") || "Кирүү"}
                  </span>
                </NavLink>
              )}
            </div>
            <div className="hidden md:flex flex-col items-center space-y-4">
              <NavLink
                to="/books"
                className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                onClick={Menu}
              >
                <PiBookLight className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm font-montserrat">{t("books")}</span>
              </NavLink>
              <NavLink
                to="/create"
                className="flex items-center gap-2 text-white hover:text-gray-200 hover:scale-105 hover:bg-white/10 transition-all duration-300 w-full py-2 px-3 rounded-lg group"
                onClick={Menu}
              >
                <IoIosAddCircle className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm font-montserrat">
                  {t("addBook") || "Китеп кошуу"}
                </span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
