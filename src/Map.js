import React, { useRef, useEffect } from 'react'
import { loadModules } from 'esri-loader'


function Map() {
  const MapEl = useRef(null); // DOM引用挂载地图视图

  useEffect(
    () => {
      let view; // 存储地图视图实例

      // 异步加载两个模块
      loadModules(["esri/views/MapView", "esri/WebMap"], {
        css: true // 自动加载 ArcGIS 样式表
      }).then(([MapView, WebMap]) => {
        const webmap = new WebMap({
          // 底图类型
          basemap: 'oceans'
          // basemap: 'topo-vector'           
        })

        // 初始化地图视图
        view = new MapView({
          map: webmap,  // 地图对象
          center: [-87.5, -10],   // [经度, 纬度]
          zoom: 4,
          container: MapEl.current, // 指定地图容器
        })
      })

      // 清理函数，组件卸载时执行
      return () => {
        if (!!view) {
          view.destroy();
          view = null;  // 置空引用
        }
      }
    })

  // 渲染地图容器()
  return <div style={{ height: '100vh' }} ref={MapEl} />
}

export default Map