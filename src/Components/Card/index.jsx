import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BodyLanguage } from "../../Context/RootContext";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCartSharp } from "react-icons/io5";

const Card = () => {
  const { t } = useTranslation();
  const { card, basket, setBasket } = useContext(BodyLanguage);

  function addToBasket(item) {
    const storedBasket = [...basket];
    const isExist = storedBasket.find((el) => el.id === item.id);

    if (!isExist) {
      const updatedBasket = [...storedBasket, item];
      setBasket(updatedBasket);
      toast.success(t("addToBasket") || "Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        closeOnClick: true
      });
    } else {
      toast.error(t("alreadyInBasket") || "Товар уже в корзине", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        closeOnClick: true
      });
    }
  }

  return (
    <section id="card" style={{ padding: "50px 0" }}>
      <div className="container">
        <div className="flex items-center gap-[20px_20px] flex-wrap justify-center">
          {card?.map((el) => (
            <div
              key={el.id}
              className="rounded-lg w-[200px] max-sm:w-[145px] h-[353px] max-sm:h-[258px] bg-[#2E2E2E] border border-white/20 shadow-lg"
            >
              <NavLink to={`/details/${el.id}`}>
                <img
                  src={el.image}
                  alt={el.title}
                  className="w-[200px] max-sm:w-[160px] h-[308px] max-sm:h-[222px] object-cover rounded-t-lg mb-2"
                />
              </NavLink>
              <div className="flex items-center justify-between px-2">
                <h1 className="text-[15px] max-sm:text-[13px] w-[70%] font-montserrat text-white truncate">
                  {el.title}
                </h1>
                <div onClick={() => addToBasket(el)}>
                  <IoCartSharp className="text-[24px] max-sm:text-[20px] cursor-pointer text-white hover:text-gray-300 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Card;