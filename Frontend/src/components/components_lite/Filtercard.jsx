import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "../ui/button"; // Import Button component

const filterData = [
  {
    filterType: "Location -",
    array: [
     
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Uttar Pradesh",
      "Remote",
    ],
  },
  {
    filterType: "Genre -",
    array: [
      "Full Stack",
      "Cloud",
      "IT Troubleshoot",
      "Data Science",
      "Artificial Intelligence",
      "DevOps",
      "CyberSecurity",
      "Data Analysis",
      "ML Ops",
    ],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleClear = () => {
    setSelectedValue(""); // Reset selected filter
    dispatch(setSearchedQuery("")); // Dispatch empty query
  };

  return (
    <div className="w-full bg-trasnparent rounded-md pr-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button variant="outline" onClick={handleClear} className="text-[#6b3ac2] hover:text-[#FA4F09] bg-transparent hover:bg-transparent border-black">
          Clear All
        </Button>
      </div>

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <hr className="mt-3 border-black" />
            <h2 className="font-bold text-lg">{data.filterType}</h2>

            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
