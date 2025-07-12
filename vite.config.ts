// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(() => {
  const isContent = process.env.BUILD_TARGET === "content";

  return {
    plugins: [react()],
    build: {
      emptyOutDir: !isContent,
      rollupOptions: {
        input: isContent
          ? resolve(__dirname, "src/content/main.tsx")
          : {
              popup: resolve(__dirname, "index.html"),
              background: resolve(__dirname, "src/background.ts"),
            },
        output: {
          entryFileNames: `[name].js`,
          inlineDynamicImports: isContent,
        },
      },
      cssCodeSplit: false,
      outDir: "dist",
    },
  };
});
