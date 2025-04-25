import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BodyLanguage = createContext();

const RootContext = ({ children }) => {
  const [language, setLanguage] = useState("kg");
  const [card, setCard] = useState([]);
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );

  async function getData() {
    try {
      const res = await axios.get(
        "https://67ffe142b72e9cfaf7262fd6.mockapi.io/api/v1/books"
      );
      setCard(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteItem(id) {
    try {
      await axios.delete(
        `https://67ffe142b72e9cfaf7262fd6.mockapi.io/api/v1/books/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedBasket = basket.filter((item) => item.id !== id);
      setBasket(updatedBasket);
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  useEffect(() => {
    getData();
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <BodyLanguage.Provider
      value={{
        language,
        setLanguage,
        card,
        basket,
        setBasket,
        deleteItem,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </BodyLanguage.Provider>
  );
};

export const login = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export default RootContext;