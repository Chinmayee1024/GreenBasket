import React from "react";
import MainBanner from "../components/MainBanner/MainBanner";
import Categories from "../components/Categories/Categories";
import BestSeller from "../components/BestSeller/BestSeller";
import BottomBanner from "../components/BottomBanner/BottomBanner";
import NewsLetter from "../components/NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
