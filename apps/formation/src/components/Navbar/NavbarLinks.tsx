import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";

export function NavbarLinks() {
  return (
    <Stack spacing={8} direction="row">
      <NavLink to="/forms">Forms</NavLink>
      <NavLink to="/account">Account</NavLink>
    </Stack>
  )
}

