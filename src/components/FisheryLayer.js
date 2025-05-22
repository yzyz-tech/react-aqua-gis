import { useEffect } from 'react';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import Color from '@arcgis/core/Color';

function FisheryLayer({ view, visible = true, onLayerLoad }) {
  useEffect(() => {
    if (!view) return;

    // 特殊符号
    const zeroSymbol = new SimpleMarkerSymbol({
      style: 'x',  // 'diamond', 'square', 'triangle' 
      color: '#808080',  // gray
      size: 6,
      outline: {
        color: '#808080',
        width: 0.8
      },
    });
    // 其它数据点的圆形符号
    const createSymbol = (colorHex, size, glowColorHex) => {
      return new SimpleMarkerSymbol({
        style: 'circle',
        color: new Color(colorHex),
        size: size,
        outline: {
          color: new Color(glowColorHex),
          width: 0.8,
          opacity: 0.6
        }
      });
    };

    const renderer = new ClassBreaksRenderer({
      field: 'CPUE',
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 0,  // 显式定义该区间
          symbol: zeroSymbol,
          label: '= 0'  // 图例文字
        },
        {
          minValue: 0.00001,
          maxValue: 1,
          symbol: createSymbol('#ffcc00', 4, '#ffe680'),  // yellow
          label: '0 - 1'  // (0, 1]
        },
        {
          minValue: 1,
          maxValue: 2,
          symbol: createSymbol('#ff5e5e', 7, '#ffb3b3'),  // light red
          label: '1 - 2'
        },
        {
          minValue: 2,
          maxValue: 5,
          symbol: createSymbol('#8a2be2', 8, '#c89bff'),  // purple
          label: '2 - 5'
        },
        {
          minValue: 5,
          maxValue: 10,
          symbol: createSymbol('#00ffff', 9, '#99ffff'),  // cyan
          label: '5 - 10'
        },
        {
          minValue: 10,
          maxValue: Infinity,
          symbol: createSymbol('#00ff66', 10, '#99ffcc'),  // green
          label: '> 10'
        }
      ],
    });

    // 创建 GeoJSON 图层
    const layer = new GeoJSONLayer({
      url: '/fishing_data/jumbo_2014_2021.geojson',
      title: 'Fishery Layer',
      visible,
      renderer: renderer,
      blendMode: 'screen',  // 叠加发光
      opacity: 0.9,
      popupTemplate: {
        title: 'Fishing Record',
        content: `
          <table>
            <tr><td><b>Date:</b></td><td>{Year}-{Month}</td></tr>
            <tr><td><b>Catch:</b></td><td>{Catch} tons</td></tr>
            <tr><td><b>CPUE:</b></td><td>{CPUE}</td></tr>
            <tr><td><b>Location:</b></td><td>{Lat}°S, {Lon}°W</td></tr>
          </table>
        `
      }
    });

    view.map.add(layer);

    // 图层加载完成时调用回调函数
    if (onLayerLoad) {
      onLayerLoad(layer);
    }

    return () => {
      view.map.remove(layer);
    };
  }, [view, visible, onLayerLoad]);

  return null;
}

export default FisheryLayer;
