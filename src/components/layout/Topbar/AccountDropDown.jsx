import * as Dropdown from "@ui/dropdown-menu";
import * as Dialog from "@ui/alert-dialog";
import { ImProfile } from "react-icons/im";
import { LuLogOut, LuSettings, LuNewspaper } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";

const AccountDropDown = () => {
  const {
    userAuth: { user: { personal_data: { name } = {} } = {} },
    setUserAuth,
  } = useUserContext();

  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("userSession");
    setUserAuth({ accessToken: null });
    navigate("/sign-in");
  };

  return (
    <Dialog.AlertDialog>
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger className="transition focus-visible:outline-none data-[state=open]:rotate-90">
          <LuSettings size={25} />
        </Dropdown.DropdownMenuTrigger>

        <Dropdown.DropdownMenuContent
          sideOffset={15}
          className="w-56"
          align="end"
        >
          <Dropdown.DropdownMenuLabel>My Account</Dropdown.DropdownMenuLabel>

          <Dropdown.DropdownMenuItem asChild>
            <Link to="/topics/new-topic">
              <LuNewspaper /> create topic
            </Link>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem asChild>
            <Link to="/profile">
              <ImProfile /> Profile
            </Link>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem asChild>
            <Link to="/settings">
              <LuSettings />
              Settings
            </Link>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuSeparator />

          <Dialog.AlertDialogTrigger className="w-full cursor-pointer" asChild>
            <Dropdown.DropdownMenuItem>
              <LuLogOut />
              <h3 className="text-sm">Sign Out </h3>
              <p className="text-xs font-light">@{name}</p>
            </Dropdown.DropdownMenuItem>
          </Dialog.AlertDialogTrigger>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>

      <Dialog.AlertDialogContent>
        <Dialog.AlertDialogHeader>
          <Dialog.AlertDialogTitle>Are you sure?</Dialog.AlertDialogTitle>
          <Dialog.AlertDialogDescription>
            you are signing out your account
          </Dialog.AlertDialogDescription>
        </Dialog.AlertDialogHeader>
        <Dialog.AlertDialogFooter>
          <Dialog.AlertDialogCancel>Cancel</Dialog.AlertDialogCancel>
          <Dialog.AlertDialogAction
            variant="destructive"
            onClick={handleSignOut}
          >
            Continue
          </Dialog.AlertDialogAction>
        </Dialog.AlertDialogFooter>
      </Dialog.AlertDialogContent>
    </Dialog.AlertDialog>
  );
};

export default AccountDropDown;
