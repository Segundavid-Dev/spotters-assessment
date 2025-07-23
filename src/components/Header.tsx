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

// react router navlink
import { NavLink } from "react-router";

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
  return (
    <header className="sticky top-0 left-0 shadow-2xs w-full z-50">
      <nav className="bg-white h-18 flex items-center max-w-7xl mx-auto px-8">
        <ul className="flex gap-4">
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
