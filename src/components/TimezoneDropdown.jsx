import { useState } from "react";

export const TimezoneDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (selectedTimezone) => {
    onChange(selectedTimezone);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent z-50 p-1.5 border rounded-md cursor-pointer font-bold"
      >
        {value}
      </div>
      {isOpen && (
        <div className="absolute top-10 left-0 overflow-x-hidden border rounded-md z-40 bg-blue-500/40 shadow-md max-h-80 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-1.5 hover:bg-blue-700 rounded-md"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
