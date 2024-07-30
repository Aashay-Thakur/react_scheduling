import "./App.css";

import { Outlet } from "react-router-dom";

import { Appbar } from "@barrel";
import { Box, CssBaseline } from "@mui/material";

function App() {
	return (
		<>
			<CssBaseline />
			<Appbar />
			<Box sx={{ p: 5 }}>
				<Outlet />
			</Box>
		</>
	);
}

export { App };

