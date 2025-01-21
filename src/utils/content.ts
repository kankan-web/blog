import { getCollection } from "astro:content";

type CollectionType = "javascript" | "network" | "react";

// 获取所有文章
export async function getAllPosts(type: CollectionType) {
  const allPosts = await getCollection(type, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return allPosts;
}

//获取所有文章，置顶优先，发布日期降续
export async function getSortedPosts(type: CollectionType) {
  const allPosts = await getAllPosts(type);
  return allPosts.sort((a, b) => {
    if (a.data.sticky !== b.data.sticky) {
      return b.data.sticky - a.data.sticky;
    } else {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }
  });
}
