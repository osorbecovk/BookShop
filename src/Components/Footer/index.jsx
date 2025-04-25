import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-t from-[#1A1A1A] to-[#2E2E2E] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <NavLink to="/">
              <h1 className="font-montserrat text-2xl font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300">
                Asman
              </h1>
            </NavLink>
            <p className="font-montserrat text-sm text-gray-400">
              {t("keyword")}
            </p>
          </div>
          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4">
              {t("nav")}
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="font-montserrat text-sm text-gray-400 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  {t("homePage")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/books"
                  className="font-montserrat text-sm text-gray-400 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  {t("books")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/series"
                  className="font-montserrat text-sm text-gray-400 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  {t("enBooks")}
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@asman.com"
                  className="font-montserrat text-sm text-gray-400 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Email: support@asman.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+996779007909"
                  className="font-montserrat text-sm text-gray-400 hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Phone: +996 779 007 909
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4">
              {t("follow")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/_salahidin1_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-4 text-center">
          <p className="font-montserrat text-sm text-gray-400">
            {t("polity")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
