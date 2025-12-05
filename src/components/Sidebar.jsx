// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { Menu, X, ChevronDown, LayoutDashboard, Database, Settings } from 'lucide-react';

// 模拟的导航链接数据
const navItems = [
  { name: '仪表盘', icon: LayoutDashboard, href: '#dashboard' },
  { 
    name: '数据管理', 
    icon: Database, 
    submenu: true,
    submenuItems: [
      { name: '表格视图', href: '#data/table' },
      { name: '表单视图', href: '#data/form' },
    ]
  },
  { name: '系统设置', icon: Settings, href: '#settings' },
];

// 单个导航链接组件
const NavLink = ({ item, isActive, toggleSubmenu }) => {
  const Icon = item.icon;

  if (item.submenu) {
    return (
      <div className="text-gray-300">
        <button
          onClick={toggleSubmenu}
          className={`w-full flex justify-between items-center p-3 rounded-lg transition duration-200 
            ${isActive ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-700 hover:text-white'}`}
        >
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-3" />
            {item.name}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
        </button>
        
        {/* 子菜单内容 */}
        {isActive && (
          <div className="pl-8 pt-2 space-y-1">
            {item.submenuItems.map(subItem => (
              <a 
                key={subItem.name} 
                href={subItem.href}
                className="block p-2 text-sm rounded-lg text-gray-300 hover:bg-indigo-700 hover:text-white transition duration-200"
              >
                {subItem.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a 
      href={item.href}
      className={`flex items-center p-3 rounded-lg transition duration-200 text-gray-300
        ${isActive ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-700 hover:text-white'}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {item.name}
    </a>
  );
};

const Sidebar = () => {
  // 侧边栏状态：移动端控制开/关
  const [isOpen, setIsOpen] = useState(false);
  // 记录哪个子菜单处于打开状态
  const [activeSubmenu, setActiveSubmenu] = useState(null); 

  // 模拟当前活跃链接（在真实应用中会通过 React Router 或 URL 状态管理）
  const [activeLink, setActiveLink] = useState('#dashboard');

  const toggleSubmenu = (name) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <>
      {/* 1. 移动端汉堡菜单按钮 (仅在小屏幕显示) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white bg-indigo-600 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 2. 侧边栏主体 */}
      <div 
        className={`
          flex flex-col h-screen w-64 bg-gray-800 text-white shadow-xl
          fixed z-40 transition-transform duration-300 ease-in-out
          lg:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        
        {/* 顶部 Logo/标题 */}
        <div className="flex items-center justify-center h-20 bg-indigo-600">
          <span className="text-xl font-bold tracking-wider">Zhuge Space UI</span>
        </div>

        {/* 导航链接区域 */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isActive={item.submenu ? activeSubmenu === item.name : activeLink === item.href}
              toggleSubmenu={() => toggleSubmenu(item.name)}
            />
          ))}
        </nav>

        {/* 底部用户信息/版本号 (可选) */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          <p>Logged in as: Lynn</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>

      {/* 3. 移动端半透明背景覆盖 (仅在侧边栏打开时显示) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;