import React from 'react';
import { BarChart, Activity, Map, FileText, AlertCircle } from 'lucide-react';

const VisualStage = ({ visualState }) => {
  const { type, data } = visualState;

  // 渲染逻辑
  const renderContent = () => {
    switch (type) {
      // ===============================================
      // 1. 图表模式
      // ===============================================
      case 'chart':
      case 'line_chart':
        return (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 h-full flex flex-col text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="text-blue-400" /> 数据趋势分析
            </h3>
            <div className="flex-1 bg-black/20 rounded-xl flex items-center justify-center border border-dashed border-white/10 p-4">
               <p className="text-slate-400 text-sm">图表渲染模块 (ECharts) 待接入</p>
            </div>
          </div>
        );

      // ===============================================
      // 2. 表格模式 (🟢 核心修复：精准匹配标题)
      // ===============================================
      case 'table':             
      case 'investment_table':  // 对应 Python 的 investment_agent
      case 'policy_table':      // 对应 Python 的 policy_agent
        
        // 🟢 1. 标题控制中心
        let title = "数据分析报告";
        let titleColor = "text-cyan-300";
        let iconColor = "text-cyan-400";
        
        // 根据后端发来的 type 决定显示什么字
        if (type === 'policy_table') {
            title = "高新政策红利分析表";  // 👈 只要是 policy_table，必须显示这个
            titleColor = "text-orange-300";
            iconColor = "text-orange-400";
        } else if (type === 'investment_table') {
            title = "产业链企业分析报表";
            titleColor = "text-cyan-300";
            iconColor = "text-cyan-400";
        }

        const tableRows = Array.isArray(data) ? data : [];

        return (
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 h-full overflow-hidden flex flex-col text-white shadow-2xl">
            {/* 动态标题 */}
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${titleColor}`}>
              <FileText className={iconColor} /> {title}
            </h3>
            
            {/* 表格容器 */}
            <div className="flex-1 overflow-auto rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900/50 text-blue-200 font-medium sticky top-0 backdrop-blur">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">指标名称 / 对象</th>
                    <th className="p-4">数值 / 详情</th>
                    <th className="p-4">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tableRows.length > 0 ? (
                    tableRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-slate-400">
                          {row.id || row.ID || String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="p-4 font-bold text-white">
                          {row['指标名称'] || row['企业名称'] || row.name || '-'}
                        </td>
                        <td className="p-4 text-cyan-300 font-mono">
                           {row['数值'] || row['匹配度'] || row.value || '-'}
                        </td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded text-xs ${
                             (row['状态'] === 'OFFLINE' || row['状态'] === 'Disabled') 
                             ? 'bg-red-500/20 text-red-400' 
                             : 'bg-green-500/20 text-green-400'
                           }`}>
                             {row['状态'] || row.status || 'Active'}
                           </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">
                        暂无数据
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      // ===============================================
      // 3. 地图模式
      // ===============================================
      case 'map':
        return (
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg h-full flex flex-col relative overflow-hidden border border-cyan-500/30">
            <h3 className="text-lg font-bold mb-4 z-10 flex items-center gap-2 text-cyan-400">
              <Map className="text-cyan-400" /> 地理空间视图
            </h3>
            <div className="flex-1 flex items-center justify-center border border-dashed border-cyan-500/20 rounded-xl bg-black/40">
               <p className="text-cyan-200/50 animate-pulse">正在从 GIS 系统调取图层...</p>
            </div>
          </div>
        );

      // ===============================================
      // 4. 默认/等待状态
      // ===============================================
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Activity size={32} className="opacity-50" />
            </div>
            <p className="text-lg font-light tracking-widest">等待指令...</p>
            <p className="text-xs mt-2 opacity-40 font-mono">System Ready</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 h-full p-4 transition-all duration-500">
      {renderContent()}
    </div>
  );
};

export default VisualStage;