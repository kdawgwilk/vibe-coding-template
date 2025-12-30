import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				// Output as CommonJS with .cjs extension so Node.js treats it correctly
				// even with "type": "module" in package.json
				format: "cjs",
				entryFileNames: "[name].cjs",
			},
		},
	},
});
