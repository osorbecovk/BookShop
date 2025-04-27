const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || "7518942973:AAH1FYHkHB_jQVBWNF_brbtyH7P4X9aQ3S0";
const CHAT_ID = process.env.CHAT_ID || "@MyCheckoutBookShopBot";
const MOCKAPI_URL =
  process.env.MOCKAPI_URL ||
  "https://67ffe142b72e9cfaf7262fd6.mockapi.io/api/v1/books";

app.post("/send-order", async (req, res) => {
  try {
    const { name, phone, delivery, payment, items, total } = req.body;
    
    await axios.post(MOCKAPI_URL, {
      name,
      phone,
      delivery,
      payment,
      items,
      total,
      createdAt: new Date().toISOString(),
    });

    const message = `
    🛒 Новый заказ!
    👤 Имя: ${name}
    📞 Телефон: ${phone}
    🚚 Доставка: ${delivery}
    💳 Оплата: ${payment}
    📦 Товары:
    ${items
      .map(
        (item) =>
          `- ${item.title} (${item.quantity} шт.) - $${item.price * item.quantity}`
      )
      .join("\n")}
    💵 Итог: $${total}
    `;
    
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    res.status(200).json({ message: "Заказ успешно отправлен!" });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Ошибка, попробуйте снова." });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${MOCKAPI_URL}/${id}`);
    res.status(200).json({ message: "Элемент удалён!" });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Ошибка при удалении." });
  }
});

app.listen(3001, "0.0.0.0", () => console.log("Сервер запущен на порту 3001"));