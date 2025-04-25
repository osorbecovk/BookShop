import React, { useContext, useState } from "react";
import { BodyLanguage } from "../../Context/RootContext";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
  
const Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { card } = useContext(BodyLanguage);
  const selectedCard = card.find((el) => el.id == id);
  const [slice, setSlice] = useState(161);

  

  const toggleDescription = () => {
    setSlice(slice === 161 ? selectedCard.description.length : 161);
  };

  if (!selectedCard) return nunll;

  return (
    <section id="details" className="py-10 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        <div>
          <img
            src={selectedCard.image}
            alt={selectedCard.title}
            className="w-[330px] md:w-[326px] h-[510px] md:h-[524px] object-cover rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300"
          />
        </div>

        <div className="flex flex-col justify-start w-full max-w-xl text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {selectedCard.title}
          </h2>
          <p className="text-xl md:text-2xl font-semibold mb-2">
            {selectedCard.price} $
          </p>
          <p className="text-sm md:text-[20px] font-medium text-gray-300 mb-4">
            {t("Genre")}:{" "}
            {selectedCard.genre
              ? selectedCard.genre.charAt(0).toUpperCase() +
                selectedCard.genre.slice(1)
              : "Неизвестно"}
          </p>
          <h1 className="text-2xl font-semibold mb-2">{t("description")}</h1>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">
            {selectedCard.description.slice(0, slice)}
            {selectedCard.description.length > 161 && (
              <button
                onClick={toggleDescription}
                className="text-blue-400 underline ml-2 text-sm md:text-base transition-colors cursor-pointer"
              >
                {slice === 161 ? t("read_more") : t("hide")}
              </button>
            )}
          </p>
          <button
            onClick={() => setData()}
            className="bg-white/10 border border-white/20 font-semibold rounded-md mb-2 w-[200px] hover:bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] shadow-lg hover:text-gray-300 transition h-11 cursor-pointer text-white"
          >
            Добавить в корзину
          </button>
          <button
            onClick={() => setData()}
            className="bg-white/10 border border-white/20 font-semibold rounded-md w-[200px] hover:bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] shadow-lg hover:text-gray-300 transition h-11 cursor-pointer text-white"
          >
            Купить сейчас
          </button>
        </div>
      </div>
    </section>
  );
};

export default Details;
