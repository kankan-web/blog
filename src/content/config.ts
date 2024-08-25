import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(), //文章标题
    date: z.date(), //文章日期
    description: z.string(), //文章描述
    cover: z.string().optional(), //封面
    category: z.string().optional(), //分类
    tags: z.array(z.string()).default([]), //标签
    // Transform string to Date object
    pubDate: z.coerce.date(), //文章发布日期
    updatedDate: z.coerce.date().optional(), //文章更新日期
    heroImage: z.string().optional(), //文章封面
    draft: z.boolean().default(false), //是否为草稿，true：为草稿，false：不为草稿
    sticky: z.number().default(0), //是否为置顶
  }),
});

export const collections = { blog };

