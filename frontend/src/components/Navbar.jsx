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
<<<<<<< HEAD
    // ⭐ Removed transparency & glass → added solid background
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
=======
    // Background: White (#FFFFFF)
    // Border: Light Gray (#D4D4D4) for subtle separation
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#D4D4D4] shadow-sm">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
      <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        {/* --- Logo Section --- */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4D4D4]"
        >
<<<<<<< HEAD
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold uppercase text-white sm:h-10 sm:w-10 sm:text-base">
            PH
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 sm:text-base">
              Pravara Health Care
            </span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-gray-500 sm:text-xs">
=======
          {/* Logo Icon: Dark Gray (#2B2B2B) background for high contrast */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B2B2B] text-sm font-bold text-white shadow-md sm:h-10 sm:w-10 sm:text-base">
            PH
          </div>
          <div className="flex flex-col">
            {/* Main Text: Dark Gray (#2B2B2B) */}
            <span className="text-sm font-bold tracking-tight text-[#2B2B2B] sm:text-base">
              Pravara Health Care
            </span>
            {/* Subtext: Medium Gray (#B3B3B3) - darker would interfere with hierarchy, this matches palette */}
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#B3B3B3] sm:text-xs">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              Employee CRM
            </span>
          </div>
        </NavLink>

        {/* --- Mobile Toggle Button --- */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
<<<<<<< HEAD
          className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition lg:hidden"
=======
          className="inline-flex items-center justify-center rounded-md p-2 text-[#2B2B2B] transition hover:bg-[#D4D4D4] lg:hidden focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]"
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
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
<<<<<<< HEAD
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } absolute inset-x-4 top-[calc(100%+0.75rem)] grid overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg transition-[grid-template-rows] duration-200 
          lg:static lg:inset-auto lg:grid-rows-[1fr] lg:flex lg:flex-1 lg:justify-center 
          lg:rounded-none lg:bg-transparent lg:border-0 lg:px-4 lg:shadow-none`}
        >
          <div className="overflow-hidden lg:flex lg:w-full lg:justify-center lg:overflow-visible">
            <ul className="flex flex-col gap-1 px-4 py-4 text-sm text-gray-700 
                           lg:flex-row lg:items-center lg:justify-center lg:gap-3 lg:px-0 lg:py-0">
=======
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } absolute inset-x-0 top-full grid overflow-hidden bg-[#FFFFFF] shadow-lg border-b border-[#D4D4D4] transition-all duration-300 ease-in-out 
          lg:static lg:inset-auto lg:grid-rows-[1fr] lg:flex lg:flex-1 lg:justify-end lg:overflow-visible lg:border-none lg:bg-transparent lg:shadow-none lg:opacity-100`}
        >
          <div className="overflow-hidden lg:flex lg:overflow-visible">
            <ul className="flex flex-col gap-1 px-4 py-4 lg:flex-row lg:items-center lg:gap-1 lg:p-0">
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                    className={({ isActive }) =>
                      [
<<<<<<< HEAD
                        "flex items-center gap-2 rounded-full px-3 py-2 transition",
                        "hover:bg-gray-100 hover:text-gray-900",
                        isActive
                          ? "bg-gray-100 text-indigo-600"
                          : "text-gray-600",
=======
                        "flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-[#2B2B2B] text-white shadow-sm" // Active: Dark Gray Background
                          : "text-[#2B2B2B] hover:bg-[#D4D4D4]", // Inactive: Dark Text, Light Gray Hover
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
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