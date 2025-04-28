import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BodyLanguage } from "../../Context/RootContext";
import { FaTrashAlt } from "react-icons/fa";
import Empty from "../../assets/Images/1.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

const Basket = () => {
  const { basket, setBasket } = useContext(BodyLanguage);
  const { t } = useTranslation();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataVerification, setDataVerification] = useState(false);
  const navigate = useNavigate();

  const my_id = `-1002625703503`;
  const token = `7518942973:AAH1FYHkHB_jQVBWNF_brbtyH7P4X9aQ3S0`;
  const api_key = `https://api.telegram.org/bot${token}/sendMessage`;

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, [setBasket, isModalOpen]);

  const deleteBasket = (id) => {
    const filtered = basket.filter((el) => el.id !== id);
    setBasket(filtered);
    localStorage.setItem("basket", JSON.stringify(filtered));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const quantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) + delta;
      if (newQuantity < 1) return prev;
      return { ...prev, [id]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return basket.reduce((acc, el) => {
      const quantity = quantities[el.id] || 1;
      const price = Number(el.price) || 0;
      return acc + price * quantity;
    }, 0);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
  };

  const checkout = () => {
    if (isSubmitting) return;

    const phoneRegex = /^\+996\d{9}$/;

    if (!name || !phone) {
      toast.error(t("error_fill_fields"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error(t("error_phone_format"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    if (basket.length === 0) {
      toast.error(t("error_empty_basket"), {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    if (basket.length > 10) {
      toast.error(t("error_too_many_items"), {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    setDataVerification(true);
  };

  const confirmOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const userData = {
      chat_id: my_id,
      parse_mode: "HTML",
      text: `
        🛒 <b>${t("new_order")}</b>
        👤 <b>${t("name")}:</b> ${name}
        📞 <b>${t("tel")}:</b> ${phone}
        🚚 <b>${t("delivery")}:</b> ${
        deliveryMethod === "pickup"
          ? t("pickup")
          : `${t("courier")} (${address})`
      }
        💳 <b>${t("payment")}:</b> ${
        paymentMethod === "online" ? t("payment_after") : t("payment_then")
      }
        📦 <b>${t("items")}:</b>
        ${basket
          .map(
            (el) =>
              `- ${el.title || t("no_title")} (${quantities[el.id] || 1} ${t(
                "pcs"
              )}) - ${formatPrice(
                Number(el.price) * (quantities[el.id] || 1)
              )}с`
          )
          .join("\n")}
        💵 <b>${t("total_amount")}:</b> ${formatPrice(calculateTotal())}с`,
    };

    const orderData = {
      name,
      phone,
      delivery:
        deliveryMethod === "pickup"
          ? t("pickup")
          : `${t("courier")} (${address})`,
      payment:
        paymentMethod === "online" ? t("payment_after") : t("payment_then"),
      items: basket.map((el) => ({
        title: el.title || t("no_title"),
        price: Number(el.price) || 0,
        quantity: quantities[el.id] || 1,
        description: el.description ? el.description.slice(0, 100) : "",
        genre: el.genre || "",
        image:
          el.image && !el.image.startsWith("data:")
            ? el.image.slice(0, 100)
            : "",
      })),
      total: calculateTotal(),
      text: userData.text,
    };

    try {
      const orderDataSize = JSON.stringify(orderData).length / 1024;

      if (orderDataSize > 100) {
        toast.error(t("error_order_too_large"), {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(api_key, userData);
      console.log("Ответ Telegram API:", response.data);

      setDataVerification(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      if (error.response) {
        console.error("Ответ Telegram API:", error.response.data);
        toast.error(
          t("error_telegram_api", {
            message: error.response.data.description || "Неверный запрос",
          }),
          {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
          }
        );
      } else {
        toast.error(t("error_order_failed"), {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBasket([]);
    localStorage.setItem("basket", JSON.stringify([]));
    setName("");
    setPhone("");
    setAddress("");
    setDeliveryMethod("pickup");
    setPaymentMethod("online");
    setQuantities({});
    navigate("/");
  };

  if (!basket.length) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-lg text-gray-300 font-montserrat font-semibold animate-pulse">
            <img
              className="w-[400px] mx-auto"
              src={Empty}
              alt={t("empty_basket")}
            />
            <br />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] p-[30px_0_30px_0]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in mb-[40px]">
              {t("customer_contacts")}
            </h1>
            <input
              type="text"
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-[288px] h-[43px] p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              aria-label={t("name")}
            />
            <input
              type="text"
              placeholder={t("tel")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full sm:w-[288px] h-[43px] p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              aria-label={t("tel")}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in mt-[20px]">
              {t("payment")}
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
                {t("payment_after")}
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
                <span>{t("payment_then")}</span>
              </label>
            </div>

            <button
              onClick={checkout}
              disabled={isSubmitting}
              className={`w-full sm:w-[288px] cursor-pointer bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white py-3 rounded-lg font-montserrat font-bold text-base hover:opacity-90 transition-all duration-300 transform mb-[20px] border border-gray-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={t("checkout")}
            >
              {isSubmitting ? t("submitting") : t("checkout")}
            </button>
          </div>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="space-y-2 flex flex-col gap-2 mr-[70px]">
            <h1 className="text-2xl font-extrabold text-white font-montserrat drop-shadow-lg animate-slide-in">
              {t("delivery")}
            </h1>
            <h2 className="text-[14px] font-[300] font-montserrat">
              {t("zakaz")}
            </h2>
            <label className="flex items-center gap-2 text-sm font-montserrat text-white">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => setDeliveryMethod("pickup")}
                className="h-5 w-5 text-gray-500 cursor-pointer focus:ring-gray-500"
              />
              {t("alypket")}
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
              {t("courier")}
            </label>

            {deliveryMethod === "courier" && (
              <textarea
                placeholder={t("address")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 h-24 resize-none"
                aria-label={t("address")}
              />
            )}
            <div className="flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-xl">
              <div>
                <p className="text-lg font-bold text-white font-montserrat">
                  {t("total_amount")}
                </p>
                <p className="text-sm text-red-400 font-montserrat">
                  {t("not_paid")}
                </p>
              </div>
              <p className="text-lg font-bold text-white font-montserrat">
                {formatPrice(calculateTotal())}с
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
                  <NavLink to={`/details/${el.id}`}>
                    <img
                      src={el.image || "https://via.placeholder.com/140x200"}
                      alt={el.title || t("no_title")}
                      className="w-[140px] h-[200px] object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                    />
                  </NavLink>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-sm font-bold text-white font-montserrat">
                      {el.title || t("no_title")}
                    </h2>
                    <p className="text-xs text-gray-300 font-montserrat">
                      {el.genre || t("bestseller")}
                    </p>
                    <p className="text-base font-bold text-white font-montserrat">
                      {formatPrice(Number(el.price) * (quantities[el.id] || 1))}
                      с
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => quantityChange(el.id, -1)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        aria-label={t("decrease_quantity")}
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-sm font-montserrat text-white">
                        {quantities[el.id] || 1}
                      </span>
                      <button
                        onClick={() => quantityChange(el.id, 1)}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        aria-label={t("increase_quantity")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBasket(el.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 transform hover:scale-110"
                    aria-label={t("delete_item")}
                  >
                    <FaTrashAlt className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="relative bg-gradient-to-br from-white/90 to-gray-100 p-10 rounded-3xl shadow-2xl w-full max-w-md animate-scale-fade">
            <div className="absolute top-3 right-3">
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 transition cursor-pointer"
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pop">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                {t("order_success_title")}
              </h2>
              <p className="text-gray-700 text-lg mb-6 text-center">
                {t("order_success_message")}
              </p>

              <button
                onClick={handleCloseModal}
                className="px-13 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all text-lg font-semibold"
              >
                {t("okay")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dataVerification && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-scale-fade">
            <button
              onClick={() => setDataVerification(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
              aria-label={t("close")}
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {t("verify_data_title")}
              </h2>
              <div className="w-full text-left text-gray-700 text-sm sm:text-base mb-6 space-y-2">
                <p>
                  <strong>{t("name")}:</strong> {name || t("not_provided")}
                </p>
                <p>
                  <strong>{t("tel")}:</strong> {phone || t("not_provided")}
                </p>
                <p>
                  <strong>{t("delivery")}:</strong>{" "}
                  {deliveryMethod === "pickup"
                    ? t("pickup")
                    : `${t("courier")} (${address || t("not_provided")})`}
                </p>
                <p>
                  <strong>{t("payment")}:</strong>{" "}
                  {paymentMethod === "online"
                    ? t("payment_after")
                    : t("payment_then")}
                </p>
                <p>
                  <strong>{t("items")}:</strong> {basket.length} {t("pcs")}
                </p>
                <p>
                  <strong>{t("total_amount")}:</strong>{" "}
                  {formatPrice(calculateTotal())}с
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={confirmOrder}
                  className="flex-1 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 text-base font-semibold"
                >
                  {t("okay")}
                </button>
                <button
                  onClick={() => setDataVerification(false)}
                  className="flex-1 py-2.5 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all duration-200 text-base font-semibold"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
