// ZhugeSpace_UI/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 仓库名
const repoName = 'zhuge-space-ui'; 

export default defineConfig({
  plugins: [react()],
  // base 路径使用全小写仓库名
  base: `/${repoName}/`, 
})