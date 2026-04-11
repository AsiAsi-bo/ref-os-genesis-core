
import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const WeatherApp: React.FC = () => {
  const [currentWeather] = useState({
    temperature: 72,
    condition: 'Sunny',
    location: 'San Francisco',
    humidity: 45,
    windSpeed: 8,
    visibility: 10,
    feelsLike: 70,
  });

  const [forecast] = useState([
    { day: 'Mon', high: 73, low: 58, condition: 'Sunny' },
    { day: 'Tue', high: 70, low: 56, condition: 'Partly Cloudy' },
    { day: 'Wed', high: 68, low: 54, condition: 'Cloudy' },
    { day: 'Thu', high: 65, low: 52, condition: 'Rainy' },
    { day: 'Fri', high: 67, low: 53, condition: 'Cloudy' },
    { day: 'Sat', high: 71, low: 55, condition: 'Partly Cloudy' },
    { day: 'Sun', high: 74, low: 57, condition: 'Sunny' },
  ]);

  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun size={size} className="text-amber-400" />;
      case 'cloudy': return <Cloud size={size} className="text-white/50" />;
      case 'partly cloudy': return <Cloud size={size} className="text-sky-300" />;
      case 'rainy': return <CloudRain size={size} className="text-blue-400" />;
      default: return <Sun size={size} className="text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-refos-window text-white">
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Hero */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/40 font-light">{currentWeather.location}</p>
              <div className="text-6xl font-extralight tracking-tight mt-1">{currentWeather.temperature}°</div>
              <p className="text-sm text-white/50 mt-1">{currentWeather.condition} · Feels like {currentWeather.feelsLike}°</p>
            </div>
            <div className="mt-2">{getWeatherIcon(currentWeather.condition, 48)}</div>
          </div>

          {/* 7-day forecast strip */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {forecast.map((day, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/[0.04] min-w-[64px]">
                <span className="text-[11px] text-white/40 font-medium">{day.day}</span>
                {getWeatherIcon(day.condition, 20)}
                <div className="text-xs">
                  <span className="text-white/80">{day.high}°</span>
                  <span className="text-white/30 mx-0.5">/</span>
                  <span className="text-white/30">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Thermometer size={18} />, label: 'Feels Like', value: `${currentWeather.feelsLike}°F` },
              { icon: <Droplets size={18} />, label: 'Humidity', value: `${currentWeather.humidity}%` },
              { icon: <Wind size={18} />, label: 'Wind', value: `${currentWeather.windSpeed} mph` },
              { icon: <Eye size={18} />, label: 'Visibility', value: `${currentWeather.visibility} mi` },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.04] rounded-2xl p-4 flex items-center gap-3">
                <div className="text-white/30">{stat.icon}</div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm font-medium text-white/80">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherApp;
