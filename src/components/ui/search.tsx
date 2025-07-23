import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SearchBox() {
  // set automatic focus on input when component renders
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="relative">
        <span className="p-2 absolute top-2 left-2">
          <Search color="#202124" size={20} />
        </span>
        <input
          type="text"
          placeholder="search for flights, hotels and more"
          className="border text-[14px] rounded-full pl-[42px] py-[16px] w-[400px] shadow-lg"
          ref={inputRef}
        />
      </div>
    </div>
  );
}
