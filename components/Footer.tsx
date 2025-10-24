import React from 'react';
import { Language } from '../types';

interface FooterProps {
  onExport: (format: 'png' | 'pdf') => void;
  isSaving: boolean;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onExport, isSaving, language }) => {
  const savePngText = language === 'th' ? 'บันทึกเป็น PNG' : 'Save as PNG';
  const savePdfText = language === 'th' ? 'บันทึกเป็น PDF' : 'Save as PDF';
  const savingText = language === 'th' ? 'กำลังบันทึก...' : 'Saving...';

  return (
    <footer className="sticky bottom-0 bg-white bg-opacity-90 backdrop-blur-sm border-t border-slate-200 py-4 px-4 mt-8 no-export">
      <div className="container mx-auto max-w-4xl flex justify-end items-center space-x-3">
        {isSaving ? (
          <div className="flex items-center text-slate-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{savingText}</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => onExport('png')}
              disabled={isSaving}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savePngText}
            </button>
            <button
              onClick={() => onExport('pdf')}
              disabled={isSaving}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savePdfText}
            </button>
          </>
        )}
      </div>
    </footer>
  );
};