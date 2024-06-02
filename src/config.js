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
  name: "Kankan",
  title: "Web Developer",
  avatar: "/src/assets/img/avatar.jpg",
  bio: "Kankan's Blog",
  sns: [
    {
      name: "Github",
      icon: "ri-github-fill",
      link: "https://github.com/kankan-web",
    },
    {
      name: "Twitter",
    },
  ],
};

