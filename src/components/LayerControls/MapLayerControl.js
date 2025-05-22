import { useEffect } from 'react';
import LayerList from '@arcgis/core/widgets/LayerList';

function MapLayerControl({ view, fisheryLayer }) {

  useEffect(() => {
    // 在组件加载或 view/fisheryLayer 改变时执行
    if (!view || !fisheryLayer) return;

    // 图层列表控件
    const layerList = new LayerList({
      view: view,
      listItemCreatedFunction: (event) => {
        const item = event.item;
        // 为每个图层项添加展开面板
        item.panel = {
          content: "legend",  // 展示内容为图例
          open: true
        };
      }
    });

    view.ui.add(layerList, 'top-right');

    return () => {
      view.ui.remove(layerList);
      layerList.destroy();
    };
  }, [view, fisheryLayer]);

  return null;
}

export default MapLayerControl;
