import React, { useContext, useEffect, useRef, useState } from "react";
import BuyCard from "../BuyCard/BuyCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Filter from "../../Sort/Filter/Filter";
import { FilterDataContext } from "../../../../Providers/FilterDataProvider";
import { FaSliders } from "react-icons/fa6";
import BuyFilter from "../../Sort/BuyFilter/BuyFilter";
import axios from "axios";
import { FiChevronDown, FiSliders } from "react-icons/fi";
import Marque from "../../SharedPage/Marque/Marque";
import Banner from "../../SharedPage/Banner/Banner";

const Buy = () => {
  const {
    lattitude,
    longitude,
    baseUrl,
    doubleLocation,
    location_1,
    location_2,
    selectedAmenities,
  } = useContext(AuthContext);

  const {
    byFilter,
    setByFilter,
    selectedBathrooms,
    selectedBedrooms,
    minPrice,
    maxPrice,
    selectedCategoriesBuySort,
    buys, ///come from FilterDataContext
    setBuys, /// ///come from FilterDataContext
    pageNumber,
    setPageNumber,
    rentPageNumber,
    setRentPageNumber,
  } = useContext(FilterDataContext);

  ///Buy Data start
  const [closeFilterBuy, setCloseFilterBuy] = useState(false);
  const closeButtonRef = useRef(null);
  // const [buys, setBuys] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null);

  ////Ovserver start
  useEffect(() => {
    const observer = new IntersectionObserver((items) => {
      let output = items[0].isIntersecting;
      console.log(output);
      if (output) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
      setHasMore(false);
    });
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore]);
  console.log("Page Number: ", pageNumber);

  ////Ovserver end

  ///Buy Data end

  ////Post Count
  const [postCount, setPostCount] = useState("");
  useEffect(() => {
    if (location_1 && location_2) {
      fetch(
        `${baseUrl}/pro/postcount/area?location1=${location_1}&location2=${location_2}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.postCount) {
            setPostCount(data?.postCount);
          }
        });
    }
  }, [location_1, location_2]);
  ///Area End

  /**
   * Close Modal start
   */

  useEffect(() => {
    if (byFilter || closeFilterBuy) {
      closeButtonRef?.current.click();
      // setByFilter(false);
    }
  }, [byFilter, closeFilterBuy]);
  /**
   * Close Modal end
   */

  return (
    <div>
      {/* Modal start */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
        <dialog id="filterModal_2" className="modal-middle md:modal  ">
          <div className="modal-box w-11/12 max-w-full bg-white">
            <BuyFilter
              closeFilterBuy={closeFilterBuy}
              setCloseFilterBuy={setCloseFilterBuy}
            ></BuyFilter>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button
                  className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
                  ref={closeButtonRef}
                >
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* Modal end */}

      <div className="flex justify-end items-center my-4 mx-4 md-mx-0">
        {/* x ads in abc area start */}
        {/* <div>
          {
            // postCount &&
            <p>
              {postCount} ads in {location_1}, {location_2}
            </p>
          }
        </div> */}
        {/* x ads in abc area end */}

        {/* <h1 className="w-6/12 text-center bg-green-400 mx-auto m-10 sticky top-0">
          Page Number: {pageNumber}
        </h1>
        <button className="btn btn-primary" onClick={handleAddData}>
          Add
        </button> */}

        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("filterModal_2").showModal()}
        >
          <FiSliders />
          Filter <FiChevronDown />
        </button>
        {/* <Link to={'/buypost'}> <button className='btn btn-success'>Post</button> </Link> */}
      </div>

      <div className="">
        {buys?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4  md:gap-x-6 gap-y-6 gap-x-0 mx-5 overflow-auto ">
            {buys.map((buy, idx) => (
              <BuyCard key={idx} buy={buy} forBuy={"forBuy"}></BuyCard>
            ))}
          </div>
        ) : (
          <p>Nothig to Show</p>
        )}
      </div>

      <div ref={loadingRef}>
        {/* <p>Loading</p> */}
        <span className="loading loading-spinner text-warning"></span>
      </div>
    </div>
  );
};

export default Buy;
