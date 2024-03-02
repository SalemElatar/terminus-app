import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { LuSearch } from "react-icons/lu";

const TopSearchInput = () => {
  const [showInputSm, setShowInputSm] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="w-64">
        <SearchInput />
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Label
          htmlFor="home_search_input"
          className={`cursor-pointer lg:invisible lg:data-[state=open]:bg-green-400 p-2 rounded-lg  ${
            showInputSm ? "bg-accent" : ""
          }`}
          onClick={() => {
            setShowInputSm((prevState) => !prevState);
          }}
        >
          <LuSearch />
        </Label>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => e.preventDefault()}
        className="bg-transparent border-none md:-translate-y-1/2"
      >
        <SearchInput />
      </PopoverContent>
    </Popover>
  );
};

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative">
      <Popover open={searchTerm.length >= 3}>
        <PopoverTrigger asChild>
          <Input
            id="home_search_input"
            type="text"
            placeholder="Search topic..."
            className="w-full px-4 py-2 m-0 md:block"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </PopoverTrigger>
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} asChild>
          <Button
            variant="link"
            className="px-3 py-4 rounded-lg w-72 bg-popover"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            <Link to={`/topics/search?title=${searchTerm}`}>
              <span className="text-sm text-popover-foreground">search: </span>
              <span className="underline text-popover-foreground">
                {searchTerm}
              </span>
            </Link>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TopSearchInput;
