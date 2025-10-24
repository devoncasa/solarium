import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const title = language === 'th' ? 'แบบสอบถามสำหรับประเมินการติดตั้งโซล่าเซลล์' : 'Solar Cell Installation Assessment Questionnaire';
  const subtitle = language === 'th' ? 'โดย SOLARIUM' : 'By SOLARIUM';

  return (
    <header className="bg-white p-4 print:shadow-none border-b border-slate-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/solar-logo.webp" 
            alt="SOLARIUM Logo" 
            className="h-12 w-12 object-contain" 
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{title}</h1>
            <p className="text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2 no-export">
            <button
              onClick={() => setLanguage('th')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'th'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              TH
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              EN
            </button>
          </div>
          <p className="text-xs text-slate-500 font-mono tracking-wider">{formatDateTime(currentDateTime)}</p>
        </div>
      </div>
    </header>
  );
};