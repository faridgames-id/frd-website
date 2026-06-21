"use client";
import React, { useState, useRef, useEffect } from 'react';

export function AdminContactDropdown({ 
  className = "",
  buttonText = "Hubungi Admin via WA",
  mainNumber = "6287814897713",
  backupNumber = "6285741257176" // Updated Admin 2 number
}: { 
  className?: string;
  buttonText?: string;
  mainNumber?: string;
  backupNumber?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-blue flex items-center justify-center gap-2 animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none ${className}`}
        style={{
          boxShadow: isOpen ? '0 8px 25px rgba(79,142,247,0.5)' : '0 0 20px rgba(79,142,247,0.3)',
          transform: isOpen ? 'scale(1.05) translateY(-2px)' : undefined
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        {buttonText}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[280px] bg-gradient-to-b from-[#111827]/95 to-[#0A0C14]/95 border border-white/20 rounded-[20px] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] z-[100] animate-in fade-in zoom-in-95 duration-300 origin-bottom">
          
          <a 
            href={`https://wa.me/${mainNumber}`} 
            target="_blank" rel="noopener noreferrer"
            className="relative flex items-center gap-4 p-3.5 rounded-[14px] hover:bg-white/5 transition-all duration-300 group overflow-hidden"
          >
            {/* Hover subtle glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#25D366]/30 to-[#25D366]/5 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </div>
            <div className="relative z-10 flex-1">
              <div className="text-white font-bold text-[15px] leading-tight group-hover:text-[#25D366] transition-colors duration-300">Admin 1 (Utama)</div>
              <div className="text-[#25D366] text-xs mt-1 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_5px_#25D366]"></span>
                Fast Response
              </div>
            </div>
          </a>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1.5"></div>
          
          <a 
            href={`https://wa.me/${backupNumber}`} 
            target="_blank" rel="noopener noreferrer"
            className="relative flex items-center gap-4 p-3.5 rounded-[14px] hover:bg-white/5 transition-all duration-300 group overflow-hidden"
          >
            {/* Hover subtle glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4F8EF7]/0 via-[#4F8EF7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#4F8EF7]/30 to-[#4F8EF7]/5 border border-[#4F8EF7]/30 flex items-center justify-center text-[#4F8EF7] group-hover:scale-110 group-hover:bg-[#4F8EF7] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(79,142,247,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </div>
            <div className="relative z-10 flex-1">
              <div className="text-white font-bold text-[15px] leading-tight group-hover:text-[#4F8EF7] transition-colors duration-300">Admin 2 (Cadangan)</div>
              <div className="text-slate-400 text-xs mt-1 font-medium group-hover:text-slate-300 transition-colors duration-300">
                Jika admin 1 sibuk
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
