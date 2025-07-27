import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
		dts({ rollupTypes: true, tsconfigPath: "./tsconfig.json" }),
	],
	build: {
		minify: true,
		sourcemap: false,
		lib: {
			entry: resolve(__dirname, "src/index.tsx"),
			name: "ratti",
			fileName: (format) => `ratti.${format}.js`,
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", /^react\/.*/, "react-dom", /react-dom\/.*/],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
