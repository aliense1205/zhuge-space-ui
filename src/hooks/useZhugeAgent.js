import { useState, useCallback } from 'react';

// 配置 Agent 后端地址 (根据你的文档 IP)
const AGENT_API = "http://192.168.3.91:8000/api/query-agent"; 

export const useZhugeAgent = () => {
  const [messages, setMessages] = useState([
    { role: 'agent', content: '诸葛军师已就位。请下达指令。' }
  ]);
  const [loading, setLoading] = useState(false);
  
  // 视觉状态：控制左侧主屏幕显示什么
  // type: 'default' | 'chart' | 'table' | 'map'
  // data: 具体的渲染数据
  const [visualState, setVisualState] = useState({ type: 'default', data: null });

  const sendMessage = useCallback(async (text) => {
    // 1. 用户消息上屏
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // 2. 发送请求给 Python Agent
      // 注意：这里假设后端接收 JSON { query: "..." }
      const res = await fetch(AGENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text })
      });

      const data = await res.json();

      // 3. 处理响应
      // 假设后端返回结构: { response: "文本回复", visual: "chart", data: {...} }
      
      // 文本消息上屏
      const agentMsg = { role: 'agent', content: data.response || "收到，正在执行..." };
      setMessages(prev => [...prev, agentMsg]);

      // 视觉指令分发
      if (data.visual && data.visual !== 'none') {
        setVisualState({
          type: data.visual, // 例如: 'line_chart', 'data_table'
          data: data.data    // 图表数据或表格数据
        });
      }

    } catch (error) {
      console.error("Agent Connection Failed:", error);
      setMessages(prev => [...prev, { role: 'agent', content: `❌ 连接失败: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, loading, visualState, sendMessage };
};