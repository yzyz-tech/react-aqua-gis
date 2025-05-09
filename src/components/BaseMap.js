import React, { useRef, useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { createFisheryLayer } from './FisheryLayer';

function BaseMap() {
  const mapRef = useRef(null);
  const [legendVisible, setLegendVisible] = useState(true); // 控制图例显隐


  useEffect(() => {
    let view; // 存储 MapView 实例

    // 异步加载 ArcGIS 所需模块
    loadModules([
      'esri/views/MapView',
      'esri/WebMap',
      'esri/widgets/Legend',
      'esri/widgets/Expand'
    ], {
      css: true // 自动加载 ArcGIS 样式表
    }).then(async ([MapView, WebMap, Legend, Expand]) => {  // 模块加载成功后执行

      const webmap = new WebMap({
        // 底图类型
        basemap: 'oceans' // 'topo-vector'等
      });

      // 调用函数创建渔业图层
      const fisheryLayer = await createFisheryLayer();
      webmap.add(fisheryLayer);

      // 页面上显示地图
      view = new MapView({
        map: webmap,
        center: [-87.5, -13], // [经度, 纬度]
        zoom: 6,
        container: mapRef.current,  // 指定地图容器
      });

      // 图例控件
      const legend = new Legend({
        view: view,
        layerInfos: [{
          layer: fisheryLayer,
          title: 'Catch Per Unit Effort (CPUE) Levels'
        }]
      });

      // 浮动折叠控件
      const expand = new Expand({
        view: view,
        content: legend,  // 图例控件图例作为内容
        expandIconClass: 'esri-icon-legend',
        expandTooltip: 'Show Legend',
        collapseTooltip: 'Hide Legend',
        expanded: legendVisible,
        mode: 'floating'
      });

      // 监听折叠状态变化
      expand.watch('expanded', (expanded) => {
        setLegendVisible(expanded);
      });

      view.ui.add(expand, 'bottom-right'); // 图例位置
    });

    // 清理函数，组件卸载时执行
    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ height: '100%' }} />
    </div>
  );
}

export default BaseMap;
