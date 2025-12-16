import React from 'react';
import { useZhugeAgent } from '../hooks/useZhugeAgent';
import VisualStage from '../components/Agent/VisualStage';
import NativeChat from '../components/Agent/NativeChat';

const AgentWorkstation = () => {
  // 1. 挂载 Hook，获取所有能力
  const { messages, loading, visualState, sendMessage } = useZhugeAgent();

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">
      
      {/* 2. 左侧：视觉展示区 (Visual Stage) */}
      <div className="flex-1 p-4 h-full">
        <VisualStage visualState={visualState} />
      </div>

      {/* 3. 右侧：原生对话框 (Native Chat) */}
      <NativeChat 
        messages={messages} 
        loading={loading} 
        onSend={sendMessage} 
      />
      
    </div>
  );
};

export default AgentWorkstation;