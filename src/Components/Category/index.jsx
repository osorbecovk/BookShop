// import React, { useEffect } from "react";
// import first from "../../assets/Images/Научная.svg";
// import { HiArrowLongRight } from "react-icons/hi2";
// import axios from "axios";

// const Category = () => {
//   // Токен бота (лучше хранить в .env)
//   const BOT_TOKEN = "7518942973:AAH1FYHkHB_jQVBWNF_brbtyH7P4X9aQ3S0"; // Замените на process.env.REACT_APP_BOT_TOKEN

//   // Функция для получения chat_id через getUpdates
//   const fetchChatId = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`
//       )
//       const updates = response.data.result;
//       console.log("Updates:", updates);
      

//       // Логируем все обновления для поиска chat_id
//       console.log("Updates:", updates);

//       // Пример: находим chat_id канала или чата
//       updates.forEach((update) => {
//         if (update.message && update.message.chat) {
//           const chatId = update.message.chat.id;
//           const chatType = update.message.chat.type; // 'private', 'group', 'channel'
//           console.log(`Chat ID: ${chatId}, Type: ${chatType}`);
//         }
//       });
//     } catch (error) {
//       console.error("Error fetching updates:", error.response ? error.response.data : error.message);
//     }
//   };

//   // Выполняем запрос при монтировании компонента
//   useEffect(() => {
//     fetchChatId();
//   }, []);

//   return (
//     <section id="category">
//       <div className="category">
//         <div className="category-card w-[300px] h-[200px] rounded-[10px] relative">
//           <img src={first} alt="img" className="w-full h-full" />
//           <div className="category-text">
//             <HiArrowLongRight className="absolute bottom-2.5 left-18" />
//             <h1 className="absolute bottom-2 left-2">Научная</h1>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Category;