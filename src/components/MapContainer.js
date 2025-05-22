import React, { useRef, useState } from 'react';
import BaseMap from './BaseMap';
import WeatherLayer from './WeatherLayer';
import FisheryLayer from './FisheryLayer';
import BasemapSwitcher from './LayerControls/BasemapSwitcher';
import WeatherSelector from './LayerControls/WeatherSelector';
import FisheryLegendControl from './LayerControls/MapLayerControl';

// 主组件，整合地图容器与图层、空间
function MapContainer() {
  const mapRef = useRef(null);  // 绑定地图DOM容器
  const [view, setView] = useState(null);
  const [weatherType, setWeatherType] = useState('none'); // 记录当前选中的天气图层类型
  const [fisheryLayer, setFisheryLayer] = useState(null);

  return (
    <div>
      <div ref={mapRef} style={{ height: '100vh', width: '100%' }}>
        {/* 加载基础地图 */}
        <BaseMap mapRef={mapRef} setView={setView} />
      </div>
      {/* SceneView加载完成后，才挂载图层和控件 */}
      {view && (
        <>
          <FisheryLayer view={view} onLayerLoad={setFisheryLayer} />
          <WeatherLayer map={view.map} weatherType={weatherType} />
          <BasemapSwitcher view={view} />
          <WeatherSelector setWeatherType={setWeatherType} />
          {/* 若渔业图层已加载，则显示对应图例控件 */}
          {fisheryLayer && <FisheryLegendControl view={view} fisheryLayer={fisheryLayer} />}
        </>
      )}
    </div>
  );
}

export default MapContainer;