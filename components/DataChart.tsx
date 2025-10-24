import React, { useEffect, useRef } from 'react';
import { Language, FormData } from '../types';

// This lets TypeScript know about the Chart object from the CDN
declare var Chart: any;

interface DataChartProps {
  language: Language;
  formData: FormData;
  onClose: () => void;
}

interface ChartLabels {
  title: string;
  avgBill: string;
  peakDemand: string;
  onPeak: string;
  offPeak: string;
  valueAxis: string;
  close: string;
}

const labels: Record<Language, ChartLabels> = {
  th: {
    title: 'สรุปข้อมูลการใช้ไฟฟ้า',
    avgBill: 'ค่าไฟเฉลี่ย (บาท)',
    peakDemand: 'Peak Demand (kW)',
    onPeak: 'On-Peak (kWh)',
    offPeak: 'Off-Peak (kWh)',
    valueAxis: 'ค่า',
    close: 'ปิด',
  },
  en: {
    title: 'Electricity Usage Summary',
    avgBill: 'Avg. Monthly Bill (THB)',
    peakDemand: 'Peak Demand (kW)',
    onPeak: 'On-Peak (kWh)',
    offPeak: 'Off-Peak (kWh)',
    valueAxis: 'Value',
    close: 'Close',
  },
};

export const DataChart: React.FC<DataChartProps> = ({ language, formData, onClose }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null); // To hold the chart instance

  useEffect(() => {
    if (!chartRef.current) return;

    const currentLabels = labels[language];
    const dataPoints = [
      { label: currentLabels.avgBill, value: Number(formData.avgMonthlyBill) || 0, color: 'rgba(59, 130, 246, 0.7)' },
      { label: currentLabels.peakDemand, value: Number(formData.peakDemand) || 0, color: 'rgba(239, 68, 68, 0.7)' },
      { label: currentLabels.onPeak, value: Number(formData.onPeakConsumption) || 0, color: 'rgba(249, 115, 22, 0.7)' },
      { label: currentLabels.offPeak, value: Number(formData.offPeakConsumption) || 0, color: 'rgba(22, 163, 74, 0.7)' },
    ].filter(dp => dp.value > 0); // Only show bars for data that has been entered

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (dataPoints.length === 0) return; // Don't render an empty chart

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataPoints.map(dp => dp.label),
        datasets: [{
          label: currentLabels.valueAxis,
          data: dataPoints.map(dp => dp.value),
          backgroundColor: dataPoints.map(dp => dp.color),
          borderColor: dataPoints.map(dp => dp.color.replace('0.7', '1')),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend since bar labels are clear
          },
          title: {
            display: true,
            text: currentLabels.title,
            font: {
              size: 18,
            },
            padding: {
              bottom: 20,
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
                display: true,
                text: currentLabels.valueAxis,
            }
          },
        },
      },
    });

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [formData, language]);

  const currentLabels = labels[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 no-export">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">{currentLabels.title}</h2>
                <button 
                    onClick={onClose}
                    className="text-slate-500 hover:text-slate-800"
                    aria-label={currentLabels.close}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="relative flex-grow h-96">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    </div>
  );
};