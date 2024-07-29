import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@barrel": "/src/components/barrel.ts",
			"@assets": "/src/assets/",
			"@utils": "/src/utils/",
			"@config": "/src/config/",
			"@hooks": "/src/hooks/",
		},
	},
	build: {
		sourcemap: true,
	},
});

