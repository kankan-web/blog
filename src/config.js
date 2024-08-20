//头部导航数据
export const navBarConfig = [
  {
    name: "首页",
    url: "/",
  },
  {
    name: "Blog",
    url: "/blog/",
  },
  {
    name: "更新日志",
    url: "/log/",
  },
  {
    name: "关于",
    url: "/about/",
  },
  {
    name: "Github",
    url: "https://github.com/kankan-web", //内部链接不应包括基本路径，因为它会自动添加
    external: true, //显示外部链接图标，并在新标签页中打开
  },
];
//个人资料信息
export const profileConfig = {
  sayhi: "不要太劳累了，早睡更健康",
  name: "蛋蛋",
  avatar: "/src/assets/img/avatar.jpg", //头像
  bio: "生活明朗 万物可爱",
  //链接地址
  links: [
    {
      name: "Github",
      icon: "github",
      link: "https://github.com/kankan-web",
    },
    {
      name: "语雀",
      icon: "yuque",
      link: "https://www.yuque.com/kankan-web",
    },
  ],
};

