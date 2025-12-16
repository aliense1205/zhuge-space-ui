import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react'; // 1. 引入 Sparkles 图标

const NativeChat = ({ messages, loading, onSend }) => {
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  // 2. 定义快捷指令集 (解决"不知道问什么"的问题)
  const SUGGESTIONS = [
    "📊 分析产业链数据",
    "📜 查询高新补贴政策",
    "🌍 返回态势感知"
  ];

  // 自动滚动到底部
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  // 3. 点击 Chip 直接发送
  const handleChipClick = (text) => {
    onSend(text);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-l border-slate-200 shadow-xl z-20">
      {/* Header */}
      <div className="h-14 border-b border-slate-100 flex items-center px-4 bg-white flex-none justify-between">
        <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <h2 className="font-semibold text-slate-800">诸葛军师 Agent</h2>
        </div>
        <span className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full">V1.0</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-none shadow-sm
                ${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}
              `}>
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`
                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words
                ${isUser 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}
              `}>
                {msg.content}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center">
               <Bot size={14} className="text-slate-400" />
             </div>
             <div className="bg-slate-100 px-4 py-2 rounded-full text-xs text-slate-500 flex items-center animate-pulse">
               思考中...
             </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area + Chips */}
      <div className="p-4 bg-white border-t border-slate-100 flex-none flex flex-col gap-3">
        
        {/* 4. 渲染快捷指令 Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTIONS.map((text, idx) => (
                <button
                    key={idx}
                    onClick={() => handleChipClick(text)}
                    className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs rounded-full transition-colors border border-blue-100"
                >
                    <Sparkles size={12} />
                    {text}
                </button>
            ))}
        </div>

        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入指令..."
            // 🟢 保持之前的修复：text-slate-900 (深色字)
            className="w-full bg-slate-100 text-slate-900 placeholder-slate-500 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-4 pr-12 text-sm transition-all outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NativeChat;