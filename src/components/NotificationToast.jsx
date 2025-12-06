// src/components/NotificationToast.jsx

import React from 'react';
import { Download, X } from 'lucide-react';

const NotificationToast = ({ show, onClose }) => {
  return (
    <div 
      className={`
        fixed bottom-24 right-4 max-w-xs transition-all duration-500 z-50
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-white p-4 rounded-xl shadow-2xl border border-indigo-100">
        <div className="flex items-start gap-3">
          {/* AI 建议气泡图标 */}
          <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0 text-lg">🤖</div>
          
          <div>
            <h4 className="font-bold text-gray-800 text-sm">政策申报 Agent</h4>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              检测到企业符合《高企补贴》，预计金额 20 万。已为您生成申报材料。
            </p>
            <button 
              onClick={() => alert('下载成功！')} 
              className="text-xs text-indigo-600 font-bold mt-2 hover:underline"
            >
              立即下载 PDF
            </button>
          </div>
          
          {/* 关闭按钮 */}
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;