import React from 'react';
import { motion } from 'motion/react';

interface CertificateCardProps {
  name: string;
  course: string;
  institution: string;
  period: string;
  grade: string;
  compact?: boolean;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  name,
  course,
  institution,
  period,
  grade,
  compact = false
}) => {
  return (
    <div className={`w-full p-1 bg-gradient-to-br from-purple-500/50 via-blue-500/50 to-purple-500/50 ${compact ? 'rounded-xl' : 'rounded-[2rem]'} shadow-[0_0_50px_rgba(168,85,247,0.3)]`}>
      <div className={`bg-white ${compact ? 'rounded-lg p-6' : 'rounded-[1.8rem] p-12'} text-slate-900 relative overflow-hidden`}>
        {/* Certificate Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className={`absolute top-0 left-0 w-full h-full border-slate-900 ${compact ? 'border-[10px]' : 'border-[40px]'}`} />
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-slate-900" />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`flex items-center gap-4 ${compact ? 'mb-4' : 'mb-8'}`}>
            <div className={`${compact ? 'w-8 h-8 text-xs' : 'w-16 h-16 text-2xl'} bg-blue-600 rounded-full flex items-center justify-center text-white font-bold`}>L&T</div>
            <div className="text-left">
              <h3 className={`${compact ? 'text-sm' : 'text-2xl'} font-bold text-blue-900 leading-tight`}>L&T EduTech</h3>
              <p className={`${compact ? 'text-[8px]' : 'text-xs'} text-blue-600 font-bold tracking-widest uppercase`}>CollegeConnect</p>
            </div>
          </div>

          <h2 className={`${compact ? 'text-xl' : 'text-5xl'} font-serif font-bold text-slate-800 ${compact ? 'mb-2' : 'mb-4'} tracking-tight`}>CERTIFICATE OF COMPLETION</h2>
          <p className={`${compact ? 'text-xs' : 'text-lg'} text-slate-500 italic ${compact ? 'mb-4' : 'mb-8'}`}>This is to certify that</p>
          
          <div className={`${compact ? 'mb-4' : 'mb-8'}`}>
            <h4 className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-slate-900 border-b-2 border-slate-200 pb-1 px-4 inline-block`}>
              {name}
            </h4>
            <p className={`${compact ? 'text-[10px]' : 'text-sm'} text-slate-500 mt-2 font-medium`}>
              of {institution}
            </p>
          </div>

          <p className={`${compact ? 'text-[10px]' : 'text-md'} text-slate-600 mb-2`}>has successfully completed the course</p>
          <h3 className={`${compact ? 'text-lg' : 'text-3xl'} font-bold text-blue-700 ${compact ? 'mb-4' : 'mb-8'}`}>{course}</h3>
          
          <div className={`flex items-center justify-center ${compact ? 'gap-6 mb-6' : 'gap-12 mb-12'}`}>
            <div className="text-center">
              <p className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-slate-400 uppercase tracking-widest font-bold mb-1`}>Period</p>
              <p className={`${compact ? 'text-xs' : 'text-slate-800'} font-bold`}>{period}</p>
            </div>
            <div className="relative">
              <div className={`${compact ? 'w-12 h-12 border-2' : 'w-20 h-20 border-4'} border-blue-500 rounded-full flex items-center justify-center`}>
                <span className={`${compact ? 'text-xl' : 'text-3xl'} font-black text-blue-600`}>{grade}</span>
              </div>
              <div className={`absolute ${compact ? '-bottom-1' : '-bottom-2'} left-1/2 -translate-x-1/2 bg-blue-500 text-white ${compact ? 'text-[6px]' : 'text-[10px]'} font-bold px-2 py-0.5 rounded`}>GRADE</div>
            </div>
          </div>

          {!compact && (
            <div className="flex justify-between w-full items-end">
              <div className="text-left">
                <div className="w-32 h-px bg-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-800">M.F.Febin</p>
                <p className="text-[10px] text-slate-500">Head, L&T EduTech</p>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg">
                <div className="w-16 h-16 bg-slate-300 rounded flex items-center justify-center text-[8px] text-slate-500">QR CODE</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
