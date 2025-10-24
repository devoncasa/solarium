import React, { useState, useEffect } from 'react';
import { Language, Questionnaire, FormData, Question, PhotoData } from '../types';

interface FormFieldProps {
  question: Question;
  language: Language;
  value: string;
  otherValue: string;
  onValueChange: (value: string) => void;
  onOtherValueChange: (value: string) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  question,
  language,
  value,
  otherValue,
  onValueChange,
  onOtherValueChange,
  error,
}) => {
  const commonProps = {
    id: question.id,
    name: question.id,
    required: question.required,
    className: `mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 ${
      error
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
    }`,
    placeholder: question.placeholder ? question.placeholder[language] : '',
  };

  const renderField = () => {
    switch (question.type) {
      case 'dropdown':
        return (
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <select
              {...commonProps}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className={`${commonProps.className} ${
                value === 'Other' ? 'sm:flex-1' : 'w-full'
              }`}
            >
              <option value="">
                {language === 'th'
                  ? '--- กรุณาเลือก ---'
                  : '--- Please Select ---'}
              </option>
              {question.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label[language]}
                </option>
              ))}
            </select>
            {value === 'Other' && (
              <input
                type="text"
                {...commonProps}
                value={otherValue}
                onChange={(e) => onOtherValueChange(e.target.value)}
                placeholder={
                  language === 'th' ? 'โปรดระบุ' : 'Please specify'
                }
                className={`${commonProps.className} sm:flex-1`}
              />
            )}
          </div>
        );
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            rows={3}
          ></textarea>
        );
      default:
        return (
          <input
            type={question.type}
            {...commonProps}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div id={`field-container-${question.id}`}>
      <label
        htmlFor={question.id}
        className="block text-sm font-medium text-slate-700"
      >
        {question.label[language]}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};


interface QuestionnaireFormProps {
  questionnaire: Questionnaire;
  language: Language;
  formData: FormData;
  onInputChange: (id: string, value: string) => void;
  photos: PhotoData[];
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (index: number) => void;
  onDescriptionChange: (index: number, description: string) => void;
  errors: Record<string, string>;
  onExport: (format: 'png' | 'pdf') => void;
  isSaving: boolean;
}


export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  questionnaire,
  language,
  formData,
  onInputChange,
  photos,
  onAddPhotos,
  onRemovePhoto,
  onDescriptionChange,
  errors,
  onExport,
  isSaving
}) => {
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            onAddPhotos(selectedFiles);
            e.target.value = '';
        }
    };
    
    const savePngText = language === 'th' ? 'บันทึกเป็น PNG' : 'Save as PNG';
    const savePdfText = language === 'th' ? 'บันทึกเป็น PDF' : 'Save as PDF';
    const savingText = language === 'th' ? 'กำลังบันทึก...' : 'Saving...';

    return (
        <form onSubmit={e => e.preventDefault()} className="space-y-10">
            {questionnaire.sections.map(section => (
                <fieldset key={section.id} className="space-y-6 border-t border-slate-200 pt-6">
                    <legend className="text-xl font-semibold text-slate-800 -mt-10 bg-white px-2">{section.title[language]}</legend>
                    {section.questions.map(q => {
                        // Conditionally render On-Peak and Off-Peak fields based on Meter Type
                        if ((q.id === 'onPeakConsumption' || q.id === 'offPeakConsumption') && 
                            formData.contractType !== 'TOU' && 
                            formData.contractType !== 'TOD') {
                            return null; // Do not render these fields if contract type is not TOU or TOD
                        }

                        return (
                            <FormField 
                                key={q.id}
                                question={q}
                                language={language}
                                value={formData[q.id] as string || ''}
                                otherValue={formData[`${q.id}Other`] as string || ''}
                                onValueChange={(val) => onInputChange(q.id, val)}
                                onOtherValueChange={(val) => onInputChange(`${q.id}Other`, val)}
                                error={errors[q.id]}
                            />
                        );
                    })}
                </fieldset>
            ))}

            <fieldset className="space-y-4 border-t border-slate-200 pt-6">
                <legend className="text-xl font-semibold text-slate-800 -mt-10 bg-white px-2 no-export">
                    {language === 'th' ? '6. รูปถ่ายประกอบ' : '6. Supporting Photos'}
                </legend>
                <p className="text-sm text-slate-600 no-export">
                    {language === 'th' ? 'กรุณาแนบรูปถ่ายพื้นที่ติดตั้ง, หลังคา, ตู้ MDB, มิเตอร์ไฟฟ้า และบิลค่าไฟล่าสุด (สูงสุด 25 รูป)' : 'Please attach photos of the installation area, roof, MDB panel, electricity meter, and recent electricity bills (maximum 25 photos).'}
                </p>
                <div className="no-export">
                     <label htmlFor="photo-upload" className="w-full inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{language === 'th' ? 'เพิ่มรูปภาพ' : 'Add Photos'}</span>
                    </label>
                    <input id="photo-upload" name="photo-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handlePhotoChange} />
                </div>
                {photos.length > 0 && (
                    <div id="photo-previews" className="mt-4">
                        <p className="text-sm font-medium text-slate-700 mb-2 no-export">{photos.length} / 25 {language === 'th' ? 'ไฟล์ที่เลือก' : 'files selected'}:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                           {photos.map((photo, index) => (
                               <div key={photo.preview} className="relative group space-y-2 break-inside-avoid">
                                   <img src={photo.preview} alt={`preview ${index + 1}`} className="w-full h-28 object-cover rounded-md border border-slate-200" />
                                   <button
                                        onClick={() => onRemovePhoto(index)}
                                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 no-export"
                                        aria-label={language === 'th' ? `ลบรูปภาพ ${index + 1}` : `Remove image ${index + 1}`}
                                   >
                                       &times;
                                   </button>
                                   <textarea
                                        value={photo.description}
                                        onChange={(e) => onDescriptionChange(index, e.target.value)}
                                        placeholder={language === 'th' ? 'คำอธิบายรูปภาพ...' : 'Photo description...'}
                                        rows={2}
                                        className="block w-full px-2 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                               </div>
                           ))}
                        </div>
                    </div>
                )}
            </fieldset>

            <div className="flex justify-end items-center space-x-3 no-export">
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
        </form>
    );
};
