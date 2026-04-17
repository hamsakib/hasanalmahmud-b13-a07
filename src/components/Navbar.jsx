import { NavLink } from "react-router-dom";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const TimelineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);
const StatsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);

const navLinks = [
  { to: "/",         label: "Home",     icon: <HomeIcon />     },
  { to: "/timeline", label: "Timeline", icon: <TimelineIcon /> },
  { to: "/stats",    label: "Stats",    icon: <StatsIcon />    },
];

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-[#e6ede9]"
      style={{ boxShadow: "0 1px 4px rgba(26,58,42,0.07)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[58px]">
          <NavLink to="/">
            <span className="text-[1.1rem] font-extrabold text-[#1a2e22] tracking-tight">KeenKeeper</span>
          </NavLink>
          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-[6px] rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#1a3a2a] text-white"
                      : "text-[#5a7a68] hover:text-[#1a2e22] hover:bg-[#f0f5f2]"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
