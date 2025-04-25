import React from "react";
import first from "../../assets/Images/Научная.svg";
import { HiArrowLongRight } from "react-icons/hi2";

const Category = () => {
  return (
    <section id="category">
      <div className="category">
        <div className="category-card w-[300px] h-[200px] rounded-[10px] relative">
          <img src={first} alt="img" className="w-full h-full" />
          <div className="category-text">
            <HiArrowLongRight className="absolute bottom-2.5 left-18"/>
            <h1 className="absolute bottom-2 left-2">Научная</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
