import React, { useState, useEffect } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { handleSearch } from "../Actions/service/ride";
import { FaSpinner } from "react-icons/fa";
import { data } from "../data";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchParams = JSON.parse(localStorage.getItem("searchParams"));
    if (savedSearchParams) {
      setOrigin(savedSearchParams.origin);
      setDestination(savedSearchParams.destination);
      setDate(savedSearchParams.date);
      setSeats(savedSearchParams.seats);
    }
  }, []);

  const handleInputChange = (value) => {
    if (focusedInput === "origin") {
      setOrigin(value);
      filterSuggestions(value);
    } else if (focusedInput === "destination") {
      setDestination(value);
      filterSuggestions(value);
    }
    setSuggestionClicked(false);
  };

  const handleSuggestionClick = (value) => {
    if (focusedInput === "origin") {
      setOrigin(value);
    } else if (focusedInput === "destination") {
      setDestination(value);
    }
    setSuggestions([]);
    setFocusedInput(null);
    setSuggestionClicked(true);
  };

  const filterSuggestions = (value) => {
    const filtered = data.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const search = {
    date,
    origin,
    destination,
    seats,
  };

  const handleClickSearch = async () => {
    try {
      setLoading(true);
      let searchData = await handleSearch({ search });
      localStorage.setItem("searchData", JSON.stringify(searchData));
      navigate("/search");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/^0+/, "");
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
      setSeats(value);
    }
  };

  return (
    <>
      <div className="bg-white flex items-center relative xs:grid xs:grid-cols-2 xs:w-[80%] justify-center p-5 mt-10 mx-auto w-[60%]  drop-shadow-2xl rounded-lg">
        <div className="flex items-center bg-[#F4F7F7] ">
          <CiLocationOn />
          <input
            type="text"
            min="0"
            placeholder="Leaving From"
            value={origin}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setFocusedInput("origin")}
            className="p-2 bg-[#F4F7F7] mr-2"
            required
          />
        </div>
        <div className="flex items-center bg-[#F4F7F7] ml-2 mr-2">
          <CiLocationOn />
          <input
            type="text"
            placeholder="Going To"
            value={destination}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setFocusedInput("destination")}
            className="p-2  bg-[#F4F7F7]"
            required
          />
        </div>
        <div className="flex items-center mr-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 bg-[#F4F7F7]"
          />
        </div>
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={handleChange}
          className="p-2 bg-[#F4F7F7] mr-2"
        />
        <button
          className="
            bg-primary 
            p-[15px] w-[10%] mr-2 flex items-center 
            justify-center hover:bg-hover 
            rounded-lg"
          onClick={handleClickSearch}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <FaSpinner
                className="animate-spin mr-2"
                style={{ color: "white" }}
              />
            </div>
          ) : (
            <CiSearch style={{ color: "white", font: "bold", width: "100%" }} />
          )}
        </button>
      </div>
      <div className=" relative flex items-center justify-center z-50 bg-white mx-auto w-[300px] ">
        {suggestions.length > 0 && !suggestionClicked && (
          <ul className="w-[100%]">
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="cursor-pointer  border-b-2 text-center p-4 hover:bg-slate-400"
                onClick={() => {
                  handleSuggestionClick(city);
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
