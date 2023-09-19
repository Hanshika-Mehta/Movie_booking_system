import { useState } from 'react';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Toggle Menu
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-lg rounded py-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Menu Item 1
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Menu Item 2
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">
            Menu Item 3
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
