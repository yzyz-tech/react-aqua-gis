import React, { useEffect } from 'react';

const WeatherSelector = ({ setWeatherType }) => { // 接收回调函数作为 props，设置天气类型
  // 设置 select 元素的位置
  useEffect(() => {
    const selector = document.getElementById('weather-selector');
    if (selector) {
      selector.style.position = 'absolute';
      selector.style.bottom = '40px';
      selector.style.right = '20px';
      selector.style.zIndex = '10';   // 确保位于上层
    }
  }, []);  // 空依赖数组，确保只执行一次

  return (
    // 渲染下拉菜单
    <select
      id="weather-selector"
      onChange={(e) => setWeatherType(e.target.value)}  // 选择变化时触发回调
      style={{
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'  // 阴影提升可见性
      }}
    >
      {/* 下拉菜单的选项，值对象天气类型 */}
      <option value="none">-- 请选择天气图层 --</option>
      <option value="clouds">云图</option>
      <option value="precipitation">降水</option>
      <option value="pressure">气压</option>
      <option value="temp">气温</option>
      <option value="wind">风速</option>
    </select>
  );
};

export default WeatherSelector;
