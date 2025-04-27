import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage("");
  };

  const setData = async () => {
    if (!title || !price || !description || !genre || !image) {
      toast.error(t("fillFields") || "Заполните все поля", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        theme: "dark",
      });
      return;
    }

    const newData = {
      title,
      price,
      description,
      genre: genre,
      image,
    };

    try {
      await axios.post(
        `https://67ffe142b72e9cfaf7262fd6.mockapi.io/api/v1/books`,
        newData
      );
      toast.success(t("bookAdded") || "Книга успешно добавлена!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setTitle("");
      setPrice("");
      setDescription("");
      setGenre("");
      setImage("");
    } catch (error) {
      toast.error(t("errorAddingBook") || "Ошибка при добавлении книги", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        closeOnClick: true,
      });
    }
  };

  return (
    <section
      id="create"
      className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
          <div className="w-[360px] h-[360px] bg-[#2E2E2E] border border-white/20 flex flex-col items-center justify-center text-center text-gray-400 text-sm cursor-pointer rounded-lg relative">
            <input
              type="file"
              onChange={onChange}
              className="hidden"
              id="image-upload"
              accept="image/*"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              {image ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-[200px] h-[320px] object-cover rounded-lg"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <CiImageOn className="text-[40px] mb-2" />
                  <span>{t("uploadImage") || "Сүрөт жүктөө"}</span>
                </>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder={t("bookTitle") || "Китептин аталышы"}
              className="border border-white/20 rounded-[5px] p-4 focus:outline-none h-[50px] font-[600] placeholder:text-gray-400 bg-white/10 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
              <select
                className="border border-white/20 rounded-md font-[600] outline-0 cursor-pointer bg-white/10 text-white placeholder:text-gray-400 w-1/2"
                style={{ padding: "0 10px" }}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="" className="text-black" disabled>
                  {t("selectGenre") || "Выберите жанр"}
                </option>
                <option value={t("genre.fantasy")} className="text-black">
                  {t("genre.fantasy")}
                </option>
                <option value={t("genre.sciFi")} className="text-black">
                  {t("genre.sciFi")}
                </option>
                <option value={t("genre.detective")} className="text-black">
                  {t("genre.detective")}
                </option>
                <option value={t("genre.thriller")} className="text-black">
                  {t("genre.thriller")}
                </option>
                <option value={t("genre.romance")} className="text-black">
                  {t("genre.romance")}
                </option>
                <option value={t("genre.historical")} className="text-black">
                  {t("genre.historical")}
                </option>
                <option value={t("genre.horror")} className="text-black">
                  {t("genre.horror")}
                </option>
                <option value={t("genre.youngAdult")} className="text-black">
                  {t("genre.youngAdult")}
                </option>
                <option value={t("genre.adventure")} className="text-black">
                  {t("genre.adventure")}
                </option>
                <option value={t("genre.crime")} className="text-black">
                  {t("genre.crime")}
                </option>
                <option value={t("genre.dystopian")} className="text-black">
                  {t("genre.dystopian")}
                </option>
                <option value={t("genre.biography")} className="text-black">
                  {t("genre.biography")}
                </option>
                <option value= {t("genre.sciFiThriller")} className="text-black">
                  {t("genre.sciFiThriller")}
                </option>
                <option value={t("genre.classic")} className="text-black">
                  {t("genre.classic")}
                </option>
                <option value={t("genre.psychological")} className="text-black">
                  {t("genre.psychological")}
                </option>
                <option value={t("genre.supernatural")} className="text-black">
                  {t("genre.supernatural")}
                </option>
                <option value={t("genre.selfHelp")} className="text-black">
                  {t("genre.selfHelp")}
                </option>
                <option value={t("genre.comedy")} className="text-black">
                  {t("genre.comedy")}
                </option>
                <option value={t("genre.epicFantasy")} className="text-black">
                  {t("genre.epicFantasy")}
                </option>
                <option value={t("genre.children")} className="text-black">
                  {t("genre.children")}
                </option>
              </select>
              <input
                type="number"
                placeholder={t("price") || "Баасы"}
                className="border border-white/20 rounded-md p-3 w-1/2 h-[50px] font-[600] outline-0 placeholder:text-gray-400 bg-white/10 text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <textarea
              placeholder={t("description") || "Сүрөттөмө"}
              rows={6}
              className="border border-white/20 rounded-md p-3 resize-none font-[600] outline-0 placeholder:text-gray-400 bg-white/10 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              onClick={setData}
              className="bg-white/10 border border-white/20 font-semibold rounded-md hover:bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] shadow-lg hover:text-gray-300 transition h-11 cursor-pointer text-white"
            >
              {t("saveInfo") || "Сактоо"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Create;
