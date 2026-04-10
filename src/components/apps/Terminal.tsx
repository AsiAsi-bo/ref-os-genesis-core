
import React, { useState, useRef, useEffect, useCallback } from 'react';

type Command = {
  input: string;
  output: string;
  isHack?: boolean;
};

const HACK_LINES = [
  '[*] Initializing exploit framework...',
  '[*] Scanning target network 192.168.1.0/24...',
  '[+] Host discovered: 192.168.1.105 (OPEN)',
  '[*] Running port scan on 192.168.1.105...',
  '[+] Port 22 (SSH) — OPEN',
  '[+] Port 80 (HTTP) — OPEN',
  '[+] Port 443 (HTTPS) — OPEN',
  '[+] Port 3306 (MySQL) — OPEN',
  '[!] Vulnerability detected: CVE-2025-31337',
  '[*] Loading payload: reverse_shell.bin',
  '[*] Establishing encrypted tunnel...',
  '[+] Tunnel established via TLS 1.3',
  '[*] Bypassing firewall rules...',
  '[+] Firewall bypassed successfully',
  '[*] Injecting payload into target...',
  '[+] Payload injected — awaiting callback...',
  '[+] Shell session opened (192.168.1.105:4444)',
  '[*] Escalating privileges...',
  '[+] Root access obtained!',
  '[*] Downloading /etc/shadow...',
  '[+] Cracking hashes with rainbow tables...',
  '[+] 3 passwords cracked in 2.4s',
  '[*] Covering tracks — clearing logs...',
  '[+] /var/log/auth.log — WIPED',
  '[+] /var/log/syslog — WIPED',
  '[*] Installing persistent backdoor...',
  '[+] Backdoor installed at /usr/bin/.sys_helper',
  '[+] Cron job created for persistence',
  '[*] Exfiltrating data via DNS tunneling...',
  '[+] 247MB exfiltrated successfully',
  '',
  '████████████████████████████████████████',
  '█  ACCESS GRANTED — OPERATION COMPLETE █',
  '████████████████████████████████████████',
  '',
  '[*] Session duration: 14.7s',
  '[*] Disconnecting... Done.',
  '',
  '(Just kidding — this is a simulation 😄)',
];

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

const TerminalApp: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([
    { input: 'help', output: 'Available commands: help, echo, date, ls, clear, whoami, version, hack, matrix' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [hackLines, setHackLines] = useState<string[]>([]);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hackTimeoutRef = useRef<number[]>([]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, hackLines]);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  // Cleanup hack timeouts
  useEffect(() => {
    return () => hackTimeoutRef.current.forEach(clearTimeout);
  }, []);

  const startHack = useCallback(() => {
    setIsHacking(true);
    setHackLines([]);
    hackTimeoutRef.current.forEach(clearTimeout);
    hackTimeoutRef.current = [];

    HACK_LINES.forEach((line, i) => {
      const delay = i * (80 + Math.random() * 120);
      const id = window.setTimeout(() => {
        setHackLines(prev => [...prev, line]);
        if (i === HACK_LINES.length - 1) {
          setIsHacking(false);
        }
      }, delay);
      hackTimeoutRef.current.push(id);
    });
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
          '  hack           - 🔓 Start hacking simulation\n' +
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
        setHackLines([]);
        return;
      case 'whoami':
        output = 'user@refos';
        break;
      case 'version':
        output = 'Ref OS v1.0.0\nBuild: 2025.04.17';
        break;
      case 'hack':
        setCommands(prev => [...prev, { input: trimmedInput, output: 'Initializing hack sequence...', isHack: true }]);
        startHack();
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
      className="flex flex-col h-full bg-[#0a0a0f] p-4 text-green-400 font-mono text-sm overflow-auto relative"
    >
      {/* Matrix rain overlay */}
      {matrixActive && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, col) => (
            <div
              key={col}
              className="absolute top-0 text-green-500 text-xs leading-none opacity-70 matrix-column"
              style={{
                left: `${(col / 30) * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="matrix-char">
                  {MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="mb-2 relative z-20">
        <p className="text-purple-400 mb-1 font-bold">Ref OS Terminal v1.0.0</p>
        <p className="text-white/40 text-xs mb-3">Type 'help' for available commands • 'hack' for fun</p>
      </div>

      {commands.map((cmd, index) => (
        <div key={index} className="mb-2 relative z-20">
          <div className="flex">
            <span className="text-cyan-400 mr-2">user@refos:~$</span>
            <span className={cmd.isHack ? 'text-red-400' : ''}>{cmd.input}</span>
          </div>
          <div className="whitespace-pre-line pl-2">{cmd.output}</div>
        </div>
      ))}

      {/* Hack animation lines */}
      {hackLines.length > 0 && (
        <div className="mb-2 relative z-20">
          {hackLines.map((line, i) => (
            <div
              key={i}
              className={`
                ${line.startsWith('[+]') ? 'text-green-400' : ''}
                ${line.startsWith('[*]') ? 'text-cyan-300' : ''}
                ${line.startsWith('[!]') ? 'text-red-400 font-bold' : ''}
                ${line.startsWith('█') ? 'text-yellow-400 font-bold' : ''}
                ${line.startsWith('(') ? 'text-white/60 italic' : ''}
                ${!line.startsWith('[') && !line.startsWith('█') && !line.startsWith('(') && line ? 'text-green-400' : ''}
              `}
            >
              {line || '\u00A0'}
            </div>
          ))}
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

      {isHacking && (
        <div className="flex mt-1 relative z-20">
          <span className="text-red-400 animate-pulse">█ HACKING IN PROGRESS...</span>
        </div>
      )}
    </div>
  );
};

export default TerminalApp;
