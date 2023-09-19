import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://api.example.com/movies', {
        params: { title: searchQuery },
      });
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <nav className="navbar bg-base-100 flex justify-between items-center p-4">
      <div className="flex items-center">
        <button className="hidden md:block text-gray-500 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="ml-4">
          <Link href="/">
            <span className="text-red-500 text-2xl font-bold hover:text-red-700 cursor-pointer mr-4 p-2">Book my show</span>
          </Link>
        </div>
      </div>
      <form className="flex flex-grow items-center" onSubmit={handleSearchSubmit}>
        <input
          className="border-2 border-gray-500 h-8 flex-grow bg-black rounded-l px-2"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies..."
        />
        <button type="submit" className="bg-gray-700 text-white p-2 rounded-r">
          <Image src="https://www.pngall.com/wp-content/uploads/13/Search-Button-White-PNG.png" alt="Search" width={15} height={15} />
        </button>
      </form>
      <div className="flex items-center">
        <ul className="menu menu-horizontal px-1 flex gap-4">
          <li>
            <Link href="/Bookings">
              <span className="text-white hover:bg-gray-700 py-2 px-4 rounded cursor-pointer">Bookings</span>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <span className="text-white hover:bg-gray-700 py-2 px-4 rounded cursor-pointer">Sign In</span>
            </Link>
          </li>
          <li>
            <span className="text-white hover:bg-gray-700 py-2 px-4 rounded cursor-pointer">EN</span>
          </li>
        </ul>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-base-100 p-4">
          <ul>
            <li>
              <Link href="/watchlist">
                <span className="block py-2 cursor-pointer">Bookings</span>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <span className="block py-2 cursor-pointer">Sign In</span>
              </Link>
            </li>
            <li>
              <span className="block py-2 cursor-pointer">EN</span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
