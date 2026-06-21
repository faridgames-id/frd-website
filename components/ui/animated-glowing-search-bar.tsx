import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchComponent = () => {
  return (
    <div className="relative flex items-center justify-center py-10">
      <div className="absolute z-[-1] w-full h-full"></div>
      <div id="poda" className="relative flex items-center justify-center group">
        
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] max-w-[314px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#1e3a8a_5%,#000_38%,#000_50%,#ffffff_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
        </div>
        
        {[1, 2, 3].map((layer) => (
          <div key={layer} className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[312px] rounded-xl blur-[3px] 
                          before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                          before:bg-[conic-gradient(rgba(0,0,0,0),#0f172a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#ffffff,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                          group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
          </div>
        ))}

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[63px] max-w-[307px] rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#1e3a8a,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#ffffff,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[59px] max-w-[303px] rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#0A0C14,#1e3a8a_5%,#0A0C14_14%,#0A0C14_50%,#ffffff_60%,#0A0C14_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div id="main" className="relative group">
          <input 
            placeholder="Search accounts..." 
            type="text" 
            name="text" 
            className="bg-[#0A0C14] border-none w-[301px] h-[56px] rounded-lg text-white px-[59px] text-lg focus:outline-none placeholder-slate-500 font-sans" 
          />
          
          <div id="input-mask" className="pointer-events-none w-[100px] h-[20px] absolute bg-gradient-to-r from-transparent to-[#0A0C14] top-[18px] left-[70px] group-focus-within:hidden"></div>
          
          <div id="blue-mask" className="pointer-events-none w-[30px] h-[20px] absolute bg-[#ffffff] top-[10px] left-[5px] blur-2xl opacity-60 transition-all duration-2000 group-hover:opacity-0"></div>
          
          <div className="absolute h-[42px] w-[40px] overflow-hidden top-[7px] right-[7px] rounded-lg
                          before:absolute before:content-[''] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90
                          before:bg-[conic-gradient(rgba(0,0,0,0),#1e3a8a,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_50%,#ffffff,rgba(0,0,0,0)_100%)]
                          before:brightness-135 before:animate-[spin_4s_linear_infinite]">
          </div>
          
          <div id="filter-icon" className="absolute top-2 right-2 flex items-center justify-center z-[2] max-h-10 max-w-[38px] h-full w-full [isolation:isolate] overflow-hidden rounded-lg bg-gradient-to-b from-[#161925] via-black to-[#0A0C14] border border-transparent cursor-pointer hover:brightness-125 transition-all">
             <SlidersHorizontal className="text-white w-5 h-5 opacity-80" />
          </div>
          
          <div id="search-icon" className="absolute left-5 top-[16px] pointer-events-none">
             <Search className="text-white w-[22px] h-[22px] opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
