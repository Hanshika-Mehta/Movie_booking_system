import Link from "next/link";
import React, { useState, useEffect } from "react";

const Body = 
() => {
  const [userData, setUserData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3001/movies")
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return(
<div className="container mx-auto">
  <div className="flex flex-wrap">
    {userData.length > 0 ? (
      userData.map((curElem) => (
        <div key={curElem.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-black   border-2 border-white rounded-lg shadow-md p-4 hover:shadow-green-800 hover:shadow-lg hover:scale-105">
            <div className="flex justify-center">
            <img src={curElem.image} alt={curElem.name} height={100} width={100} className="mt-3 mb-4 hover:scale-125" />
            </div>
            {/* <h3 className="text-lg font-semibold text-white">ID: {curElem.id}</h3> */}
            <h2 className="text-green-700 font-bold">Movie Name: {curElem.movie_name}</h2>
            <h2 className="text-green-700">Year: {curElem.year}</h2>
            <h2 className="text-green-700">Duration: {curElem.duration}</h2>
            
          </div>
        </div>
      ))
    ) : (
      <div className="w-full">
        <p className="mt-4">No data available.</p>
      </div>
    )}
  </div>
</div>
  );
};

export default Body;