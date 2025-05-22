import { useEffect } from 'react';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';

function BasemapSwitcher({ view }) {

  useEffect(() => {
    if (!view) return;  // view 为空（尚未加载完成），不执行任何操作

    // 底图库组件
    const basemapGallery = new BasemapGallery({
      view: view
    });

    // 折叠/展开底图切换面板
    const bgExpand = new Expand({
      view: view, // 绑定到视图
      content: basemapGallery,
      expandIconClass: 'esri-icon-basemap',
      expandTooltip: 'Switch Basemap',  // 文字悬停，切换底图
      expanded: false
    });

    view.ui.add(bgExpand, 'bottom-left');   // 控件添加到视图左下角的UI中

    // 清理函数
    return () => {
      view.ui.remove(bgExpand); // 从 UI 中移除 Expand 控件
      basemapGallery.destroy(); // 销毁底图库对象
      bgExpand.destroy();       // 销毁控件本身
    };
  }, [view]);   // 依赖数组，当 view 变化时重新执行 useEffec

  return null;
}

export default BasemapSwitcher;
