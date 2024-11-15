import { getCollection } from "astro:content";

//获取所有文章
async function getAllPosts() {
  const allPosts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return allPosts;
}
//获取所有文件，置顶优先，发布日期降序
export async function getSortedPosts() {
  const allPosts = await getAllPosts();
  return allPosts.sort((a, b) => {
    if (a.data.sticky !== b.data.sticky) {
      return b.data.sticky - a.data.sticky;
    } else {
      return b.data.date.valueOf() - a.data.date.valueOf();
    }
  });
}

//转为URL安全的slug，删除点，空格转为短横线，大写转为小写
export function slugify(text: string) {
  return text.replace(/\./g,'').replace(/\s/g,'-').toLowerCase()
}