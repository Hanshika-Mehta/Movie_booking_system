import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/router";

const Seats = () => {
  const router = useRouter();
  const {movie_name} = router.query;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const rows = 10;
  const cols = 14;
  const aisleSeats = [6, 7];

    useEffect(() => {
            if(movie_name)
            {
                console.log("movie name is ",movie_name);
            }
    }, [movie_name])

  const toggleSeatSelection = (seatIndex: number) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatIndex)) {
        return prevSelectedSeats.filter((index) => index !== seatIndex);
      } else {
        return [...prevSelectedSeats, seatIndex];
      }
    });
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="bg-gray-900 text-white p-4">
        <Navbar />
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="#back" className="text-2xl text-white mr-4">
              <i className="fa fa-angle-left"></i>
            </a>
            <div>
              <div className="text-white">Gold <span className="text-sm">(U/A)</span></div>
              <div className="text-gray-400 text-sm">
                INOX: Udaipur , Rajasthan,313002
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white text-sm mr-10 cursor-pointer">Number of Seats book : {selectedSeats.length} Tickets <i className="fa fa-angle-down"></i></div>
            <div className="text-white cursor-pointer">
              <i className="fa fa-close"></i>
            </div>
          </div>
        </nav>
        <header className="bg-gray-200 p-4 flex flex-col items-center">
          <div className="text-gray-400 text-xs mb-2" id="ticket-date">Today, 19-September, 01:00 PM</div>
          <div className="flex space-x-2">
            
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             1:45PM
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             2:25PM
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             3:10PM
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             5.20PM
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             6.50PM
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             9.45PM
        </button>
        
          </div>
        </header>
        <div className="p-8">
          
          <hr className="my-2 border-gray-300" />
          <div className="grid grid-cols-14 gap-2">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2">
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <button
                    key={colIndex}
                    className={`w-8 h-8 rounded-md ${
                      aisleSeats.includes(colIndex) ? 'bg-transparent' : selectedSeats.includes(rowIndex * cols + colIndex) ? "bg-green-500" : "bg-gray-500 hover:bg-gray-700"
                    }`}
                    disabled={aisleSeats.includes(colIndex)}
                    onClick={() => toggleSeatSelection(rowIndex * cols + colIndex)}
                  >
                    {!aisleSeats.includes(colIndex) ? rowIndex * cols + colIndex + 1 : ''}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 px-8">
          <p className="mb-2">Selected Seats: {selectedSeats.length}</p>
          <a href="/BookingConfirmation" className="bg-blue-500 text-white px-4 py-2 rounded">
            Confirm Booking
          </a>
        </div>
      </div>
    </>
  );
};

export default Seats;
