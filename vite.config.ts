// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 请将 'your-repo-name' 替换为您的 GitHub 仓库名称
const repoName = 'zhuge-space-ui'; 

export default defineConfig({
  plugins: [react()],
  // 设置基础路径，这是 GitHub Pages 部署的关键
  base: `/${repoName}/`, 
})