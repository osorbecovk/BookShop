import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BodyLanguage } from "../../Context/RootContext";
import { FaTrashAlt } from "react-icons/fa";
import Empty from "../../assets/Images/1.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Basket = () => {
  const { basket, setBasket } = useContext(BodyLanguage);
  const { t } = useTranslation();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);

    const initialQuantities = {};
    storedBasket.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [setBasket]);

  const deleteBasket = (id) => {
    const filtered = basket.filter((el) => el.id !== id);
    setBasket(filtered);
    localStorage.setItem("basket", JSON.stringify(filtered));
  };

  const calculateTotal = () => {
    return basket.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      const price = item.price;
      return total + price * quantity;
    }, 0);
  };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const quantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleCheckout = async () => {
    const phoneRegex = /^\+996\d{9}$/;

    if (!name || !phone) {
      toast.error("Аты-жөнүңүздү жана телефон номериңизди толтуруңуз!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Телефон номери +996 менен башталып, 9 орундуу болушу керек!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (basket.length > 10) {
      toast.error("Слишком много товаров в корзине. Максимум 10.", {
        position: "top-right",
        closeOnClick: true,
        theme: "dark",
      });
      return;
    }

    const orderData = {
      name,
      phone,
      delivery: deliveryMethod === "pickup" ? "Алып кетүү" : `Курьер (${address})`,
      payment: paymentMethod === "online" ? "Онлайн төлөм" : "Накталай",
      items: basket.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: quantities[item.id] || 1,
        description: item.description ? item.description.slice(0, 100) : "", // Ограничение описания
        genre: item.genre || "",
        image: item.image && !item.image.startsWith("data:") ? item.image.slice(0, 100) : "", // Исключение Base64
      })),
      total: calculateTotal(),
    };

    try {
      // Логирование для диагностики
      const orderDataSize = JSON.stringify(orderData).length / 1024; // Размер в КБ
      console.log("orderData:", orderData);
      console.log("Количество товаров:", basket.length);
      console.log(`Размер orderData: ${orderDataSize} КБ`);

      // Проверка размера данных
      if (orderDataSize > 100) {
        toast.error("Заказ слишком большой. Уменьшите количество товаров.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        return;
      }

      // Отправка запроса
      const response = await axios.post(
        "https://67ffe142b72e9cfaf7262fd6.mockapi.io/api/v1/books",
        orderData
      );
      toast.success("Заказ успешно отправлен!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setBasket([]);
      localStorage.setItem("basket", JSON.stringify([]));
      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      if (error.response && error.response.status === 413) {
        toast.error("Заказ слишком большой. Уменьшите количество товаров или упростите описания.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error("Произошла ошибка при отправке заказа. Попробуйте снова.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    }
  };

  if (!basket.length) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-lg text-gray-300 font-montserrat font-semibold animate-pulse">
            <img className="w-[400px]" src={Empty} alt="" />
            <br />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] p-[30px_0_30px_0]">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in mb-[40px]">
              {t("customer_contacts") || "Контакты клиента"}
            </h1>
            <input
              type="text"
              placeholder={t("name") || "Аты-жөнү"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-[288px] h-[43px] p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            />
            <input
              type="text"
              placeholder={t("tel") || "Телефон"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full sm:w-[288px] h-[43px] p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in mt-[20px]">
              {t("payment") || "Оплата"}
            </h1>
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-montserrat text-white">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="h-4 w-4 cursor-pointer text-gray-500 focus:ring-gray-500"
                />
                {t("payment_after") || "Онлайн төлөм"}
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-montserrat text-white">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-4 w-4 cursor-pointer text-gray-500 focus:ring-gray-500"
                />
                <h1 className="w-[288px]">{t("payment_then") || "Накталай"}</h1>
              </label>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full sm:w-[288px] cursor-pointer bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white py-3 rounded-lg font-montserrat font-bold text-base hover:opacity-90 transition-all duration-300 transform mb-[20px] border border-gray-600"
            >
              {t("checkout") || "Оплатить"}
            </button>
          </div>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="space-y-2 flex flex-col gap-2 mr-[70px]">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in">
              {t("delivery") || "Доставка"}
            </h1>
            <h2 className="text-[14px] font-[300] font-montserrat">
              {t("zakaz") || "Заказ"}
            </h2>
            <label className="flex items-center gap-2 text-sm font-montserrat cursor-pointer text-white">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => setDeliveryMethod("pickup")}
                className="h-5 w-5 text-gray-500 cursor-pointer focus:ring-gray-500"
              />
              {t("alypket") || "Алып кетүү"}
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-montserrat text-white">
              <input
                type="radio"
                name="delivery"
                value="courier"
                checked={deliveryMethod === "courier"}
                onChange={() => setDeliveryMethod("courier")}
                className="h-5 w-5 text-gray-500 cursor-pointer focus:ring-gray-500"
              />
              {t("courier") || "Курьер"}
            </label>

            {deliveryMethod === "courier" && (
              <textarea
                placeholder={t("address") || "Дарек"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 h-24 resize-none"
              />
            )}
            <div className="flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl">
              <div>
                <p className="text-lg font-bold text-white font-montserrat">
                  {t("total_amount") || "Общая сумма:"}
                </p>
                <p className="text-sm text-red-400 font-montserrat">
                  {t("not_paid") || "Ещё не оплачено"}
                </p>
              </div>
              <p className="text-lg font-bold text-white font-montserrat">
                {calculateTotal()}с
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <div className="space-y-4 max-h-[500px] overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent rounded-lg no-scrollbar">
              {basket.map((el) => (
                <div
                  key={el.id}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={el.image || "https://via.placeholder.com/140x200"}
                    alt={el.title || "Китеп"}
                    className="w-[140px] h-[200px] object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1 space-y-2">
                    <h2 className="text-sm font-bold text-white font-montserrat">
                      {capitalizeFirstLetter(el.title || "Без названия")}
                    </h2>
                    <p className="text-xs text-gray-300 font-montserrat">
                      {el.genre || "New York Times Bestseller"}
                    </p>
                    <p className="text-base font-bold text-white font-montserrat">
                      {el.price}c
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => quantityChange(el.id, -1)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-sm font-montserrat text-white">
                        {quantities[el.id] || 1}
                      </span>
                      <button
                        onClick={() => quantityChange(el.id, 1)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBasket(el.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                  >
                    <FaTrashAlt className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
