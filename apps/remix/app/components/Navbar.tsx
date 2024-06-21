import { Link } from "@remix-run/react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className="text-xl" to="/">
              Formation
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {isLoggedIn ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/tables">Tables</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/logout">Logout</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/login">Login.</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/register">Get started.</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
