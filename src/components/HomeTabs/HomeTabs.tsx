import { Link, LinkProps as RouterLinkProps, useLocation } from "react-router-dom";

import { Tab, TabProps, Tabs } from "@mui/material";

const LinkTab = (props: RouterLinkProps & TabProps) => {
	return <Tab component={Link} {...props} />;
};

const HomeTabs = () => {
	const location = useLocation();
	console.log(location);

	const tabs = [
		{ label: "CPU", to: "/scheduling/cpu" },
		{ label: "DISK", to: "/scheduling/disk" },
	];

	function getIndexFromPath() {
		const path = splitPath(location.pathname);
		return tabs.findIndex((tab) => splitPath(tab.to) === path);
	}

	function splitPath(path: string) {
		const split = path.split("/");
		return split[split.length - 1];
	}

	return (
		<Tabs
			value={getIndexFromPath()}
			aria-label="nav tabs"
			role="navigation"
			sx={{
				borderBottom: 2,
				borderColor: "divider",
			}}>
			{tabs.map((tab) => (
				<LinkTab
					key={tab.label}
					label={tab.label}
					to={tab.to}
					sx={{
						flexGrow: 0.25,
					}}
				/>
			))}
		</Tabs>
	);
};

export { HomeTabs };
