import React, { useState, useEffect } from 'react'; 

// ==========================================
// A. Types Definitions & Global Setup
// ==========================================

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface DataNodeProps {
    top: string;
    left?: string;
    right?: string;
    color: string;
    label: string;
    size?: string;
}

interface ImageErrorEvent extends React.SyntheticEvent<HTMLImageElement> {
    target: EventTarget & HTMLImageElement;
}

const ASSETS = {
  BG_IMAGE: `${import.meta.env.BASE_URL}3.jpg`,
  BG_IMAGE_SMART: `${import.meta.env.BASE_URL}1.jpg`
};

const GlobalStyles = () => (
  <style>
    {`
      @keyframes scan-vertical {
        0% { transform: translateY(-2px); } 
        100% { transform: translateY(100vh); } 
      }
    `}
  </style>
);

// ==========================================
// B. Components: Icons
// ==========================================
const IconWrapper: React.FC<IconProps> = ({ children, className, style }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', minWidth: '24px', ...style }} className={className}>{children}</svg>
);

const Icons = {
  Cpu: (p: IconProps) => <IconWrapper {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1V4" /><path d="M15 1V4" /><path d="M9 20V23" /><path d="M15 20V23" /><path d="M20 9H23" /><path d="M20 14H23" /><path d="M1 9H4" /><path d="M1 14H4" /></IconWrapper>,
  ShieldCheck: (p: IconProps) => <IconWrapper {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></IconWrapper>,
  Lock: (p: IconProps) => <IconWrapper {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconWrapper>,
  Scan: (p: IconProps) => <IconWrapper {...p}><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></IconWrapper>,
  LayoutGrid: (p: IconProps) => <IconWrapper {...p}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></IconWrapper>,
  Search: (p: IconProps) => <IconWrapper {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></IconWrapper>,
  Bell: (p: IconProps) => <IconWrapper {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></IconWrapper>,
  ChevronRight: (p: IconProps) => <IconWrapper {...p}><path d="m9 18 6-6-6-6" /></IconWrapper>,
  Activity: (p: IconProps) => <IconWrapper {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></IconWrapper>,
  ClipboardCheck: (p: IconProps) => <IconWrapper {...p}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></IconWrapper>,
  Server: (p: IconProps) => <IconWrapper {...p}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></IconWrapper>,
  FileText: (p: IconProps) => <IconWrapper {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></IconWrapper>,
  Coffee: (p: IconProps) => <IconWrapper {...p}><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></IconWrapper>,
  Calendar: (p: IconProps) => <IconWrapper {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></IconWrapper>,
  Globe: (p: IconProps) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></IconWrapper>,
  MessageCircle: (p: IconProps) => <IconWrapper {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></IconWrapper>,
  Video: (p: IconProps) => <IconWrapper {...p}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></IconWrapper>, 
  Bot: (p: IconProps) => <IconWrapper {...p}><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></IconWrapper>,
  UserCheck: (p: IconProps) => <IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></IconWrapper>,
  FilePen: (p: IconProps) => <IconWrapper {...p}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></IconWrapper>
};

// ==========================================
// C. Components: Shared Helpers
// ==========================================

// 辅助组件：通用键值对，用于卡片内部的对齐
const KVPairGrow: React.FC<{k: string, v: React.ReactNode, vColor?: string}> = ({ k, v, vColor = 'text-white' }) => (
    <div className="flex justify-between items-start text-xs">
        <span className="text-gray-400 flex-grow whitespace-nowrap">{k}:</span>
        <span className={`text-right font-bold ${vColor}`}>{v}</span>
    </div>
);


// ==========================================
// 2. Scene: Cockpit (驾驶舱)
// ==========================================
const SceneCockpit = () => {
    // 🔔 HOOKS: 模拟实时数据获取 (需要替换为实际 API 调用)
    const [gpuLoad, setGpuLoad] = useState(82);
    const [healthIndex, setHealthIndex] = useState(98.5);
    const [performance, setPerformance] = useState(75);

    useEffect(() => {
        const interval = setInterval(() => {
            // GPU 负荷 (75% - 95%)
            const newGpuLoad = Math.min(95, Math.max(75, 85 + (Math.random() - 0.5) * 10));
            setGpuLoad(Math.round(newGpuLoad));

            // 健康度 (95.0 - 99.9)
            const newHealth = Math.min(99.9, 97 + (Math.random() * 3));
            setHealthIndex(Math.round(newHealth * 10) / 10);

            // 性能负荷 (70 - 85)
            const newPerformance = Math.min(85, 78 + (Math.random() * 7));
            setPerformance(Math.round(newPerformance));
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const gpuWidth = `${gpuLoad}%`;
    const loadColor = gpuLoad > 90 ? 'red' : gpuLoad > 80 ? 'orange' : 'cyan';
    const loadColorTailwind = `text-${loadColor}-400`;
    const progressColorTailwind = `bg-${loadColor}-500`;
    const healthColor = healthIndex < 97 ? 'orange' : 'green';

    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden text-white group select-none">
            {/* 背景层 */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                <div className="w-full h-full">
                <img 
                    src={ASSETS.BG_IMAGE} 
                    alt="全域视角" 
                    className="w-full h-full object-cover opacity-60 filter grayscale-[0.3] contrast-125 brightness-75" 
                    onError={(e: ImageErrorEvent) => { e.target.style.display='none'; if (e.target.parentElement) e.target.parentElement.style.backgroundColor='#1E293B'; }} 
                />
                </div>
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="absolute left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"/> 
            </div>

            {/* UI层 */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
            
            {/* 💚 垂直扫描线效果 */}
            <div className="absolute top-0 left-0 w-full h-[2px] z-50 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(to right, transparent, rgba(52, 211, 153, 0.8), transparent)',
                animation: 'scan-vertical 3s infinite linear',
                animationTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)'
            }}></div>
            
            <div className="flex justify-between items-start">
                {/* 左上角标题 */}
                <div className="animate-in slide-in-from-top fade-in duration-700">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></span>
                        <span className="text-xs font-mono text-orange-400 tracking-widest">REAL-TIME MONITOR</span>
                    </div>
                    <h2 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-md">
                        诸葛空间·园区全域 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">态势感知</span>
                    </h2>
                </div>
            </div>

            {/* 悬浮点：可信区 (保持不变) */}
            <div className="absolute top-[30%] left-[20%] flex items-center gap-2 z-50">
                <div className="relative">
                    <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-ping"></div>
                    <Icons.ShieldCheck className="w-6 h-6 text-red-400 bg-black/50 rounded-full p-1 border border-red-500" />
                </div>
                <div className="bg-black/70 backdrop-blur px-3 py-1 border-l-2 border-red-500 text-xs">
                    <div className="font-bold text-red-400">可信数据物理隔离域</div>
                    <div className="text-[10px] text-gray-300">安防状态: 严密</div>
                </div>
            </div>
            
            {/* 悬浮点：产业园区智能助手 (右侧顶部) - 【已优化：宽度W-[260px]，自适应对齐】 */}
            <div className="absolute top-[15%] right-[10%] w-[260px] bg-black/80 backdrop-blur-md p-3 rounded-lg border border-indigo-500/50 shadow-lg z-50">
                <div className="flex items-center gap-2 mb-3">
                    <Icons.Bot className="w-5 h-5 text-indigo-400" />
                    <div className="font-bold text-indigo-300 text-sm whitespace-nowrap">产业园区智能助手</div>
                </div>
                <div className="space-y-2">
                    <KVPairGrow k="总可入住面积" v="120 万㎡" vColor="text-cyan-300 font-bold" />
                    <KVPairGrow k="已入住面积" v="85%" vColor="text-green-400 font-bold" />
                    <KVPairGrow k="入住企业数" v="328 家" />
                    <KVPairGrow k="年产值估算" v="¥ 86 亿" vColor="text-orange-400 font-bold" />
                </div>
            </div>

            {/* 悬浮点：诸葛产业军师 (右侧下方，已修复单行显示) */}
            <div className="absolute top-[35%] right-[10%] w-[260px] bg-black/80 backdrop-blur-md p-3 rounded-lg border border-emerald-500/50 shadow-lg z-50">
                <div className="flex items-center gap-2 mb-3">
                    <Icons.Cpu className="w-5 h-5 text-emerald-400" />
                    <div className="font-bold text-emerald-300 text-sm whitespace-nowrap">诸葛产业军师</div>
                </div>
                <div className="space-y-2">
                    <KVPairGrow k="核心产业分布" v="AI / 文创 / 生物医药" vColor="text-cyan-300" />
                    <KVPairGrow k="区域竞合对标" v="表现力 ↑ 4.5%" vColor="text-green-400" />
                    <KVPairGrow k="重点扶持政策" v="已推送 8 条" />
                    <KVPairGrow k="产业链断点预警" v="关注 2 环节点" vColor="text-orange-400" />
                </div>
            </div>

            {/* 悬浮点：弹性算力池核心 - (保持优化) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 flex flex-col items-center gap-2 z-50">
                <div className="relative">
                    <Icons.Server 
                        className={`w-8 h-8 ${loadColorTailwind} drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-500`} 
                    />
                </div>
                <div className="bg-black/70 backdrop-blur px-3 py-2 border border-cyan-500/30 rounded text-center">
                    <div className="font-bold text-white text-sm">弹性算力池核心</div>
                    <div className="w-24 h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                        <div 
                            className={`h-full ${progressColorTailwind} transition-all duration-1000`} 
                            style={{ width: gpuWidth }}
                        ></div>
                    </div>
                    <div className={`text-[10px] ${loadColorTailwind} mt-0.5 mb-1 font-bold transition-colors duration-500`}>
                        GPU 负荷: {gpuLoad}%
                    </div>
                    <div className="text-[10px] text-gray-300">可用节点: 24/130</div>
                </div>
            </div>

            {/* 悬浮点：路演厅 - 确认内容存在 (保持不变) */}
            <div className="absolute bottom-[30%] right-[15%] flex items-center gap-2 flex-row-reverse text-right z-50">
                <div className="relative">
                    <div className="absolute -inset-2 bg-orange-500/20 rounded-full animate-ping"></div>
                    <Icons.Activity className="w-6 h-6 text-orange-400 bg-black/50 rounded-full p-1 border border-orange-500" />
                </div>
                <div className="bg-black/70 backdrop-blur px-3 py-1 border-r-2 border-orange-500 text-xs">
                    <div className="font-bold text-orange-400">生态路演大厅</div>
                    <div className="text-[10px] text-gray-300">诸葛杯: 直播中</div>
                </div>
            </div>
            
            {/* 🌟 左下角核心指标仪表盘 (卡片宽度W-[260px]) */}
            <div className="absolute bottom-[20%] left-[5%] w-[260px] bg-black/80 backdrop-blur-md p-4 rounded-lg border border-cyan-500/50 shadow-lg z-50 animate-in slide-in-from-bottom fade-in duration-700">
                <div className="flex items-center gap-2 mb-3">
                    <Icons.Activity className="w-5 h-5 text-cyan-400" />
                    <div className="font-bold text-cyan-300 text-sm whitespace-nowrap">核心运行指标</div>
                </div>
                <div className="space-y-3 text-sm">
                    {/* 指标 1: 健康度 */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">系统健康度:</span>
                        <span className={`text-${healthColor}-400 font-mono text-lg font-bold transition-colors duration-1000`}>
                            {healthIndex}<span className="text-xs">%</span>
                        </span>
                    </div>
                    {/* 指标 2: 性能负荷 */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">应用性能负荷:</span>
                        <span className="text-cyan-300 font-mono text-lg font-bold transition-colors duration-1000">
                            {performance}<span className="text-xs">ms</span>
                        </span>
                    </div>
                    {/* 指标 3: 安全事件 */}
                    <div className="flex items-center justify-between pt-1">
                        <span className="text-gray-400">安全事件(24H):</span>
                        <span className="text-red-400 font-mono text-lg font-bold">
                            <span className="animate-pulse">3</span>
                        </span>
                    </div>
                </div>
            </div>


            {/* 底部信息 (保持不变) */}
            <div className="flex justify-between items-end">
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                <div>LAYER: <span className="text-white">DIGITAL_TWIN</span></div>
                </div>
            </div>
            </div>
        </div>
    );
};


// ==========================================
// 3. Scene: Smart Apps (智能应用)
// ==========================================
const SceneApps = () => {
  // 🔔 HOOKS: 模拟 Agent 状态获取
  const [recommendedCount, setRecommendedCount] = useState(30);
  const [lawStatus, setLawStatus] = useState<'online' | 'busy'>('online');

  useEffect(() => {
      const interval = setInterval(() => {
          // 人才推荐数每 1.5 秒增加 1-3
          setRecommendedCount(prev => prev + Math.floor(Math.random() * 3) + 1);

          // 法务 Agent 状态高频次切换 (每 1.5 秒)
          setLawStatus(prev => (prev === 'online' ? 'busy' : 'online'));

      }, 1500); 

      return () => clearInterval(interval);
  }, []);

  // 状态颜色定义 (避免 Tailwind 动态解析问题)
  const LAW_STATUS_MAP = {
      online: { text: 'text-green-400', indicator: 'bg-green-500', label: '在线' },
      busy: { text: 'text-orange-400', indicator: 'bg-orange-500 animate-pulse', label: '繁忙' }
  };
  const currentLaw = LAW_STATUS_MAP[lawStatus];

  // 政策 Agent 状态定义 (高频闪烁)
  const POLICY_STATUS_MAP = {
      online: { text: 'text-green-400', indicator: 'bg-green-500 animate-ping-slow', label: '服务中' },
      busy: { text: 'text-cyan-400', indicator: 'bg-cyan-500 animate-ping-slow', label: '分析中' }
  };
  const currentPolicy = POLICY_STATUS_MAP[lawStatus === 'online' ? 'online' : 'busy']; // 状态联动


  return (
    // 修正为更暗的背景色
    <div className="w-full h-full bg-gray-950 font-sans relative overflow-y-auto text-white">
      {/* ... (英雄区保持不变) ... */}
      <div className="relative w-full h-[65vh] bg-slate-900">
         <img 
           src={ASSETS.BG_IMAGE_SMART} 
           alt="大楼正面" 
           className="w-full h-full object-cover" 
           onError={(e: ImageErrorEvent) => { e.target.style.display='none'; if (e.target.parentElement) e.target.parentElement.style.backgroundColor='#1E293B'; }} 
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-900"></div>
         <div className="absolute top-0 w-full p-6 flex justify-between items-center text-white z-10">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">Z</div>
               <div className="flex flex-col">
                  <span className="font-bold tracking-widest text-sm leading-none">诸葛空间·智策</span>
                  <span className="text-[8px] text-blue-200 tracking-[0.2em] leading-none mt-1">ZHUGE·ZHICE OS</span>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition"><Icons.Search /></button>
               <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition"><Icons.Bell /></button>
            </div>
         </div>
         <div className="absolute bottom-16 left-0 w-full px-8 md:px-12 text-white">
            <div className="w-full">
               <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-lg">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
                  <span className="text-cyan-100 font-mono text-xs tracking-wide uppercase">Digital Base: Online</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-2xl">全栈式 AI 产业服务引擎</h1>
               <div className="text-xl md:text-2xl font-light text-blue-100 tracking-wide opacity-90">智算筑基 · 垂类创新驱动 · 生态共荣</div>
            </div>
         </div>
      </div>
      
      {/* Main Grid Container */}
      <div className="relative -mt-10 z-50 px-6 md:px-12 pb-24 grid grid-cols-1 md:grid-cols-3 gap-4">
         
         {/* 卡片 1 (保持不变) */}
         <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white group cursor-pointer hover:bg-slate-800 transition-colors border-t-4 border-orange-500 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span><span className="text-xs font-bold text-orange-400 uppercase">Happening Now</span></div>
            </div>
            <div className="mb-4 pb-4 border-b border-white/10">
               {/* 诸葛杯·创新挑战赛 */}
               <div className="flex justify-between items-start mb-1">
                   <h3 className="text-lg font-bold">诸葛杯·创新挑战赛</h3>
                   <div className="flex flex-col items-center gap-0.5 mt-0.5 group hover:bg-white/10 rounded p-1 transition-colors">
                       <button className="text-cyan-300 hover:text-cyan-200 transition">
                          <Icons.FilePen className="w-5 h-5"/>
                       </button>
                       <span className="text-[10px] text-cyan-300">报名</span>
                   </div>
               </div>
               <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-[85%]"></div></div>
               <p className="text-slate-400 text-xs mt-1 flex justify-between">
                  <span>328 支团队激战中</span>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">决赛</span>
               </p>
            </div>
            
            {/* 补充活动列表 */}
            <div className="space-y-3 pt-4 border-b border-white/10">
                <h4 className="text-sm font-semibold text-orange-400">近期热门活动</h4>
                <div className="flex justify-between items-center text-xs text-gray-300 hover:text-white transition">
                    <span className="truncate">AI 大模型产业峰会</span>
                    <span className="text-orange-300">本周六</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-300 hover:text-white transition">
                    <span className="truncate">文创企业技术分享会</span>
                    <span className="text-cyan-300">本月 20 日</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
               <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-3">全媒矩阵 · 直达链接</p>
               <div className="flex gap-4">
                   <button className="flex flex-col items-center gap-1 group/icon">
                       {/* Web Button */}
                       <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center group-hover/icon:bg-blue-600 group-hover/icon:text-white transition-all">
                           <Icons.Globe className="w-5 h-5 text-blue-400" />
                       </div>
                       <span className="text-[9px] text-slate-500 group-hover/icon:text-blue-400">Web</span>
                   </button>
                   <button className="flex flex-col items-center gap-1 group/icon">
                       {/* 微信 Button */}
                       <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center group-hover/icon:bg-green-600 group-hover/icon:text-white transition-all">
                           <Icons.MessageCircle className="w-5 h-5 text-green-400" />
                       </div>
                       <span className="text-[9px] text-slate-500 group-hover/icon:text-green-400">微信</span>
                   </button>
                   <button className="flex flex-col items-center gap-1 group/icon">
                       {/* 抖音 Button */}
                       <div className="w-10 h-10 rounded-full bg-black border border-pink-500/30 flex items-center justify-center group-hover/icon:bg-black transition-all relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-pink-500 to-yellow-500 opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
                           <Icons.Video className="w-5 h-5 text-pink-400 group-hover/icon:text-white relative z-10" />
                       </div>
                       <span className="text-[9px] text-slate-500 group-hover/icon:text-pink-400">抖音</span>
                   </button>
               </div>
            </div>
         </div>

         {/* 卡片 2 (保持不变) */}
         <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700 group hover:border-blue-600 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-blue-900/40 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><Icons.ClipboardCheck /></div>
               <Icons.ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors"/>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">垂类测评实验室/机器人训练场</h3>
            <p className="text-slate-400 text-sm mb-4">文创/具身智能模型专项评估</p>
            
            <div className="flex gap-2 flex-wrap">
               <span className="px-3 py-1 bg-blue-900/40 rounded text-xs text-blue-400 font-medium">文创 AIGC</span>
               <span className="px-3 py-1 bg-blue-900/40 rounded text-xs text-blue-400 font-medium">具身智能</span>
               <span className="px-3 py-1 bg-blue-900/40 rounded text-xs text-blue-400 font-medium">AI 模型合规</span>
            </div>
         </div>

         {/* 卡片 3: AI 客服大厅 - 【已最终优化】 */}
         <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700 group hover:border-indigo-600 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-indigo-900/40 text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Icons.Bot /></div>
               <div className="w-6 h-6 rounded-full bg-green-900/40 flex items-center justify-center text-green-600"><span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">AI 客服大厅</h3>
            <p className="text-slate-400 text-sm mb-4">面向企业和个人的智能服务</p>
            
            <div className="space-y-3">
               {/* 智能客服 (不变) */}
               <div className="flex items-center justify-between p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 shadow-md">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white"><Icons.Bot className="w-4 h-4" /></div>
                       <div><p className="text-sm font-bold text-blue-400 leading-none">智能客服</p><p className="text-[10px] text-blue-300">快速处理：IT/物业/通用咨询</p></div>
                   </div>
                   <div className="text-xs text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500/80"></span><span>在线</span></div>
               </div>

               {/* 人才供需 Agent (动态数据) */}
               <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/40 hover:bg-indigo-900/40 transition-colors">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-green-900/40 flex items-center justify-center text-xs font-bold text-green-400"><Icons.UserCheck className="w-4 h-4" /></div>
                       <div><p className="text-sm font-semibold text-white leading-none">人才供需 Agent</p><p className="text-[10px] text-slate-400 transition-colors">今日已成功推荐 <span className="text-yellow-400 font-bold">{recommendedCount}</span> 人</p></div>
                   </div>
                   {/* 状态指示器：稳定在线 */}
                   <div className="text-xs text-green-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500/80"></span><span>在线</span></div>
               </div>

               {/* 政策申报 Agent (动态状态) */}
               <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/40 hover:bg-indigo-900/40 transition-colors">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-indigo-400">政</div>
                       <div><p className="text-sm font-semibold text-white leading-none">政策申报 Agent</p><p className="text-[10px] text-slate-400">正在服务：[某某科技]</p></div>
                   </div>
                   {/* 状态指示器：使用动态状态对象 */}
                   <div className={`text-xs ${currentPolicy.text} flex items-center gap-1`}>
                       <span className={`w-2 h-2 rounded-full ${currentPolicy.indicator}`}></span>
                       <span>{currentPolicy.label}</span>
                   </div>
               </div>
               
               {/* 产业法务 Agent (动态排队人数和状态) */}
               <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/40 hover:bg-indigo-900/40 transition-colors">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center text-xs font-bold text-red-400">法</div>
                       <div><p className="text-sm font-semibold text-white leading-none">产业法务 Agent</p><p className={`text-[10px] ${currentLaw.text} font-bold transition-colors`}>当前状态：{currentLaw.label}</p></div>
                   </div>
                   {/* 状态指示器：颜色和文字都根据状态变化 */}
                   <div className={`text-xs ${currentLaw.text} flex items-center gap-1`}>
                     <span className={`w-2 h-2 rounded-full ${currentLaw.indicator}`}></span>
                     <span>{currentLaw.label}</span>
                   </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. Scene: Trust Space (可信空间)
// ==========================================
const DataNode: React.FC<DataNodeProps> = ({ top, left, right, color, label }) => (
    <div className={`absolute ${top} ${left ? left : ''} ${right ? right : ''} z-30 flex flex-col items-center gap-1`}>
        <div className={`w-4 h-4 rounded-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--tw-shadow-color),0.8)] shadow-${color}-500 animate-pulse`}></div>
        <div className={`text-xs text-${color}-300 font-mono whitespace-nowrap`}>{label}</div> 
    </div>
);

const ConnectorHeap: React.FC<{ top: string, left?: string, right?: string }> = ({ top, left, right }) => (
    <div className={`absolute ${top} ${left ? left : ''} ${right ? right : ''} z-30 flex flex-col items-center`}>
        <div className="w-4 h-4 rounded-full bg-blue-700/80 border border-blue-400/50 shadow-md transform translate-x-1"></div>
        <div className="w-4 h-4 rounded-full bg-blue-600/90 border border-blue-400/50 shadow-md transform -translate-y-2"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-400 shadow-xl transform translate-x-1 -translate-y-4"></div>
        <div className="text-[10px] text-blue-300 -mt-3">连接器</div>
    </div>
)


const SceneTrust = () => (
  <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#000000_20%,_#064e3b_100%)] flex flex-col items-center justify-center relative overflow-hidden">
     {/* 网格背景 */}
     <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
     
     {/* 虚线连接层 (回归基础可见性) */}
     <div className="absolute inset-0 z-10">
        
        {/* 1. Starfire (Red) - V: H=23% (7% to 30%) 终止于圆圈上缘切点 (Y=30%) */}
        <div className="absolute top-[7%] left-[49%] h-[23%] w-[1px] border-l-2 border-dashed border-red-500/50"></div>
        <ConnectorHeap top="top-[6%]" left="left-[48%]" /> 
        <ConnectorHeap top="top-[28%]" left="left-[48%]" /> 
        
        {/* 4. 空间地理数据集 (Yellow) - H-V Polyline (Node connection + curve termination) */}
        {/* Line 1 (Horizontal Start, W=35%, 10%->45%) */}
        <div className="absolute right-[10%] w-[35%] h-[1px] border-t-2 border-dashed border-yellow-500/50" style={{ top: '21%' }}></div>
        <ConnectorHeap top="top-[20%]" right="right-[12%]" /> 
        {/* Line 2 (Vertical Down, H=11%, 21%->32%) */}
        <div className="absolute top-[21%] right-[45%] h-[11%] w-[1px] border-l-2 border-dashed border-yellow-500/50"></div>
        <ConnectorHeap top="top-[30%]" right="right-[43%]"/> 

        
        {/* 2. 平台 (Blue) - H-V-H Polyline (Node connection + curve termination) */}
        {/* Line 1 (Horizontal Start, W=20%, 5%->25%) */}
        <div className="absolute left-[5%] w-[20%] h-[1px] border-t-2 border-dashed border-blue-500/50" style={{ top: '26%' }}></div>
        <ConnectorHeap top="top-[25%]" left="left-[5%]" /> 
        {/* Line 2 (Vertical Down, H=13%, 26%->39%) */}
        <div className="absolute top-[26%] left-[25%] h-[13%] w-[1px] border-l-2 border-dashed border-blue-500/50"></div>
        {/* Line 3 (Horizontal End, W=16%, 25%->41%) - Terminating on curve edge X=41% */}
        <div className="absolute left-[25%] w-[16%] h-[1px] border-t-2 border-dashed border-blue-500/50" style={{ top: '39%' }}></div>
        <ConnectorHeap top="top-[37%]" left="left-[38%]"/> 


        {/* 3. 交通数据集 (Cyan) - H: W=33% (92%->59%) 终止于 X=59% 的圆圈边缘 */}
        <div className="absolute top-[39%] right-[8%] w-[33%] h-[1px] border-t-2 border-dashed border-cyan-500/50"></div>
        <ConnectorHeap top="top-[37%]" right="right-[15%]"/> 
        <ConnectorHeap top="top-[37%]" right="right-[40%]"/> 

     </div>
     
     {/* 数据节点位置 (保持不变) */}
     <DataNode top="top-[5%]" left="left-[42%]" color="red" label="星火数据集" size="text-xs"/>
     <DataNode top="top-[25%]" left="left-[5%]" color="blue" label="省公共数据授权平台" size="text-xs"/>
     <DataNode top="top-[35%]" right="right-[5%]" color="cyan" label="交通数据集" size="text-xs"/>
     <DataNode top="top-[20%]" right="right-[10%]" color="yellow" label="空间地理数据集" size="text-xs"/>


     {/* 可信隔离核心区域 (保持不变) */}
     <div className="relative z-20 text-center">
        <div className="w-48 h-48 mx-auto mb-8 relative">
           <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full"/>
           <div className="absolute inset-4 border border-emerald-500/50 rounded-full"/>
           <div className="absolute inset-0 flex items-center justify-center"><Icons.Lock className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.8)]" /></div>
        </div>
        
        <h2 className="text-3xl font-mono text-white tracking-[0.1em] font-bold mb-3 drop-shadow-lg">
           诸葛空间·可信数据物理隔离域
        </h2>
        <div className="flex flex-col gap-1 items-center mb-6">
             <p className="text-emerald-400/80 font-mono text-sm">DATA STAYS WITHIN THE PARK</p>
             <p className="text-white/60 text-xs">数据可用不可见 · 数据不出域</p>
        </div>
        
        <div className="flex gap-3 justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 backdrop-blur border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-mono">
                <Icons.ShieldCheck className="w-3 h-3" />
                <span>物理断网: ON</span>
             </div>
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 backdrop-blur border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-mono">
                <Icons.FileText className="w-3 h-3" />
                <span>合规备案: PASS</span>
             </div>
        </div>
     </div>
  </div>
);


// ==========================================
// 5. APP 主入口 (AppFinal 组件)
// ==========================================
export default function AppFinal() { 
  // 默认设置为驾驶舱
  const [activeTab, setActiveTab] = useState('cockpit'); 

  // 定义导航项的颜色主题
  const navItems = [
    { id: 'cockpit', icon: <Icons.Scan />, label: '驾驶舱', color: 'cyan' },
    { id: 'apps',    icon: <Icons.LayoutGrid />, label: '智能应用', color: 'indigo' },
    { id: 'trust',   icon: <Icons.ShieldCheck /> , label: '可信空间', color: 'emerald' }
  ];

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative font-sans selection:bg-blue-500/30">
      {/* 嵌入全局 CSS 样式 */}
      <GlobalStyles /> 
      
      <div className="w-full h-full">
          {activeTab === 'cockpit' && <SceneCockpit />}
          {activeTab === 'apps' && <SceneApps />}
          {activeTab === 'trust' && <SceneTrust />}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl flex gap-6">
           {navItems.map((item) => {
             const isActive = activeTab === item.id;
             const baseColorClass = `text-${item.color}-400`;
             const activeColorClass = `text-${item.color}-300`;
             const activeRingClass = `ring-4 ring-${item.color}-500/80`; 
             const activeShadowClass = `shadow-lg shadow-${item.color}-500/50`; 

             return (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 // 引入更强的边框和阴影
                 className={`relative group w-24 h-12 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden rounded-full 
                 ${isActive ? `scale-105 ${activeRingClass} ${activeShadowClass}` : 'hover:scale-[1.03] hover:ring-1 ring-white/10'}`}
               >
                 {/* 导航按钮背景和边框 */}
                 <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${isActive ? `bg-${item.color}-900/40` : 'bg-transparent group-hover:bg-white/5'}`}></div>
                 
                 {/* 内容层 z-10 */}
                 <div className="relative z-10 flex flex-col items-center pt-1.5">
                    
                    {/* 图标容器 w-5 h-5 */}
                    <div className={`w-5 h-5 mb-0.5 transition-all duration-300 ${baseColorClass} ${isActive ? `${activeColorClass} scale-125` : `group-hover:${activeColorClass}`}`}>
                       {item.icon}
                    </div>
                    
                    {/* 文本样式 */}
                    <span className={`text-[10px] whitespace-nowrap transition-colors duration-300 ${isActive ? `${activeColorClass} font-bold` : 'text-gray-400 group-hover:${activeColorClass}'}`}>
                      {item.label}
                    </span>
                 </div>
               </button>
             );
           })}
        </div>
      </div>
    </div>
  );
}