export type Language = 'th' | 'en';

export interface FormData {
  [key: string]: string | string[] | number | undefined;
}

export type QuestionType = 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'dropdown';

export interface QuestionOption {
  value: string;
  label: {
    [key in Language]: string;
  };
}

export interface Question {
  id: string;
  type: QuestionType;
  label: {
    [key in Language]: string;
  };
  placeholder?: {
    [key in Language]: string;
  };
  options?: QuestionOption[];
  required?: boolean;
}

export interface Section {
  id: string;
  title: {
    [key in Language]: string;
  };
  questions: Question[];
}

export interface Questionnaire {
  sections: Section[];
}

export interface PhotoData {
  file: File;
  preview: string;
  description: string;
}
