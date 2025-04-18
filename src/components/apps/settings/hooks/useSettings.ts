
import { useState } from 'react';

export interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
  wifi: boolean;
  privacy: boolean;
  language: string;
  username: string;
  volume: number;
}

export const useSettings = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [language, setLanguage] = useState('en');
  const [username, setUsername] = useState('User');
  const [volume, setVolume] = useState(70);

  return {
    theme,
    setTheme,
    notifications,
    setNotifications,
    wifi,
    setWifi,
    privacy,
    setPrivacy,
    language,
    setLanguage,
    username,
    setUsername,
    volume,
    setVolume,
  };
};
