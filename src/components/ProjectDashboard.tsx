import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Award, MapPin, PieChart, Activity } from 'lucide-react';

interface ProjectDashboardProps {
  title: string;
  metrics: { label: string; value: string }[];
  visualizations: string[];
  imageUrl?: string;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ title, metrics, visualizations, imageUrl }) => {
  return (
    <div className="bg-space-900/80 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity className="w-32 h-32 text-purple-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>

        {imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
          >
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <PieChart className="w-3 h-3" /> Key Visualizations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {visualizations.map((viz, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                <span className="text-xs text-slate-300">{viz}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <MapPin className="w-3 h-3" />
            <span>Geospatial Analysis Included</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Users className="w-3 h-3" />
            <span>Demographic Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};
