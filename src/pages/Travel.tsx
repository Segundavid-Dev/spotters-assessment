// reusable components
import Header from "../components/Header";
import SearchBox from "../components/ui/search";

// type definition
import type { NavLinks } from "../../types";

// lucide icons
import { Earth } from "lucide-react";
import { Plane } from "lucide-react";
import { Hotel } from "lucide-react";
import { House } from "lucide-react";

const navLinks: NavLinks = [
  {
    icon: <Earth />,
    linkTo: "/",
    label: "Explore",
  },
  {
    icon: <Plane />,
    linkTo: "/",
    label: "Flights",
  },
  {
    icon: <Hotel />,
    linkTo: "/",
    label: "Hotels",
  },
  {
    icon: <House />,
    linkTo: "/",
    label: "Vacation rentals",
  },
];

export default function Travel() {
  return (
    <>
      <Header navMenuColor="#fff" />

      <div className="max-w-7xl mx-auto px-8">
        <img
          src="/travel/travel-hero.svg"
          alt="Travel hero image"
          className="w-full object-contain h-auto max-sm:h-38 max-sm:object-cover"
        />

        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl text-[var(--gray-color)] text-center font-medium">
            Travel
          </h1>
          <SearchBox />
          <ul className="flex sm:gap-3 lg:gap-5">
            {navLinks.map((el, index) => (
              <li
                key={index}
                className="text-gray-600 text-[14px] hover:bg-gray-200 p-3 space-y-3 rounded-md font-medium cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  {el.icon}
                </span>
                <p>{el.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
