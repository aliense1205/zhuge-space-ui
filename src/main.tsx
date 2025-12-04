import React from 'react';
import ReactDOM from 'react-dom/client';
// 🚨 关键：导入我们刚刚重命名的新主组件 🚨
import AppFinal from './AppFinal.tsx';
import './index.css';

// 查找 HTML 中的根节点并渲染 AppFinal 组件
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppFinal />
  </React.StrictMode>
);
