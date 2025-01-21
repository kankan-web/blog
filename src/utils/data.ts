import type { ListItem } from "@/components/ArticleList.astro";
export function transformMenuData(data: ListItem[]) {
  const menu: any[] = [];

  // 遍历原始数据并按类别归类
  data.forEach((item: ListItem) => {
    // 检查是否已经有该类别
    let category = menu.find((cat) => cat.title === item.category);

    if (!category) {
      // 如果没有该类别，添加一级目录项
      category = { id: item.category, title: item.category, children: [] };
      menu.push(category);
    }

    // 添加二级目录项
    category.children.push({
      id: item.id,
      title: item.title,
    });
  });
  return menu;
}
