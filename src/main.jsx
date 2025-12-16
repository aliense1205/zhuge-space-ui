// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 🟢 确保引入的是你的核心驾驶舱文件
import AppFinal from './AppFinal.tsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppFinal />
  </StrictMode>,
)