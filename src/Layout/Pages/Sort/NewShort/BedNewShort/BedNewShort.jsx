import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { FilterDataContext } from "../../../../../Providers/FilterDataProvider";

const BedNewShort = ({ handleShowBed, showBed }) => {
  const { selectedBedrooms, setSelectedBedrooms } =
    useContext(FilterDataContext);

  const bedNumbers = ["1", "2", "3", "4", "5", "6", "7+"];
  // const [selectedBeds, setSelectedBeds] = useState([]);

  const toggleBedSelection = (bedNumber) => {
    setSelectedBedrooms((prevSelectedBeds) => {
      if (prevSelectedBeds.includes(bedNumber)) {
        return prevSelectedBeds.filter((bed) => bed !== bedNumber);
      } else {
        return [...prevSelectedBeds, bedNumber];
      }
    });
  };
  const handleBedButtonClick = (bedNumber) => {
    toggleBedSelection(bedNumber);
  };

  const clearBed = () => {
    setSelectedBedrooms([]);
  };

  console.log("Selected Bed: ", selectedBedrooms);

  return (
    <div className=" z-10 ">
      <div className="relative">
        {/* <h1 className="text-xl cursor-pointer " onClick={handleShowBed}>
          Bed{" "}
          <span> {showBed ? <KeyboardArrowUp /> : <KeyboardArrowDown />} </span>
        </h1> */}
        <button
          className="btn bg-white border-0 shadow-md text-black hover:bg-white "
          onClick={handleShowBed}
        >
          Bed{" "}
          <span> {showBed ? <KeyboardArrowUp /> : <KeyboardArrowDown />} </span>
        </button>
        <div
          className={` absolute flex flex-col gap-2 bg-white p-5 rounded-md ${
            showBed ? "" : "hidden"
          } `}
        >
          {bedNumbers.map((bedNumber) => (
            <button
              key={bedNumber}
              onClick={() => handleBedButtonClick(bedNumber)}
              className={`btn text-black hover:bg-white ${
                selectedBedrooms.includes(bedNumber)
                  ? "btn-primary"
                  : "bg-white border-0 shadow-md"
              }  `}
            >
              {bedNumber}
            </button>
          ))}

          <div className="flex gap-2">
            <button className="" onClick={clearBed}>
              Clear
            </button>
            <button className="btn bg-[#3FAE4C] border-0  text-white">
              Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedNewShort;
