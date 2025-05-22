import { useEffect } from 'react';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

function WeatherLayer({ map, weatherType }) {
  useEffect(() => {
    if (!map) return;

    // OpenWeatherMap API 密钥
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // 构造天气图层的URL模板
    const templateUrl = `https://tile.openweathermap.org/map/${weatherType}_new/{level}/{col}/{row}.png?appid=${apiKey}`;

    // 创建WebTileLayer实例，作为天气图层
    const layer = new WebTileLayer({
      urlTemplate: templateUrl,
      title: 'Weather Layer',   // 显示在图层列表
      // listMode: 'hide' // 隐藏图层
    });

    // 移除旧图层
    const old = map.findLayerById('WeatherLayer');
    if (old) map.remove(old);

    layer.id = 'WeatherLayer';
    map.add(layer);

    return () => {
      map.remove(layer);
    };
  }, [map, weatherType]);

  return null;
}

export default WeatherLayer;
