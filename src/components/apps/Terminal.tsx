import React, { useState, useRef, useEffect, useCallback } from 'react';
import HackSequence from './terminal/HackSequence';
import MatrixRain from './terminal/MatrixRain';

type Command = {
  input: string;
  output: string;
};

const TerminalApp: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([
    { input: 'help', output: 'Available commands: help, echo, date, ls, clear, whoami, version, hack, matrix' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, isHacking]);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  const handleHackComplete = useCallback(() => {
    setIsHacking(false);
  }, []);

  const startMatrix = useCallback(() => {
    setMatrixActive(true);
    setTimeout(() => setMatrixActive(false), 5000);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim() && !isHacking) {
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
          '  version        - Display OS version\n' +
          '  hack           - 🔓 Launch penetration test\n' +
          '  matrix         - 💊 Enter the Matrix';
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
      case 'hack':
        setCommands(prev => [...prev, { input: trimmedInput, output: '' }]);
        setIsHacking(true);
        return;
      case 'matrix':
        output = 'Entering the Matrix... (5s)';
        setCommands(prev => [...prev, { input: trimmedInput, output }]);
        startMatrix();
        return;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setCommands(prev => [...prev, { input: trimmedInput, output }]);
  };

  return (
    <div
      ref={terminalRef}
      className="flex flex-col h-full bg-[#0a0a0f] p-4 font-mono text-sm overflow-auto relative"
      style={{ textShadow: '0 0 1px rgba(0, 255, 100, 0.3)' }}
    >
      {matrixActive && <MatrixRain />}

      <div className="mb-2 relative z-20">
        <p className="text-purple-400 mb-1 font-bold">Ref OS Terminal v1.0.0</p>
        <p className="text-white/40 text-xs mb-3">Type 'help' for available commands • 'hack' for fun</p>
      </div>

      {commands.map((cmd, index) => (
        <div key={index} className="mb-2 relative z-20">
          <div className="flex">
            <span className="text-cyan-400 mr-2">user@refos:~$</span>
            <span className="text-green-400">{cmd.input}</span>
          </div>
          {cmd.output && <div className="whitespace-pre-line pl-2 text-green-400">{cmd.output}</div>}
        </div>
      ))}

      {isHacking && (
        <div className="mb-2 relative z-20">
          <HackSequence onComplete={handleHackComplete} />
        </div>
      )}

      {!isHacking && (
        <div className="flex mt-1 relative z-20">
          <span className="text-cyan-400 mr-2">user@refos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 font-mono text-sm caret-green-400"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default TerminalApp;
