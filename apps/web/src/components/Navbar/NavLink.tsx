import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"

export function NavLink({ to = "/", children, ...props }: LinkProps) {
	return (
		<ChakraLink as={ReactRouterLink} to={to} {...props}>
			{children}
		</ChakraLink>
	)
}
