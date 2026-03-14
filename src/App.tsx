import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Filter, 
  Code, 
  BarChart, 
  Send, 
  User, 
  Bot, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  Terminal,
  MessageSquare,
  PlusCircle,
  History,
  Award,
  Calendar,
  GraduationCap,
  Layout,
  TrendingUp
} from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { dataSenseService } from './services/geminiService';
import { Message, Topic } from './types';
import { TOPICS } from './constants';
import { CertificateCard } from './components/CertificateCard';
import { ProjectDashboard } from './components/ProjectDashboard';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [introStep, setIntroStep] = useState<'name' | 'info' | 'certificate' | 'app'>('name');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Greetings, explorer! I'm **DataSense**, your cosmic Data Science Tutor. Ready to navigate the vast universe of Machine Learning and Python today?",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introStep === 'name') {
      const timer = setTimeout(() => setIntroStep('info'), 3000);
      return () => clearTimeout(timer);
    }
    if (introStep === 'info') {
      const timer = setTimeout(() => setIntroStep('certificate'), 5000);
      return () => clearTimeout(timer);
    }
    if (introStep === 'certificate') {
      const timer = setTimeout(() => setIntroStep('app'), 6000);
      return () => clearTimeout(timer);
    }
  }, [introStep]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (introStep === 'app') {
      scrollToBottom();
    }
  }, [messages, introStep]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'model',
        content: '',
        timestamp: Date.now(),
      }]);

      let fullResponse = '';
      const stream = dataSenseService.chatStream(text, history);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId ? { ...m, content: fullResponse } : m
        ));
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'model',
        content: "I'm sorry, my cosmic sensors encountered an error. Please try again.",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Filter': return <Filter className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex h-screen bg-space-950 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 star-field pointer-events-none" />
      <div className="absolute inset-0 nebula-glow pointer-events-none" />

      <AnimatePresence mode="wait">
        {introStep === 'name' && (
          <motion.div
            key="intro-name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-space-950"
          >
            <div className="text-center">
              <motion.h1 
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.1em", opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-5xl md:text-7xl font-bold text-white uppercase tracking-widest"
              >
                PRATHAMA GAIKWAD
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
                className="h-1 bg-purple-500 mt-4 mx-auto shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              />
            </div>
          </motion.div>
        )}

        {introStep === 'info' && (
          <motion.div
            key="intro-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-space-950/90 backdrop-blur-sm"
          >
            <div className="max-w-lg w-full p-8 bg-space-900/80 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <User className="w-32 h-32" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="w-8 h-8 text-purple-400" /> Personal Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Address</p>
                    <p className="text-lg text-slate-200">prathmagaikwad421@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Role</p>
                    <p className="text-lg text-slate-200">Data Science Enthusiast & Explorer</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Interests</p>
                    <p className="text-lg text-slate-200">Machine Learning, Python, Cosmic Data</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Initializing DataSense...</span>
                <button 
                  onClick={() => setIntroStep('app')}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                  Enter App
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {introStep === 'certificate' && (
          <motion.div
            key="intro-certificate"
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-space-950/95 backdrop-blur-md p-4"
          >
            <div className="max-w-4xl w-full">
              <CertificateCard 
                name="Prathma Gaikwad"
                course="Essentials for Data Science"
                institution="B. K. Birla College of Arts, Science & Commerce (Autonomous), Kalyan"
                period="23 Jul 2025 to 30 Oct 2025"
                grade="B"
              />
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setIntroStep('app')}
                  className="px-8 py-3 bg-white text-purple-600 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
                >
                  Continue to Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {introStep === 'app' && (
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex w-full h-full"
          >
            {/* Sidebar */}
            <aside className="w-72 bg-space-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col hidden md:flex relative z-10">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3 text-purple-400 mb-2">
                  <div className="bg-purple-500/20 p-2 rounded-xl ring-1 ring-purple-500/30">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-white">DataSense</h1>
                </div>
                <p className="text-[10px] text-purple-300/60 font-bold uppercase tracking-widest">Cosmic Tutor Edition</p>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h2 className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Learning Path
                  </h2>
                  <div className="space-y-1">
                    {TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopic(topic)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                          activeTopic?.id === topic.id 
                            ? "bg-purple-500/10 text-purple-300 shadow-sm ring-1 ring-purple-500/30" 
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        )}
                      >
                        <span className={cn(
                          "p-1.5 rounded-md transition-colors",
                          activeTopic?.id === topic.id ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-slate-500 group-hover:bg-white/10"
                        )}>
                          {getTopicIcon(topic.icon)}
                        </span>
                        <span className="flex-1 text-left">{topic.title}</span>
                        {topic.isCertificate && (
                          <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full border border-purple-500/30 font-bold uppercase tracking-tighter">Verified</span>
                        )}
                        {topic.isProject && (
                          <span className="text-[8px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30 font-bold uppercase tracking-tighter">Project</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {activeTopic && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h2 className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> Mission Control
                    </h2>
                    <div className="space-y-2">
                      {activeTopic.isCertificate && activeTopic.certificateDetails && (
                        <div className="px-3 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Verified Credential</span>
                          </div>
                          <p className="text-xs text-slate-200 font-bold leading-tight mb-1">{activeTopic.certificateDetails.course}</p>
                          <p className="text-[10px] text-slate-500">{activeTopic.certificateDetails.provider}</p>
                        </div>
                      )}
                      {activeTopic.isProject && activeTopic.projectDetails && (
                        <div className="px-3 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Active Project</span>
                          </div>
                          <p className="text-xs text-slate-200 font-bold leading-tight mb-1">{activeTopic.projectDetails.title}</p>
                          <p className="text-[10px] text-slate-500">Interactive Dashboard</p>
                        </div>
                      )}
                      {activeTopic.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(q)}
                          className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-purple-400 hover:bg-purple-500/5 rounded-md transition-colors border border-transparent hover:border-purple-500/20"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div>
                  <h2 className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <User className="w-3 h-3" /> Portfolio
                  </h2>
                  <button
                    onClick={() => setIntroStep('certificate')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all group"
                  >
                    <span className="p-1.5 rounded-md bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-purple-400 transition-colors">
                      <Award className="w-5 h-5" />
                    </span>
                    View Certificate
                  </button>
                </div>
              </nav>

              <div className="p-4 border-t border-white/5">
                <button 
                  onClick={() => setMessages([{ id: 'welcome', role: 'model', content: "Greetings, explorer! I'm **DataSense**, your cosmic Data Science Tutor. Ready to navigate the vast universe of Machine Learning and Python today?", timestamp: Date.now() }])}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" /> Reset Mission
                </button>
              </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative z-10">
              {/* Header */}
              <header className="h-16 bg-space-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="md:hidden bg-purple-500/20 p-1.5 rounded-lg text-purple-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {activeTopic ? activeTopic.title : "Cosmic Assistant"}
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                      <span className="text-[10px] text-purple-300/60 uppercase tracking-widest font-bold">Signal Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
                    <History className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              </header>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-8 pb-12">
                  {/* Certificate Card if active */}
                  {activeTopic?.isCertificate && activeTopic.certificateDetails && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-8"
                    >
                      <CertificateCard 
                        name="Prathma Gaikwad"
                        course={activeTopic.certificateDetails.course}
                        institution="B. K. Birla College of Arts, Science & Commerce (Autonomous), Kalyan"
                        period={activeTopic.certificateDetails.date}
                        grade={activeTopic.certificateDetails.grade}
                        compact={true}
                      />
                    </motion.div>
                  )}

                  {/* Project Dashboard if active */}
                  {activeTopic?.isProject && activeTopic.projectDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <ProjectDashboard 
                        title={activeTopic.projectDetails.title}
                        metrics={activeTopic.projectDetails.metrics}
                        visualizations={activeTopic.projectDetails.visualizations}
                        imageUrl={activeTopic.projectDetails.imageUrl}
                      />
                    </motion.div>
                  )}

                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex gap-4",
                          message.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                          message.role === 'user' ? "bg-white text-space-950" : "bg-purple-600 text-white shadow-purple-500/20"
                        )}>
                          {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                          "flex flex-col max-w-[85%]",
                          message.role === 'user' ? "items-end" : "items-start"
                        )}>
                          <div className={cn(
                            "px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm",
                            message.role === 'user' 
                              ? "bg-white text-space-950 rounded-tr-none" 
                              : "bg-space-900/80 border border-white/10 text-slate-200 rounded-tl-none"
                          )}>
                            <div className="markdown-body">
                              <Markdown>{message.content}</Markdown>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 px-1 font-medium">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 animate-pulse shadow-lg shadow-purple-500/20">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-space-900/80 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-space-950/50 backdrop-blur-xl border-t border-white/5">
                <div className="max-w-3xl mx-auto relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Transmit your query to DataSense..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 pr-14 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all resize-none min-h-[60px] max-h-[200px] backdrop-blur-sm"
                    rows={1}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "absolute right-3 bottom-3 p-2 rounded-xl transition-all",
                      input.trim() && !isLoading 
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700" 
                        : "bg-white/5 text-slate-600 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-[0.3em] font-bold">
                  Cosmic Intelligence • DataSense v2.0
                </p>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
