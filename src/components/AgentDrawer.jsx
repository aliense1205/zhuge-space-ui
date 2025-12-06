// src/components/AgentDrawer.jsx

import React from 'react';
import { LogOut, X, Clock, Settings } from 'lucide-react';

const AgentDrawer = ({ isOpen, onClose }) => {
  const logs = [
    { time: '14:05:22', agent: 'System', message: '服务启动，加载模型 M3-Agent-V2。', color: 'text-gray-400' },
    { time: '14:05:45', agent: 'Policy', message: '正在分析企业数据，匹配政策清单。', color: 'text-yellow-400' },
    { time: '14:06:01', agent: 'Talent', message: '任务：AI人才数据流请求成功。', color: 'text-green-400' },
    { time: '14:08:10', agent: 'System', message: 'Agent 间协同链路健康检查完毕。', color: 'text-gray-400' },
  ];

  return (
    <>
      {/* 浮层背景 (点击关闭) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40" 
          onClick={onClose} 
        ></div>
      )}

      {/* 抽屉主体 */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 h-1/2 bg-gray-900 rounded-t-2xl shadow-2xl z-50
          transform transition-transform duration-500 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* 头部控制区 */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-400" />
              Agent 实时日志 (Demo)
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 日志内容区 */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-3">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start text-sm font-mono leading-relaxed">
                <Clock className={`w-4 h-4 mr-3 mt-1 ${log.color}`} />
                <span className="flex-shrink-0 mr-4 text-gray-500">{log.time}</span>
                <div>
                    <span className="font-semibold" style={{ color: log.color }}>
                        [{log.agent}]:
                    </span> 
                    <span className="text-gray-300 ml-1">{log.message}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 底部操作 */}
          <div className="pt-4 border-t border-gray-700 mt-4 flex justify-end">
            <button className="flex items-center text-red-400 hover:text-red-500 transition">
                <LogOut className="w-4 h-4 mr-1" />
                停止服务
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDrawer;