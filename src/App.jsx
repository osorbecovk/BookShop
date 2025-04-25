import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BodyLanguage } from "./Context/RootContext"; 
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Create from "./Components/Create";
import Home from "./Components/Home";
import Category from "./Components/Category";
import Card from "./Components/Card";
import Details from "./Components/Details";
import Basket from "./Components/Basket";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(BodyLanguage); 
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  const routes = [
    { id: 1, path: "/", element: <Home /> },
    { id: 2, path: "/category", element: <Category /> },
    { id: 3, path: "/create", element: <ProtectedRoute><Create /></ProtectedRoute> },
    { id: 4, path: "/books", element: <Card /> },
    { id: 5, path: "/details/:id", element: <Details /> },
    { id: 6, path: "/basket", element: <Basket /> },
    { id: 7, path: "/login", element: <Login /> },
  ];

  return (
    <div className="App flex flex-col min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E] text-white">
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route key={el.id} path={el.path} element={el.element} />
        ))}
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;