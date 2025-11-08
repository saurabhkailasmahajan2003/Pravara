import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", description: "Overview", to: "/" },
  { label: "Employees", description: "Directory", to: "/employees" },
  { label: "Payroll", description: "Compensation", to: "/payroll" },
  { label: "Total Salaries", description: "Breakdown", to: "/total-salaries" },
  {
    label: "Other Expenses",
    description: "Monthly spend",
    to: "/other-expenses",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur lg:border-b lg:border-slate-200/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:gap-8">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 shadow-sm shadow-slate-200/60 transition hover:border-sky-200 hover:shadow-sky-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-lg shadow-sky-200/70 sm:h-10 sm:w-10">
            <span className="text-base font-semibold sm:text-lg">PH</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 sm:text-base">
              Pravara Health Care
            </span>
            <span className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
              Employee CRM
            </span>
          </div>
        </NavLink>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-sky-400 hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18 18 6M6 6l12 12"
                  : "M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5H18"
              }
            />
          </svg>
        </button>

        <div
          id="primary-navigation"
          className={`${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } absolute inset-x-4 top-[calc(100%+0.75rem)] grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition-[grid-template-rows] duration-200 lg:static lg:inset-auto lg:grid-rows-[1fr] lg:flex lg:flex-1 lg:justify-center lg:rounded-none lg:border-0 lg:bg-transparent lg:px-4 lg:shadow-none`}
        >
          <div className="overflow-hidden lg:flex lg:w-full lg:justify-center lg:overflow-visible">
            <ul className="flex flex-col gap-2 px-4 py-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-4 lg:px-0 lg:py-0">
              {navLinks.map((link) => (
                <li key={link.label} className="lg:flex">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition sm:text-sm",
                        "hover:bg-slate-100/80 hover:text-slate-900 lg:hover:bg-slate-100/70 lg:hover:text-sky-600",
                        isActive
                          ? "bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-200"
                          : "text-slate-600",
                      ].join(" ")
                    }
                  >
                    <span className="text-xs font-semibold sm:text-sm">
                      {link.label}
                    </span>
                    <span className="hidden text-[0.6rem] font-medium text-slate-400 lg:inline sm:text-xs">
                      {link.description}
                    </span>
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
