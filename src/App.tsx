import "./App.css";

import { Outlet } from "react-router-dom";

import { Appbar } from "@barrel";
import { CssBaseline } from "@mui/material";

function App() {
	return (
		<>
			<CssBaseline />
			<Appbar />
			<Outlet />
		</>
	);
}

export { App };

