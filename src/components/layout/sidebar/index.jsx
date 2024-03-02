import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { RxCalendar, RxComponent1, RxHome } from "react-icons/rx";
import { LuBookmark, LuHammer } from "react-icons/lu";
import RecentTopics from "./RecentTopics";

const Sidebar = () => {
  const {
    userAuth: {
      user: { personal_data: { name, profile_img } = {}, joinedAt } = {},
    },
  } = useUserContext();

  const navLinks = [
    { route: "/", name: "home", icon: <RxHome />, reloadDocument: true },
    { route: `${name}/savedPosts`, name: "Saved Posts", icon: <LuBookmark /> },
    { route: "/topics", name: "topics", icon: <RxComponent1 /> },
  ];

  return (
    <aside className="relative hidden max-w-xs transition-opacity duration-200 shrink-0 md:flex md:w-64 xl:-mr-4 xl:w-full lg:justify-end">
      <div className="fixed bottom-0 z-10 flex-col justify-between py-0 rounded-lg h-fit top-28 animate-slideRight bg-primary-foreground bg-main-background xs:top-0 xs:h-full xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72">
        <div className="flex flex-col justify-between px-6 py-10">
          <Link
            reloadDocument
            to={`/${name}`}
            className="flex justify-between p-3 space-x-4 rounded-xl hover:bg-popover"
          >
            <Avatar>
              <AvatarImage src={profile_img} />
              <AvatarFallback delayMs={600}>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold capitalize">@{name}</h4>

              <div className="flex items-center pt-1">
                <RxCalendar className="w-4 h-4 mr-2 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  {"Joined " +
                    new Date(joinedAt).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>
            </div>
          </Link>

          <RecentTopics />

          <nav className="my-5">
            <ul className="flex flex-col gap-5">
              {navLinks.map((navItem) => {
                return (
                  <li className="flex capitalize group" key={navItem.name}>
                    <NavLink
                      className="flex items-center flex-1 w-full gap-3 px-4 py-2 rounded-lg group-hover:bg-secondary"
                      to={navItem.route}
                      reloadDocument={navItem.reloadDocument}
                    >
                      {navItem.icon}
                      {navItem.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
