// src/App.jsx

import React from 'react';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import FormComponent from './components/FormComponent'; // 【新增导入】

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* 侧边栏组件 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <main className="flex-1 p-8 lg:ml-64 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          数据管理中心
        </h1>
        
        {/* 数据表格组件 */}
        <DataTable />

        {/* 表单组件 - 增加顶部边距 */}
        <div className="mt-12">
            <FormComponent /> 
        </div>

        <div className="mt-8 mb-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">项目状态说明</h2>
          <p className="text-gray-600">
            您的 UI 框架现已拥有核心组件：导航、表格和表单。
          </p>
        </div>
      </main>
      
    </div>
  );
}

export default App;