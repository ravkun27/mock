import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full mt-12 py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Navigation columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Sitemap */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6">Sitemap</h3>
              <ul className="space-y-4">
                {["Home", "Work", "About", "Blog"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex flex-col text-base hover:text-gray-300 transition-colors"
                    >
                      <span>{item}</span>
                      <span className="w-0 group-hover:w-full h-px bg-white transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6">Legal</h3>
              <ul className="space-y-4">
                {["Licensing", "Changelog"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex flex-col text-base hover:text-gray-300 transition-colors"
                    >
                      <span>{item}</span>
                      <span className="w-0 group-hover:w-full h-px bg-white transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg md:text-xl font-medium mb-6">Social</h3>
              <ul className="space-y-4">
                {["Instagram", "LinkedIn", "Facebook"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex flex-col text-base hover:text-gray-300 transition-colors"
                    >
                      <span>{item}</span>
                      <span className="w-0 group-hover:w-full h-px bg-white transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscribe section */}
          <div className="flex flex-col w-full lg:pl-12">
            <h3 className="text-lg md:text-xl font-medium mb-6">
              Subscribe to our newsletter
            </h3>
            <div className="w-full sm:max-w-sm md:max-w-md">
              <div className="flex flex-col space-y-4">
                {/* Email input */}
                <div className="relative">
                  <input
                    className="py-4 pl-10 pr-4 bg-white bg-opacity-10 w-full text-white placeholder-gray-400 outline-none rounded-sm"
                    placeholder="E-mail"
                    type="email"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 5L12 13L3 5M21 5C21 4.45 20.55 4 20 4H4C3.45 4 3 4.45 3 5M21 5V19C21 19.55 20.55 20 20 20H4C3.45 20 3 19.55 3 19V5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 transition-colors py-4 px-8 text-white font-medium rounded-sm">
                  GET NOTIFIED
                </button>

                {/* Terms */}
                <div className="flex items-start space-x-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-blue-600"
                    id="terms"
                  />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <span className="underline hover:text-white cursor-pointer">
                      Terms & Conditions
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © Digital Innovation Studio — made by Saurav
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
