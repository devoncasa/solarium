import React, { useState } from 'react';

interface PasswordProtectionProps {
  onSuccess: () => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0007') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl text-center">
        <img 
          src="https://raw.githubusercontent.com/devoncasa/Tempa123-Asset/main/solar-logo.webp" 
          alt="SOLARIUM Logo" 
          className="h-16 w-16 object-contain mx-auto mb-4" 
        />
        <h1 className="text-xl font-bold text-slate-800 mb-2">SOLARIUM</h1>
        <p className="text-sm text-slate-600 mb-6">Please Enter Password / กรุณาใส่รหัสผ่าน</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Password / รหัสผ่าน"
              className={`w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 text-center ${
                error
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              autoFocus
            />
            {error && <p className="mt-2 text-xs text-red-600">Incorrect Password / รหัสผ่านไม่ถูกต้อง</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login / เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};
