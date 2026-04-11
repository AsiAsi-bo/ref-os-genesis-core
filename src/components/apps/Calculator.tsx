
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === "-" ? display.substr(1) : "-" + display);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue: number;
      switch (operation) {
        case "+": newValue = currentValue + inputValue; break;
        case "-": newValue = currentValue - inputValue; break;
        case "×": newValue = currentValue * inputValue; break;
        case "÷": newValue = currentValue / inputValue; break;
        default: newValue = inputValue;
      }
      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const buttons = [
    { text: "C", type: "function", action: clearAll },
    { text: "±", type: "function", action: toggleSign },
    { text: "%", type: "function", action: handlePercent },
    { text: "÷", type: "operator", action: () => performOperation("÷") },
    { text: "7", type: "digit", action: () => inputDigit("7") },
    { text: "8", type: "digit", action: () => inputDigit("8") },
    { text: "9", type: "digit", action: () => inputDigit("9") },
    { text: "×", type: "operator", action: () => performOperation("×") },
    { text: "4", type: "digit", action: () => inputDigit("4") },
    { text: "5", type: "digit", action: () => inputDigit("5") },
    { text: "6", type: "digit", action: () => inputDigit("6") },
    { text: "-", type: "operator", action: () => performOperation("-") },
    { text: "1", type: "digit", action: () => inputDigit("1") },
    { text: "2", type: "digit", action: () => inputDigit("2") },
    { text: "3", type: "digit", action: () => inputDigit("3") },
    { text: "+", type: "operator", action: () => performOperation("+") },
    { text: "0", type: "digit", action: () => inputDigit("0") },
    { text: ".", type: "digit", action: inputDecimal },
    { text: "=", type: "equals", action: () => performOperation("=") }
  ];

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Display */}
      <div className="p-6 text-right">
        <div className="text-xs text-white/30 h-5">
          {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
        </div>
        <div className="font-light text-4xl text-white tracking-tight truncate">{display}</div>
      </div>

      {/* Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-[1px] p-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={cn(
              "rounded-xl font-light text-xl transition-all active:scale-95",
              button.type === "operator" && "bg-refos-primary/80 hover:bg-refos-primary text-white",
              button.type === "equals" && "bg-refos-primary hover:bg-refos-primary/90 text-white",
              button.type === "function" && "bg-white/[0.08] hover:bg-white/[0.12] text-white/80",
              button.type === "digit" && "bg-white/[0.04] hover:bg-white/[0.08] text-white",
              button.text === "0" && "col-span-2"
            )}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
