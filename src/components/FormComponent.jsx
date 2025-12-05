// src/components/FormComponent.jsx

import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '研发部',
    role: '',
    notes: '',
    isManager: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('表单提交数据:', formData);
    alert('表单已提交，请查看控制台输出！');
  };
  
  const handleReset = () => {
    setFormData({
        name: '',
        email: '',
        department: '研发部',
        role: '',
        notes: '',
        isManager: false,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">新增员工信息</h2>

      <form onSubmit={handleSubmit}>
        {/* 表单输入区域 - 响应式两列布局 */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
          {/* 姓名输入 */}
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              员工姓名
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入姓名"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 邮箱输入 */}
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              邮箱地址
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="例如：user@example.com"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* 部门选择框 */}
          <div className="sm:col-span-3">
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
              部门
            </label>
            <div className="mt-2">
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>研发部</option>
                <option>产品部</option>
                <option>市场部</option>
                <option>运营部</option>
              </select>
            </div>
          </div>

          {/* 职位输入 */}
          <div className="sm:col-span-3">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
              职位
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="例如：高级工程师"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
          {/* 复选框 - 是否为管理者 */}
          <div className="sm:col-span-6 flex items-center pt-2">
            <input
                id="isManager"
                name="isManager"
                type="checkbox"
                checked={formData.isManager}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="isManager" className="ml-3 block text-sm leading-6 text-gray-900">
                是否为部门管理者？
            </label>
          </div>

          {/* 多行文本区域 */}
          <div className="sm:col-span-6">
            <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
              备注/特殊说明
            </label>
            <div className="mt-2">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="在此输入任何特殊备注..."
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="mt-8 flex items-center justify-end gap-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition duration-150"
          >
            重置
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150"
          >
            提交信息
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;