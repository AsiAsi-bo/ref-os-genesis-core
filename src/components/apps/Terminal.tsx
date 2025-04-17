
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Command = {
  input: string;
  output: string;
};

const TerminalApp: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([
    { input: 'help', output: 'Available commands: help, echo, date, ls, clear, whoami, version' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input when terminal is clicked
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    // Scroll to bottom when commands change
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, [commands]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      processCommand(currentInput);
      setCurrentInput('');
    }
  };
  
  const processCommand = (input: string) => {
    const trimmedInput = input.trim();
    const parts = trimmedInput.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';
    
    switch (command) {
      case 'help':
        output = 'Available commands:\n' +
                '  help           - Display this help message\n' +
                '  echo [text]    - Display text\n' +
                '  date           - Display current date and time\n' +
                '  ls             - List files in current directory\n' +
                '  clear          - Clear the terminal\n' +
                '  whoami         - Display current user\n' +
                '  version        - Display OS version';
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'ls':
        output = 'Documents/\nDownloads/\nPictures/\nMusic/\nVideos/\nsystem.cfg\nreadme.txt';
        break;
      case 'clear':
        setCommands([]);
        return;
      case 'whoami':
        output = 'user@refos';
        break;
      case 'version':
        output = 'Ref OS v1.0.0\nBuild: 2025.04.17';
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    setCommands([...commands, { input: trimmedInput, output }]);
  };
  
  return (
    <div 
      ref={terminalRef}
      className="flex flex-col h-full bg-[#1A1A20] p-4 text-green-400 font-mono text-sm overflow-auto"
    >
      <div className="mb-2">
        <p className="text-refos-primary mb-1">Ref OS Terminal v1.0.0</p>
        <p className="text-white/60 text-xs mb-3">Type 'help' for available commands</p>
      </div>
      
      {commands.map((cmd, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <span className="text-blue-400 mr-2">user@refos:~$</span>
            <span>{cmd.input}</span>
          </div>
          <div className="whitespace-pre-line pl-2">{cmd.output}</div>
        </div>
      ))}
      
      <div className="flex mt-1">
        <span className="text-blue-400 mr-2">user@refos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono text-sm"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;
