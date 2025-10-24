import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { Footer } from './components/Footer';
import { questionnaireData } from './constants/questions';
import { Language, FormData, Question, Section, PhotoData } from './types';
import { DataChart } from './components/DataChart';
import { PasswordProtection } from './components/PasswordProtection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<Language>('th');
  const [formData, setFormData] = useState<FormData>({});
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('isSolar-authenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isSolar-authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleInputChange = useCallback((id: string, value: string) => {
    setFormData(prev => {
        const newData = { ...prev, [id]: value };
        
        // When contract type changes, clear irrelevant conditional fields
        if (id === 'contractType') {
            if (value !== 'TOU' && value !== 'TOD') {
                delete newData.onPeakConsumption;
                delete newData.offPeakConsumption;
            }
        }
        
        return newData;
    });

    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }, [errors]);

  const handleAddPhotos = useCallback((newFiles: File[]) => {
    setPhotos(prevPhotos => {
      const spaceLeft = 25 - prevPhotos.length;
      if (spaceLeft <= 0) {
        alert("You can't upload more than 25 photos.");
        return prevPhotos;
      }
  
      const filesToAdd = newFiles.slice(0, spaceLeft);
      if (newFiles.length > spaceLeft) {
          alert(`You can only add ${spaceLeft} more photo(s). ${filesToAdd.length} file(s) were added.`);
      }
  
      const newPhotoData = filesToAdd.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        description: '',
      }));
      return [...prevPhotos, ...newPhotoData];
    });
  }, []);
  
  const handleRemovePhoto = useCallback((indexToRemove: number) => {
      setPhotos(prevPhotos => {
          const photoToRemove = prevPhotos[indexToRemove];
          URL.revokeObjectURL(photoToRemove.preview); // Clean up memory
          return prevPhotos.filter((_, index) => index !== indexToRemove);
      });
  }, []);
  
  const handlePhotoDescriptionChange = useCallback((index: number, description: string) => {
      setPhotos(prevPhotos => {
          const newPhotos = [...prevPhotos];
          newPhotos[index] = { ...newPhotos[index], description };
          return newPhotos;
      });
  }, []);

  const validateForm = useCallback((): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    questionnaireData.sections.forEach((section: Section) => {
      section.questions.forEach((question: Question) => {
        if (question.required) {
          const value = formData[question.id];
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrors[question.id] = language === 'th' ? 'กรุณากรอกข้อมูลนี้' : 'This field is required';
          }
        }
      });
    });
    return newErrors;
  }, [formData, language]);

  const handleExport = async (format: 'png' | 'pdf') => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorId = Object.keys(validationErrors)[0];
      const errorElement = document.getElementById(`field-container-${firstErrorId}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSaving(true);
    
    const companyName = formData.companyName as string || 'SOLARIUM-Questionnaire';
    const sanitizedFileName = companyName.replace(/[\\/:*?"<>|]/g, '-').trim() || 'SOLARIUM-Questionnaire';
    let exportSuccess = false;

    if (format === 'pdf') {
        const originalTitle = document.title;
        document.title = `${sanitizedFileName}.pdf`;
        
        setTimeout(() => {
            window.print();
            document.title = originalTitle;
            setIsSaving(false); 
        }, 100);
        exportSuccess = true;
    } else if (format === 'png') {
        try {
            const elementToCapture = document.getElementById('capture-area');
            if (!elementToCapture) {
                throw new Error('Could not find element to capture');
            }
            const canvas = await (window as any).html2canvas(elementToCapture, { scale: 2 });
            const link = document.createElement('a');
            link.download = `${sanitizedFileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            exportSuccess = true;
        } catch(err) {
            console.error("Failed to export as PNG", err);
            alert("Sorry, there was an error creating the PNG file.");
        } finally {
            setIsSaving(false);
        }
    }

    if (exportSuccess) {
        const hasData = formData.avgMonthlyBill || formData.peakDemand || formData.onPeakConsumption || formData.offPeakConsumption;
        if (hasData) {
            setShowChart(true);
        }
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        .no-export {
          display: none !important;
        }
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        #capture-area {
            padding-top: 0 !important;
        }
        main {
            padding-top: 1rem !important;
        }
        fieldset {
            break-inside: avoid;
            margin-top: 0;
            padding-top: 2.5rem;
        }
        legend {
          margin-top: -2.5rem;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('print-styles');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // On unmount, revoke any lingering object URLs
  useEffect(() => {
    return () => {
        photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    }
  }, []);

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div id="capture-area" className="container mx-auto max-w-4xl bg-white shadow-lg">
        <Header language={language} setLanguage={setLanguage} />
        <main className="px-4 py-8 pb-24">
            <QuestionnaireForm
            questionnaire={questionnaireData}
            language={language}
            formData={formData}
            onInputChange={handleInputChange}
            photos={photos}
            onAddPhotos={handleAddPhotos}
            onRemovePhoto={handleRemovePhoto}
            onDescriptionChange={handlePhotoDescriptionChange}
            errors={errors}
            />
        </main>
      </div>
      <Footer onExport={handleExport} isSaving={isSaving} language={language} />
      
      {showChart && (
        <DataChart 
          formData={formData}
          language={language}
          onClose={() => setShowChart(false)}
        />
      )}
    </div>
  );
}

export default App;