module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('@tailwindcss/postcss'), // 切换到 V3 推荐的插件
    require('autoprefixer'),
  ],
};