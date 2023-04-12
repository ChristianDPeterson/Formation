import React from "react";
import {
	Link as RouterLink,
	Outlet,
	useNavigate,
	Routes,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { useAuth } from "../../app/auth";
import styles from "./Navbar.module.css";
import cx from "classnames";
import {
	AppBar,
	Container,
	CssBaseline,
	Toolbar,
	Typography,
	Box,
	MenuItem,
	IconButton,
	Menu,
	Button,
	Tooltip,
	Avatar,
	Link,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
	{ name: "Home", href: "/home" },
	{ name: "Login", href: "/login" },
];
const settings = [
	{ name: "Profile", href: "/profile" },
	{ name: "Account", href: "/account" },
	{ name: "Logout", href: "/logout" },
];

function Navbar() {
	const auth = useAuth();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		// <header className={styles.navbar}>
		// 	<div className={styles.navbar__inner}>
		// 		<div className={styles.navbar__items}>
		// 			<h1>Formation</h1>
		// 			<li>
		// 				<Link to="/home">Home</Link>
		// 			</li>
		// 		</div>

		// 		<div
		// 			className={cx(
		// 				styles.navbar__items,
		// 				styles["navbar__items--right"]
		// 			)}
		// 		>
		// 			{auth.user ? (
		// 				<button
		// 					onClick={() => {
		// 						auth.signout(() => navigate("/"));
		// 					}}
		// 				>
		// 					Sign out
		// 				</button>
		// 			) : (
		// 				<Link to="/login">Login</Link>
		// 			)}
		// 		</div>
		// 	</div>
		// 	<Outlet />
		// </header>
		<AppBar position="static" sx={{ backgroundColor: "grey" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						FORMATION
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.href}
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">
										<Button
											component={RouterLink}
											to={page.href}
										>
											{page.name}{" "}
										</Button>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page.href}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Button component={RouterLink} to={page.href}>
									{page.name}{" "}
								</Button>
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt="Cemy Sharp"
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting.href}
									onClick={handleCloseUserMenu}
								>
									<Typography textAlign="center">
										<Button
											component={RouterLink}
											to={setting.href}
										>
											{setting.name}{" "}
										</Button>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
