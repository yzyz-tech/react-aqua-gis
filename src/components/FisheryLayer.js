import { loadModules } from 'esri-loader';

export async function createFisheryLayer() {
  const [GeoJSONLayer] = await loadModules(['esri/layers/GeoJSONLayer']);

  // 离散分级颜色
  const colorStops = [
    // 棕-黄-绿-青-蓝
    // value 为区间下界
    { value: 0, color: '#a6611a', label: '< 5' },
    { value: 5, color: '#dfc27d', label: '5 - 10' },
    { value: 10, color: '#80cdc1', label: '10 - 20' },
    { value: 20, color: '#018571', label: '> 20' },
    // { value: 30, color: '#003c30', label: '> 30' }
  ];

  // 点图层的渲染方式
  const renderer = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      color: 'white',
      size: 8,
      outline: {  // 轮廓
        width: 0.5,
        color: '#000000'  // 黑
      }
    },
    visualVariables: [
      { // 颜色视觉变量
        type: 'color',
        field: 'CPUE',
        stops: colorStops
      },
      { // 大小视觉变量
        type: 'size',
        field: 'CPUE',
        stops: [
          { value: 0, size: 6, label: '< 5' },
          { value: 5, size: 10, label: '5 - 10' },
          { value: 10, size: 14, label: '10-20' },
          { value: 20, size: 18, label: '> 20' }
        ]
      }
    ]
  };

  // 弹窗模板
  const popupTemplate = {
    title: 'Fishing Record',
    content: `
      <table>
        <tr><td><b>Date:</b></td><td>{Year}-{Month}</td></tr>
        <tr><td><b>Catch:</b></td><td>{Catch} tons</td></tr>
        <tr><td><b>CPUE:</b></td><td>{CPUE}</td></tr>
        <tr><td><b>Location:</b></td><td>{Lat}°S, {Lon}°W</td></tr>
      </table>
    `
  };

  // 渔业数据
  const layer = new GeoJSONLayer({
    url: 'fishing_data/jumbo_2014_2021.geojson',
    renderer,
    popupTemplate
  });

  return layer;
}
