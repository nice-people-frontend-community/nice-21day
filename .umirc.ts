export default {
  npmClient: "pnpm",
  title: "学习训练营证书生成器",
  base: process.env.NODE_ENV === "production" ? "/nice-21day/" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/nice-21day/" : "/",
  extraBabelPlugins: [["import", { libraryName: "antd", style: true }]],
};
