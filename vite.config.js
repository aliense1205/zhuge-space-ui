// ZhugeSpace_UI/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 仓库名
const repoName = 'zhuge-space-ui'; 

export default defineConfig({
  plugins: [react()],
  
  // 1. 设置 Pages 基础路径
  base: `/${repoName}/`, 

  // 2. 🚀 关键：设置构建输出目录为 'docs'
  build: {
    outDir: 'docs', 
  },
})