import { Flex, Heading } from "@chakra-ui/react";
import { NavbarLinks } from "./NavbarLinks";

export function Navbar(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justifyContent="space-between"
      w="100%"
      mb={8}
      p={8}>
      <Heading>Formation</Heading>
      <NavbarLinks />
    </Flex>

  );
}
