import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface CustomLinkProps extends RouterLinkProps, Omit<MuiLinkProps, "color"> {}

const CustomLink = (props: CustomLinkProps) => {
	return <MuiLink component={RouterLink} {...props} />;
};

export { CustomLink };
