import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  base: "/",
  integrations: [mdx(), sitemap(), preact(), tailwind(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});

