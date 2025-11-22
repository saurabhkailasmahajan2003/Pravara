import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Employees", to: "/employees" },
  { label: "Payroll", to: "/payroll" },
  { label: "Total Salaries", to: "/total-salaries" },
  { label: "Analytics", to: "/financial-analytics" },
  { label: "Expenses", to: "/other-expenses" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Background: White (#FFFFFF)
    // Border: Light Gray (#D4D4D4) for subtle separation
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#D4D4D4] shadow-sm">
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        {/* --- Logo Section --- */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4D4D4]"
        >
          {/* Logo Image */}
          <img 
            src="https://res.cloudinary.com/duc9svg7w/image/upload/v1763808251/pravara_logo_bmg7bj.png" 
            alt="Pravara Health Care Logo" 
            className="h-12 w-auto"
          />
        </NavLink>

        {/* --- Mobile Toggle Button --- */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#2B2B2B] transition hover:bg-[#D4D4D4] lg:hidden focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18 18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              }
            />
          </svg>
        </button>

        {/* --- Navigation Links --- */}
        <div
          id="primary-navigation"
          className={`${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } absolute inset-x-0 top-full grid overflow-hidden bg-[#FFFFFF] shadow-lg border-b border-[#D4D4D4] transition-all duration-300 ease-in-out 
          lg:static lg:inset-auto lg:grid-rows-[1fr] lg:flex lg:flex-1 lg:justify-end lg:overflow-visible lg:border-none lg:bg-transparent lg:shadow-none lg:opacity-100`}
        >
          <div className="overflow-hidden lg:flex lg:overflow-visible">
            <ul className="flex flex-col gap-1 px-4 py-4 lg:flex-row lg:items-center lg:gap-1 lg:p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                    className={({ isActive }) =>
                      [
                        "flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-[#2B2B2B] text-white shadow-sm" // Active: Dark Gray Background
                          : "text-[#2B2B2B] hover:bg-[#D4D4D4]", // Inactive: Dark Text, Light Gray Hover
                      ].join(" ")
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}