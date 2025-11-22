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
            Empowering Pravara Health Care teams with real-time employee intelligence, payroll transparency, and operational alignment.
          </p>
          
          {/* Social Icons: Inverted colors for dark mode */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${BORDER_DARK} ${BG_ACCENT} ${TEXT_MUTED} transition-colors hover:border-white hover:bg-white hover:text-black`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? `font-semibold text-white` // Active link is white
                      : `text-[#A3A3A3] hover:text-white hover:underline` // Inactive links are light gray, hover to white
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Policies --- */}
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider ${TEXT_PRIMARY}`}>Policies</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`${TEXT_MUTED} hover:text-gray-900 hover:underline`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

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
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      {/* Bottom bar uses the accent dark gray background */}
      <div className={`border-t ${BORDER_DARK} ${BG_ACCENT}`}>
        <div className={`mx-auto flex max-w-screen-2xl flex-col items-center gap-3 px-4 py-6 text-xs ${TEXT_MUTED} sm:flex-row sm:justify-between sm:px-6 xl:px-16`}>
          <p> {new Date().getFullYear()} Pravara Health Care. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white hover:underline">Support Portal</a>
            <a href="#" className="hover:text-white hover:underline">Status</a>
            <a href="#" className="hover:text-white hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}