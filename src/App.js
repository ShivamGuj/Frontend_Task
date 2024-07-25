import React from "react";
import { useEffect, useState } from "react";
import image from "./image.jpeg";

const App = () => {
  const typeData = ["Signature", "Standalone"];
  const dateData = ["2022-2023", "2023-2024"];
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const handleNext = () => {
    setCurrentIndex((prev) => prev + itemsPerPage);
  };
  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - itemsPerPage);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?type=${type}`
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [type]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setData((prevData) =>
      prevData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="bg-[#203454] p-4 rounded-t-xl text-center md:text-left">
        <h className="text-xl text-white font-semibold font-sans">
          Wellness Retreats
        </h>
      </div>
      <div className="p-4">
        <div className="bg-[#e8dccc] p-4 rounded-lg shadow-lg mt-2 hidden md:block">
          <div className="h-[18vw] overflow-hidden relative rounded-lg">
            <img
              src={image}
              alt=""
              className="object-cover w-[100%] absolute top-[-24vw] opacity-80 brightness-125"
            />
          </div>
          <div className="flex flex-col py-3">
            <h className="text-xl font-sans"> Discover Your inner Peace</h>
            <h className="text-sm mt-1 font-sans">
              Join us for a series of wellness retreats designed to help you
              find tranquility and rejuvenation
            </h>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  py-4 mt-2">
          <select
            value={date}
            onChange={handleDateChange}
            required
            className="border py-3 md:px-1 md:py-2 rounded-md md:ml-2 md:bg-[#203454] md:text-white text-black font-sans cursor-pointer md:shadow-lg"
          >
            <option value="" className="font-sans text-black bg-white">
              Filter by Date
            </option>
            {dateData.map((index) => (
              <option key={index} className="font-sans text-black bg-white">
                {index}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-4 md:mt-0 border py-3 md:px-1 md:py-2 rounded-md md:ml-2 md:bg-[#203454] md:text-white text-black font-sans cursor-pointer md:shadow-lg"
          >
            <option value="" className="font-sans text-black bg-white">
              Filter by type
            </option>
            {typeData.map((index) => (
              <option key={index} className="font-sans text-black bg-white">
                {index}
              </option>
            ))}
          </select>
          <input
            type="text"
            onChange={(e) => handleFilterChange(e, "search")}
            placeholder="Search retreats by title"
            className="border p-2 rounded-md md:w-[30vw] md:absolute right-[1vw] md:mt-0 mt-4 md:bg-[#203454]  md:text-white font-sans md:shadow-lg"
          />
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
            {data
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#e8dccc] rounded-lg my-2 mb-3 md:mb-0 md:w-[30vw] md:mr-[2vw] shadow-lg"
                >
                  <div className="flex flex-col">
                    <div className="md:w-[12vw] md:h-[10vw] rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-[100%] h-[100%]"
                      />
                    </div>
                    <div className="flex flex-col ml-1/2 mt-1">
                      <h className="text-lg font-sans font-semibold mt-3">
                        {item.title}
                      </h>
                      <h className="text-sm font-sans text-gray-500 mt-1 md:text-black md:mt-3">
                        {item.description}
                      </h>
                      <h className="text-sm font-sans text-gray-500 mt-1 md:text-black md:mt-3">
                        Date: {item.date}
                      </h>
                      <h className="text-sm font-sans text-gray-500  md:text-black md:mt-1">
                        Location: {item.location}
                      </h>
                      <h className="text-sm font-sans text-gray-500 md:text-black md:mt-1 font-semibold md:font-normal">
                        Price: ${item.price}
                      </h>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center gap-2 mt-4 ">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="border py-2 px-4 rounded-md ml-2 bg-[#203454] text-white font-sans hover:bg-[#284169] cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= data.length}
              className="border py-2 px-4 rounded-md ml-2 bg-[#203454] text-white font-sans hover:bg-[#284169] cursor-pointer"
            >
              Next
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <h className="font-sans text-xs">
              © 2024 wellness Retreats. All rights reserved.
            </h>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
