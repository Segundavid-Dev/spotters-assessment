// type definition
import type { NavLinks } from "../../types";

// reusable button component
import { Button } from "@/components/ui/button";

// lucide icons
import { Backpack } from "lucide-react";
import { Earth } from "lucide-react";
import { Plane } from "lucide-react";
import { Hotel } from "lucide-react";
import { House } from "lucide-react";
import { Menu } from "lucide-react";

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

export default function Header() {
  const [showNav, setShowNav] = useState<boolean>(false);

  const showNavMobile = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <header className="sticky top-0 left-0 shadow-2xs w-full z-50 max-sm:absolute">
      <nav className="bg-white h-16 flex items-center max-w-7xl mx-auto px-8 max-sm:h-screen max-sm:w-[80%] max-sm:mx-0 max-sm:block">
        <span
          onClick={showNavMobile}
          className="mr-5 hover:bg-[var(--secondary)] p-2 rounded-full duration-200 cursor-pointer"
        >
          <Menu />
        </span>

        <ul className="flex gap-4 max-sm:flex-col">
          {navLinks.map((link, index) => (
            <NavLink to={link.linkTo} key={index}>
              <li key={index}>
                <Button variant={"white"} className="p-5">
                  <span className="text-[var(--icon-color)]">{link.icon}</span>
                  <p>{link.label}</p>
                </Button>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}
