import { useEffect } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import '@arcgis/core/assets/esri/themes/light/main.css';
import '@arcgis/core/assets/esri/themes/dark/main.css';

function BaseMap({ mapRef, setView }) {
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new WebScene({
      basemap: 'dark-gray-vector' // 深色底图
    });

    const view = new SceneView({
      container: mapRef.current,
      map,
      camera: {
        position: {
          // 初始视角
          longitude: -10,
          latitude: 0,
          z: 20000000  // 距离地球表面高度，2千万米可以显示整个地球
        },
        tilt: 0
      }
    });

    //  将视图对象传递出去
    setView(view);

    return () => view.destroy();
  }, [mapRef, setView]);

  return null;    // 该组件不渲染任何 DOM 元素
}

export default BaseMap;
