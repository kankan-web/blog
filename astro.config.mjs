import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  base: "/",
  integrations: [mdx(), sitemap(), react(), tailwind(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});

