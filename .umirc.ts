export default {
  npmClient: "pnpm",
  title: "学习训练营证书生成器",
  publicPath: process.env.NODE_ENV === "production" ? "/nice-21day/" : "/",
  extraBabelPlugins: [["import", { libraryName: "antd", style: true }]],
};
