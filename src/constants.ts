import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: 'Brain',
    description: 'Supervised, Unsupervised, and Reinforcement learning concepts.',
    suggestedQuestions: [
      'What is the difference between Supervised and Unsupervised learning?',
      'Explain Random Forest with a real-world analogy.',
      'How do I evaluate a classification model?'
    ]
  },
  {
    id: 'preprocessing',
    title: 'Data Preprocessing',
    icon: 'Filter',
    description: 'Cleaning, scaling, and handling missing values.',
    suggestedQuestions: [
      'How do I handle missing values in Pandas?',
      'What is Standard Scaling and why do we need it?',
      'How to handle categorical data for ML?'
    ]
  },
  {
    id: 'python',
    title: 'Python Ecosystem',
    icon: 'Code',
    description: 'Pandas, NumPy, Scikit-Learn, and more.',
    suggestedQuestions: [
      'Show me how to use groupby in Pandas.',
      'How to create a NumPy array from a list?',
      'What are the basic steps to build a model in Scikit-Learn?'
    ]
  },
  {
    id: 'viz',
    title: 'Visualization',
    icon: 'BarChart',
    description: 'Storytelling with Matplotlib and Seaborn.',
    suggestedQuestions: [
      'How to create a scatter plot in Matplotlib?',
      'What is the best chart for showing correlations?',
      'How to customize labels and titles in Seaborn?'
    ]
  },
  {
    id: 'certificates',
    title: 'Certifications',
    icon: 'Award',
    description: 'Professional certifications and course completions.',
    isCertificate: true,
    certificateDetails: {
      course: 'Essentials for Data Science',
      provider: 'L&T EduTech',
      date: '23 Jul 2025 to 30 Oct 2025',
      grade: 'B'
    },
    suggestedQuestions: [
      'Tell me about my Essentials for Data Science certificate.',
      'What was the duration of my L&T EduTech course?',
      'What grade did I achieve in my Data Science certification?'
    ]
  },
  {
    id: 'student-analysis',
    title: 'Student Background Analysis',
    icon: 'Layout',
    description: 'Comprehensive analysis of student economic and academic performance using Power BI.',
    isProject: true,
    projectDetails: {
      title: 'Student Economic Background & Academic',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
      metrics: [
        { label: 'Total Unique Attendees', value: '2157' },
        { label: 'Avg Salary by Family Income', value: '13.94' },
        { label: 'Avg CGPA', value: '8.04' },
        { label: 'Students Count', value: '4894' },
        { label: 'Average Family Income', value: '1.31' }
      ],
      visualizations: [
        'Students by City (Gauge)',
        'Avg CGPA and Sum of Family Income (Bar)',
        'Avg GPA by College and Sum of CGPA (Donut)',
        'Students per Event (Area)',
        'Students by Promotion Channel (Pie)',
        'Sum of Year of Graduation by City (Bar)',
        'Students for Data Science (Bar)',
        'Sum of Experience with Python (Bar)',
        'Avg CGPA by City (Bar)'
      ]
    },
    suggestedQuestions: [
      'What are the key findings from the Student Background Analysis project?',
      'How does family income correlate with student CGPA in this dataset?',
      'Which cities have the highest student attendance?',
      'Show me the distribution of students across different events.'
    ]
  }
];
