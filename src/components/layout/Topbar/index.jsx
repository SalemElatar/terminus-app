import { Link } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import { Button } from "@ui/button";
import { ThemeToggle } from "./ThemeToggle";
import TopSearchInput from "./TopSearchInput";
import AccountDropDown from "./AccountDropDown";
import Badge from "@/components/common/badge";
import { LuTrain } from "react-icons/lu";

const Topbar = () => {
  const {
    userAuth: { accessToken },
  } = useUserContext();

  return (
    <header className="sticky top-0 z-50 mb-4 bg-background">
      <nav className="container relative flex items-center justify-between h-16">
        <h1 className="text-2xl font-bold tracking-widest uppercase">
          <Link to="/" className="flex items-center gap-2">
            <LuTrain />
            Terminus
          </Link>
        </h1>

        <TopSearchInput />

        <Badge variant="outline" className="hidden md:block">
          {document.title.split("-")[0]}
        </Badge>

        <ThemeToggle />

        {accessToken ? (
          <AccountDropDown />
        ) : (
          <Button variant="outline">
            <Link to="/sign-in" state={{ from: "main page" }}>
              Sign In
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Topbar;
