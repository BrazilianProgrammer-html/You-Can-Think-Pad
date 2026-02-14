
import React, { useState, useEffect, useCallback } from 'react';
import ThinkPad from './components/ThinkPad';

const App: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleInput = useCallback((val: string) => {
    if (result !== null) {
      // If we just got a result, typing a number starts fresh
      if (!['+', '-', '*', '/'].includes(val)) {
        setDisplay(val);
        setResult(null);
        return;
      } else {
        // If typing an operator, use the result
        setDisplay(result + val);
        setResult(null);
        return;
      }
    }

    if (val === 'C') {
      setDisplay('');
      setResult(null);
    } else if (val === 'OK!') {
      try {
        // Simple safety check: only allow numbers and basic operators
        // Replace visual * and / if we were using them, though we use buttons
        const evalResult = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
        const resStr = String(evalResult);
        setHistory(prev => [...prev.slice(-2), `${display} = ${resStr}`]);
        setDisplay(resStr);
        setResult(resStr);
      } catch (e) {
        setDisplay('ERROR');
        setTimeout(() => setDisplay(''), 1000);
      }
    } else {
      setDisplay(prev => prev + val);
    }
  }, [display, result]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9]/.test(key)) handleInput(key);
      if (['+', '-', '*', '/'].includes(key)) handleInput(key);
      if (key === 'Enter') handleInput('OK!');
      if (key === 'Escape' || key === 'Backspace') handleInput('C');
      if (key === '.') handleInput('.');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <ThinkPad 
        display={display} 
        history={history} 
        onInput={handleInput} 
      />
    </div>
  );
};

export default App;
