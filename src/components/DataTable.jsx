// src/components/DataTable.jsx

import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

// 模拟数据
const mockData = [
  { id: 1, name: '张三', department: '研发部', status: '在职', salary: 12000 },
  { id: 2, name: '李四', department: '市场部', status: '离职', salary: 8500 },
  { id: 3, name: '王五', department: '产品部', status: '在职', salary: 15000 },
  { id: 4, name: '赵六', department: '研发部', status: '实习', salary: 6000 },
  { id: 5, name: '钱七', department: '运营部', status: '在职', salary: 10000 },
  { id: 6, name: '孙八', department: '市场部', status: '在职', salary: 9200 },
  { id: 7, name: '周九', department: '产品部', status: '在职', salary: 18000 },
  { id: 8, name: '吴十', department: '研发部', status: '离职', salary: 11000 },
  { id: 9, name: '郑十一', department: '运营部', status: '实习', salary: 7500 },
  { id: 10, name: '冯十二', department: '市场部', status: '在职', salary: 9800 },
  { id: 11, name: '刘十三', department: '研发部', status: '在职', salary: 13500 },
  // 更多数据...
];

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' 或 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // 定义表格列
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: '姓名', sortable: true },
    { key: 'department', label: '部门', sortable: true },
    { key: 'status', label: '状态', sortable: true },
    { key: 'salary', label: '薪资 (RMB)', sortable: true },
  ];

  // 搜索和排序逻辑 (使用 useMemo 优化性能)
  const processedData = useMemo(() => {
    let data = [...mockData];

    // 1. 搜索过滤
    if (searchTerm) {
      data = data.filter(item =>
        columns.some(col =>
          String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // 2. 排序
    if (sortBy) {
      data.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return data;
  }, [searchTerm, sortBy, sortOrder, columns]);
  
  // 3. 分页逻辑
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const currentRows = processedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // 处理排序点击
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  // 状态样式
  const getStatusClasses = (status) => {
    switch (status) {
      case '在职': return 'bg-green-100 text-green-800';
      case '离职': return 'bg-red-100 text-red-800';
      case '实习': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">通用数据表格</h2>
      
      {/* 搜索栏和控制 */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // 搜索时重置分页
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        
        <p className="text-sm text-gray-600">
            总计 {processedData.length} 条记录
        </p>
      </div>

      {/* 表格主体 - 响应式容器 */}
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 
                    ${col.sortable ? 'cursor-pointer hover:bg-gray-100 transition duration-150' : ''}`}
                >
                  <div className="flex items-center">
                    {col.label}
                    {col.sortable && (
                      <span className="ml-1 flex-shrink-0 text-gray-400">
                        {sortBy === col.key ? (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4 opacity-30" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{row.id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">{row.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">{row.department}</td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <span 
                        className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusClasses(row.status)}`}
                    >
                        {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">¥{row.salary.toLocaleString()}</td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                        未找到匹配的记录。
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 分页控制 */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
            显示第 {Math.min(processedData.length, (currentPage - 1) * rowsPerPage + 1)} 条到第 {Math.min(processedData.length, currentPage * rowsPerPage)} 条
        </p>

        <nav className="flex items-center space-x-2">
            <button 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                <ChevronsLeft className="w-4 h-4" />
            </button>
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-700 font-semibold">
                第 {currentPage} 页 / 共 {totalPages} 页
            </span>

            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
            <button 
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                <ChevronsRight className="w-4 h-4" />
            </button>
        </nav>
      </div>
    </div>
  );
};

export default DataTable;