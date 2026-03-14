export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  suggestedQuestions: string[];
  isCertificate?: boolean;
  isProject?: boolean;
  certificateDetails?: {
    course: string;
    provider: string;
    date: string;
    grade: string;
  };
  projectDetails?: {
    title: string;
    metrics: { label: string; value: string }[];
    visualizations: string[];
    imageUrl?: string;
  };
}
