import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../Context/RootContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error(t("fillFields") || "Заполните все поля", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (password === "kubanych" && username === "Admin") {
      login();
      toast.success(t("loginSuccess") || "Успешный вход!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      navigate(from, { replace: true });
    } else {
      toast.error(t("invalidCredentials") || "Неверные данные!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white">
      <div className="bg-[#2e2e2e] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          {t("login") || "Войти"}
        </h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("username") || "Имя пользователя"}
            className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white outline-none placeholder:text-gray-300"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password") || "Пароль"}
              className="w-full p-3 pr-12 rounded-lg border border-white/20 bg-white/10 text-white outline-none placeholder:text-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-white/10 border border-white/20 px-5 py-3 rounded-lg hover:bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] transition text-white font-semibold"
          >
            {t("login") || "Войти"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;
