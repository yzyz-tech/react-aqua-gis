import React from 'react';
import BaseMap from './components/BaseMap';

// 渲染地图容器
function MapContainer() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BaseMap />
    </div>
  );
}

export default MapContainer;
