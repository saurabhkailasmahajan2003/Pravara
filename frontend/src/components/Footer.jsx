import { NavLink } from 'react-router-dom'

const quickLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Employees', href: '/employees' },
  { label: 'Payroll', href: '/payroll' },
  { label: 'Total Salaries', href: '/total-salaries' },
  { label: 'Other Expenses', href: '/other-expenses' },
]

const policyLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Data Protection', href: '#' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M6.5 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm.5 4H3v13h4V7.5Zm5 0H8v13h4v-7.1c0-1.9.96-2.9 2.5-2.9 1.2 0 2.5.73 2.5 2.9v7.1h4v-7.8c0-3.5-1.9-5.2-4.4-5.2-2.02 0-3.16 1.05-3.7 1.93h-.05V7.5Z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M22 5.92c-.77.35-1.6.58-2.46.69a4.33 4.33 0 0 0 1.9-2.38 8.59 8.59 0 0 1-2.73 1.05 4.29 4.29 0 0 0-7.31 3.92A12.19 12.19 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.33 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.3 4.3 0 0 0 3.44 4.2 4.32 4.32 0 0 1-1.93.07 4.3 4.3 0 0 0 4.01 2.98A8.6 8.6 0 0 1 2 19.54 12.14 12.14 0 0 0 8.56 21.5c7.2 0 11.14-5.97 11.14-11.15 0-.17 0-.33-.01-.5A7.94 7.94 0 0 0 22 5.92Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M21.6 7.2a2.75 2.75 0 0 0-1.94-1.94C17.74 4.7 12 4.7 12 4.7s-5.74 0-7.66.56A2.75 2.75 0 0 0 2.4 7.2C1.85 9.12 1.85 12 1.85 12s0 2.88.55 4.8a2.75 2.75 0 0 0 1.94 1.94c1.92.56 7.66.56 7.66.56s5.74 0 7.66-.56a2.75 2.75 0 0 0 1.94-1.94c.55-1.92.55-4.8.55-4.8s0-2.88-.55-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const BG_MAIN = "bg-[#0A0A0A]"; // Deep black background
  const BG_ACCENT = "bg-[#171717]"; // Dark gray for secondary background (bottom bar, contact box)
  const TEXT_PRIMARY = "text-white";
  const TEXT_MUTED = "text-[#A3A3A3]"; // Light gray for secondary text
  const BORDER_DARK = "border-[#262626]"; // Dark gray for borders

  return (
<<<<<<< HEAD
    <footer className="relative mt-10 border-t border-gray-200 bg-white text-gray-700">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white sm:h-12 sm:w-12">
              <span className="text-base font-semibold sm:text-lg">PH</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 sm:text-base">Pravara Health Care</p>
              <p className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-gray-500 sm:text-xs">Employee CRM Platform</p>
            </div>
          </div>
          <p className="max-w-xs text-xs text-gray-500 sm:text-sm">
=======
    // Apply main dark background and border
    <footer className={`mt-auto border-t ${BORDER_DARK} ${BG_MAIN} ${TEXT_MUTED}`}>
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 lg:grid-cols-4 xl:px-16">
        
        {/* --- Brand Section --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Logo box remains dark, text white */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B2B2B] text-white shadow-md">
              <span className="text-base font-bold">PH</span>
            </div>
            <div>
              <p className={`text-sm font-bold ${TEXT_PRIMARY}`}>Pravara Health Care</p>
              <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${TEXT_MUTED}`}>Employee CRM</p>
            </div>
          </div>
          {/* Main paragraph text is muted light gray */}
          <p className={`max-w-xs text-sm ${TEXT_MUTED}`}>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
            Empowering Pravara Health Care teams with real-time employee intelligence, payroll transparency, and operational alignment.
          </p>
          
          {/* Social Icons: Inverted colors for dark mode */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
<<<<<<< HEAD
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[0.65rem] font-semibold text-gray-700 transition hover:border-indigo-300 hover:text-indigo-600 sm:text-xs"
=======
                aria-label={link.label}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${BORDER_DARK} ${BG_ACCENT} ${TEXT_MUTED} transition-colors hover:border-white hover:bg-white hover:text-black`}
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
<<<<<<< HEAD
          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group inline-flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-xs transition hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900 sm:text-sm"
                  href={link.href}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 sm:h-8 sm:w-8">
                    {link.icon}
                  </span>
=======
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? `font-semibold ${TEXT_PRIMARY}` // Active link is white
                      : `${TEXT_MUTED} hover:${TEXT_PRIMARY} hover:underline` // Inactive links are light gray, hover to white
                  }
                >
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Policies --- */}
        <div>
<<<<<<< HEAD
          <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm">Policies</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a className="inline-flex items-center gap-2 text-xs transition hover:text-indigo-600 sm:text-sm" href={link.href}>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
=======
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Policies</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`${TEXT_MUTED} hover:${TEXT_PRIMARY} hover:underline`}
                >
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

<<<<<<< HEAD
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm">Contact</h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-700 sm:text-sm">
              <li>Pravara Health Care HQ</li>
              <li>Nashik Road, Pravara Nagar</li>
              <li>Maharashtra 422101</li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-700 sm:text-sm">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-xs">Email & Support</p>
            <a className="mt-2 block text-sm font-semibold text-gray-900 transition hover:text-indigo-600" href="mailto:support@pravarahealthcare.in">
              support@pravarahealthcare.in
            </a>
            <p className="mt-2 text-xs text-gray-500 sm:text-sm">Phone: +91 1800-123-4521</p>
=======
        {/* --- Contact Info --- */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Contact</h3>
          <ul className={`mt-4 space-y-2 text-sm ${TEXT_MUTED}`}>
            <li>Pravara Health Care HQ</li>
            <li>Nashik Road, Pravara Nagar</li>
            <li>Maharashtra 422101</li>
          </ul>
          {/* Contact Box: Dark gray background, dark border */}
          <div className={`mt-5 rounded-lg border ${BORDER_DARK} ${BG_ACCENT} p-4`}>
            <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${TEXT_MUTED}`}>Email & Support</p>
            <a
              href="mailto:support@pravarahealthcare.in"
              className={`mt-1 block text-sm font-bold ${TEXT_PRIMARY} hover:underline`}
            >
              support@pravarahealthcare.in
            </a>
            <p className={`mt-1 text-xs ${TEXT_MUTED}`}>+91 1800-123-4521</p>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="relative border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-[0.65rem] font-medium text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 sm:text-xs">
          <p>© {new Date().getFullYear()} Pravara Health Care. All rights reserved.</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a className="transition hover:text-indigo-600" href="#">
              Support Portal
            </a>
            <a className="transition hover:text-indigo-600" href="#">
              Status
            </a>
            <a className="transition hover:text-indigo-600" href="#">
              Accessibility
            </a>
=======
      {/* --- Bottom Bar --- */}
      {/* Bottom bar uses the accent dark gray background */}
      <div className={`border-t ${BORDER_DARK} ${BG_ACCENT}`}>
        <div className={`mx-auto flex max-w-screen-2xl flex-col items-center gap-3 px-4 py-6 text-xs ${TEXT_MUTED} sm:flex-row sm:justify-between sm:px-6 xl:px-16`}>
          <p>© {new Date().getFullYear()} Pravara Health Care. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className={`hover:${TEXT_PRIMARY} hover:underline`}>Support Portal</a>
            <a href="#" className={`hover:${TEXT_PRIMARY} hover:underline`}>Status</a>
            <a href="#" className={`hover:${TEXT_PRIMARY} hover:underline`}>Accessibility</a>
>>>>>>> 0a1b03ba285cbe54f278af5aca32eb877e1d042e
          </div>
        </div>
      </div>
    </footer>
  )
}