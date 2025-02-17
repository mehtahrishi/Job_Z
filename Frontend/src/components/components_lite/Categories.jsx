import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [

  "Cloud Developer",
  "Full Stack Developer",
  "ML Ops Engineer",
  "MERN Developer",
  "Data Scientist",
  "Mobile Application Developer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "CyberSecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Bank Clerk",
  "Assistant",
  "Video Editor",
  "Cloud Developer",
  "Finance Executive",
];

// Dummy company icons (Replace with actual icons/images)
const companyLogos = [
  "/logos/cisco.png",
  "/logos/google.png",
  "/logos/fortinet.png",
  "/logos/accenture.png",
"/logos/aws.png",
"/logos/azure.png",
"/logos/flipkart.png",
"/logos/apple.png",
  "/logos/hsbc.png",
  "/logos/icici.png",
  "/logos/jp.png",
  "/logos/mastercard.png",
  "/logos/microsoft.png",
  "/logos/sammsung.png",
  "/logos/tp.png",
  "/logos/tm.png",
  "/logos/wipro.png",
  "/logos/zeb.png",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full">
      {/* Categories Carousel */}
      <div>
        <h1 className="text-2xl font-bold text-center text-[#fa4f09]">
          Categories
        </h1>
        <p className="text-center text-black">
          Explore our extensive job market.
        </p>
      </div>
      <Carousel className="w-full my-10" direction="right">
        <CarouselContent className="flex">
          {categories.map((category, index) => (
            <CarouselItem key={index}  className="w-1/5 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
              <Button   className="w-full bg-transparent text-black border border-black hover:bg-black hover:text-white" 
 onClick={() => searchJobHandler(category)}>
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Company Logos Carousel (Scrolling Left) */}
      <div>
      <h1 className="text-2xl font-bold text-center text-[#6b3ac2]">
          Top Hiring Companies
        </h1>
        <p className="text-center text-black">
          Explore our extensive hiring companies.
        </p>
      </div>
      <Carousel className="w-full max-w-6xl mx-auto overflow-hidden my-10 " >
  <CarouselContent className="flex">
    {companyLogos.map((logo, index) => (
      <CarouselItem key={index} className="basis-1/4 flex justify-center">
<img src={logo} alt="Company Logo" className="object-contain cursor-pointer h-14" loading="lazy" />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
    </div>
  );
};

export default Categories;
