import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@hooks/useAuthStatus";
import { AnalyticsSharp } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Appbar = () => {
	const location = useLocation();

	const isPathOnAuth = location.pathname === "/login" || location.pathname === "/signup";
	const user = useAuth();

	const pages = [
		{ name: "CPU", to: "/cpu" },
		{ name: "DISK", to: "/disk" },
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<AnalyticsSharp sx={{ mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							color: "inherit",
							textDecoration: "none",
						}}>
						Scheduling
					</Typography>
					{!isPathOnAuth && (
						<>
							<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
								{pages.map((page) => (
									<Link key={page.name} to={page.to}>
										<Button sx={{ my: 2, color: "white", display: "block" }}>{page.name}</Button>
									</Link>
								))}
							</Box>
							{user ? (
								<Link
									to="/logout"
									style={{ marginLeft: "auto", color: "inherit", textDecoration: "none" }}>
									<Button color="inherit">Logout</Button>
								</Link>
							) : (
								<Link
									to="/login"
									style={{ marginLeft: "auto", color: "inherit", textDecoration: "none" }}>
									<Button color="inherit">Login</Button>
								</Link>
							)}
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export { Appbar };
