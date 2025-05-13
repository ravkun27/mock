import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const navlinks = ["Home", "Work", "About", "Blog", "Contact"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="bg-[#ddd0] h-[102px] flex justify-between items-center py-[30px] px-[3%] inset-0 absolute z-50 w-full">
        {/* Logo */}
        <div>
          <img
            src="https://cdn.prod.website-files.com/672a1dc3f9c27f98c24c36dc/672a2b401ac029bdcea82c48_logo.avif"
            alt="logo"
            className="w-[70px] max-w-full inline-block"
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center">
          {navlinks.map((item, index) => (
            <div key={item} className="relative flex items-start">
              <a
                href={`#${item.toLowerCase()}`}
                className="relative group inline-block w-fit"
              >
                <div className="relative h-full w-fit overflow-hidden">
                  <div className="transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
                    <span className="block text-[20px] font-medium text-black">
                      {item}
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 w-full translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
                    <span className="block text-[20px] font-medium text-black">
                      {item}
                    </span>
                  </div>
                </div>
                <div className="mt-1 h-[1px] bg-black w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </a>
              {index !== navlinks.length - 1 && (
                <span className="ml-[1px] mr-[5px] text-black text-[24px]">
                  ,
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Burger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-[40vh] bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-[100%]"
        } flex`} // <-- added flex
      >
        <div className="flex flex-col items-start pl-5 space-y-6 pt-[120px] w-[80%] max-w-[320px] bg-white h-full">
          {navlinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl font-semibold text-black"
              onClick={() => setIsOpen(false)} // Close on click
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
