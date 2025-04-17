
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Thermometer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const WeatherApp: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 72,
    condition: 'Sunny',
    location: 'San Francisco',
    humidity: 45,
    windSpeed: 8
  });
  
  const [forecast, setForecast] = useState([
    { day: 'Monday', high: 73, low: 58, condition: 'Sunny' },
    { day: 'Tuesday', high: 70, low: 56, condition: 'Partly Cloudy' },
    { day: 'Wednesday', high: 68, low: 54, condition: 'Cloudy' },
    { day: 'Thursday', high: 65, low: 52, condition: 'Rainy' },
    { day: 'Friday', high: 67, low: 53, condition: 'Cloudy' },
    { day: 'Saturday', high: 71, low: 55, condition: 'Partly Cloudy' },
    { day: 'Sunday', high: 74, low: 57, condition: 'Sunny' }
  ]);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={24} className="text-yellow-400" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-400" />;
      case 'partly cloudy':
        return <Cloud size={24} className="text-blue-300" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-400" />;
      default:
        return <Sun size={24} className="text-yellow-400" />;
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-refos-window p-4 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-medium">{currentWeather.location}</h3>
          <p className="text-white/60">Current Weather</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-semibold">{currentWeather.temperature}°F</span>
          <p className="text-white/60">{currentWeather.condition}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-refos-taskbar p-4 rounded-lg flex items-center">
          <div className="bg-refos-primary/20 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Thermometer size={20} className="text-refos-primary" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Humidity</p>
            <p className="font-medium">{currentWeather.humidity}%</p>
          </div>
        </div>
        <div className="bg-refos-taskbar p-4 rounded-lg flex items-center">
          <div className="bg-refos-primary/20 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Wind size={20} className="text-refos-primary" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Wind Speed</p>
            <p className="font-medium">{currentWeather.windSpeed} mph</p>
          </div>
        </div>
      </div>
      
      <h4 className="font-medium mb-4">7-Day Forecast</h4>
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="bg-refos-taskbar p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-10 flex items-center justify-center mr-3">
                  {getWeatherIcon(day.condition)}
                </div>
                <span className="font-medium">{day.day}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white/60">{day.condition}</span>
                <div>
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-white/60 mx-1">/</span>
                  <span className="text-white/60">{day.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherApp;
