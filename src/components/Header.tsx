// type definition
import type { NavLinks, HeaderProps } from "../../types";

// reusable button component
import { Button } from "@/components/ui/button";

// lucide icons
import { Backpack, Earth, Plane, Hotel, House, Menu, X } from "lucide-react";

// react router navlink
import { NavLink } from "react-router";

import { useState } from "react";

const navLinks: NavLinks = [
  {
    icon: <Backpack />,
    linkTo: "/travel",
    label: "Travel",
  },
  {
    icon: <Earth />,
    linkTo: "/travel/explore",
    label: "Explore",
  },
  {
    icon: <Plane />,
    linkTo: "/travel/flight",
    label: "Flights",
  },
  {
    icon: <Hotel />,
    linkTo: "/travel/hotels",
    label: "Hotels",
  },
  {
    icon: <House />,
    linkTo: "/travel/vacation",
    label: "Vacation rentals",
  },
];

export default function Header({ navMenuColor, isDark }: HeaderProps) {
  const [showNav, setShowNav] = useState<boolean>(false);

  const showNavMobile = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <header className="sticky top-0 left-0 shadow-2xs w-full z-50 bordr-b">
      <nav
        style={{ background: navMenuColor }}
        className={`flex items-center justify-between h-16 px-8 max-w-7xl mx-auto max-sm:h-auto`}
      >
        {/* Menu Icon */}
        <span
          onClick={showNavMobile}
          className="p-2 rounded-full duration-200 cursor-pointer sm:hidden"
        >
          <Menu />
        </span>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-4">
          {navLinks.map((link, index) => (
            <NavLink to={link.linkTo} key={index}>
              <li key={index}>
                <Button variant={isDark ? "dark" : "white"} className="p-5">
                  <span className="text-[#2596be]">{link.icon}</span>
                  <p>{link.label}</p>
                </Button>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar Nav */}
      <div
        style={{ background: navMenuColor }}
        className={`fixed top-0 left-0 h-full w-[80%] shadow-lg transform transition-transform duration-300 z-50 sm:hidden ${
          showNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <p className="text-lg font-bold">Menu</p>
          <span
            onClick={showNavMobile}
            className="p-2 rounded-full duration-200 cursor-pointer"
          >
            <X />
          </span>
        </div>
        <ul className="flex flex-col gap-2 p-4">
          {navLinks.map((link, index) => (
            <NavLink to={link.linkTo} key={index} onClick={showNavMobile}>
              <li key={index}>
                <Button
                  variant={`ghost`}
                  className={`w-full justify-start gap-3`}
                >
                  <span className="text-[var(--icon-color)]">{link.icon}</span>
                  <p>{link.label}</p>
                </Button>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </header>
  );
}
