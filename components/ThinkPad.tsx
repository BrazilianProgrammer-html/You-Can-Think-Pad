
import React from 'react';

interface ThinkPadProps {
  display: string;
  history: string[];
  onInput: (val: string) => void;
}

const ThinkPad: React.FC<ThinkPadProps> = ({ display, history, onInput }) => {
  return (
    <div className="relative flex flex-col items-center select-none scale-75 md:scale-100 lg:scale-125">
      {/* Top Antenna and Bulbs */}
      <div className="absolute -top-16 right-32 flex flex-col items-center">
        <div className="w-4 h-20 bg-gray-400 rounded-full transform rotate-12 origin-bottom low-poly-shadow"></div>
        <div className="w-10 h-10 bg-red-600 rounded-full absolute -top-8 -right-2 low-poly-shadow"></div>
      </div>
      
      <div className="absolute -top-12 left-10">
        <div className="w-24 h-16 bg-purple-700 rounded-full transform -rotate-12 low-poly-shadow border-4 border-purple-900"></div>
      </div>

      {/* Main Body */}
      <div className="bg-[#28ae24] p-6 rounded-[40px] border-[12px] border-[#1e851a] flex low-poly-shadow relative z-10" style={{ width: '800px', height: '500px' }}>
        
        {/* Left Side Operators Area */}
        <div className="flex flex-col justify-between w-24 mr-4">
          <div className="h-4"></div> {/* spacer */}
          <OperatorBox label="+" onClick={() => onInput('+')} />
          <OperatorBox label="×" onClick={() => onInput('*')} />
          <OperatorBox label="÷" onClick={() => onInput('/')} />
          <div className="h-20 bg-black rounded-lg border-4 border-[#1e851a] flex items-center justify-center overflow-hidden">
             {/* Baldi's face or just a black void */}
             <div className="text-white text-[8px]">SYSTEM ACTIVE</div>
          </div>
        </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="text-[#1546b5] text-3xl mb-2 ml-4">You Can Think Pad</div>
          
          {/* Main Large Screen */}
          <div className="flex-1 bg-white rounded-lg border-8 border-[#1e851a] mb-4 p-4 screen-inner-shadow overflow-hidden flex flex-col justify-end items-end">
            {history.map((h, i) => (
              <div key={i} className="text-gray-400 text-xl font-bold">{h}</div>
            ))}
            <div className="text-black text-5xl font-bold tracking-widest break-all text-right mt-2">
              {display || '0'}
            </div>
          </div>

          {/* Bottom Message Screen */}
          <div className="h-20 bg-white rounded-lg border-8 border-[#1e851a] p-2 screen-inner-shadow flex items-center justify-center">
            <div className="text-blue-600 text-2xl animate-pulse">
                {display.length > 0 ? "CALCULATING..." : "READY TO THINK!"}
            </div>
          </div>
        </div>

        {/* Right Side Numpad Area */}
        <div className="w-56 ml-6 flex flex-col">
          <div className="grid grid-cols-3 gap-2 bg-[#21901d] p-3 rounded-xl border-4 border-[#155e12]">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
              <KeyButton key={num} label={String(num)} onClick={() => onInput(String(num))} />
            ))}
            <KeyButton label="C" onClick={() => onInput('C')} color="bg-purple-600" />
            <KeyButton label="0" onClick={() => onInput('0')} />
            <KeyButton label="-" onClick={() => onInput('-')} color="bg-purple-600" />
          </div>
          
          {/* Giant OK! Button */}
          <button 
            onClick={() => onInput('OK!')}
            className="mt-6 flex-1 bg-[#9e1ca7] hover:bg-[#b921c3] active:bg-[#7a1581] border-8 border-[#7a1581] rounded-full flex items-center justify-center transition-all transform active:scale-95 low-poly-shadow"
          >
            <span className="text-white text-6xl font-black italic tracking-tighter">OK!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const OperatorBox: React.FC<{ label: string, onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="h-14 bg-white rounded-lg border-4 border-[#1e851a] flex items-center justify-center text-4xl font-bold text-gray-800 hover:bg-gray-100 transition-colors screen-inner-shadow"
  >
    {label}
  </button>
);

const KeyButton: React.FC<{ label: string, onClick: () => void, color?: string }> = ({ label, onClick, color = "bg-purple-600" }) => (
  <button 
    onClick={onClick}
    className={`${color} hover:opacity-90 active:opacity-100 active:scale-95 border-b-4 border-r-4 border-black/40 text-white text-3xl p-2 rounded-lg low-poly-shadow font-bold flex items-center justify-center transition-all`}
  >
    {label}
  </button>
);

export default ThinkPad;
