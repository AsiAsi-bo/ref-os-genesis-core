import React, { useState, useEffect, useRef, useCallback } from 'react';

type HackPhase = 'idle' | 'scanning' | 'exploiting' | 'cracking' | 'exfiltrating' | 'complete';

const FAKE_IPS = [
  '10.0.13.37', '192.168.1.105', '172.16.0.42', '10.10.14.2',
  '192.168.100.1', '10.129.45.67', '172.20.0.15', '192.168.50.200',
];

const FAKE_PORTS = [
  { port: 22, service: 'SSH', version: 'OpenSSH 8.9p1' },
  { port: 53, service: 'DNS', version: 'ISC BIND 9.18.1' },
  { port: 80, service: 'HTTP', version: 'Apache/2.4.54' },
  { port: 443, service: 'HTTPS', version: 'nginx/1.22.0' },
  { port: 3306, service: 'MySQL', version: 'MySQL 8.0.31' },
  { port: 5432, service: 'PostgreSQL', version: 'PostgreSQL 15.1' },
  { port: 6379, service: 'Redis', version: 'Redis 7.0.5' },
  { port: 8080, service: 'HTTP-Alt', version: 'Tomcat/10.1' },
  { port: 8443, service: 'HTTPS-Alt', version: 'Jetty 11.0' },
  { port: 27017, service: 'MongoDB', version: 'MongoDB 6.0.3' },
];

const FAKE_FILES = [
  '/etc/shadow', '/etc/passwd', '/root/.ssh/id_rsa', '/var/lib/mysql/users.db',
  '/home/admin/.bash_history', '/opt/app/config/database.yml',
  '/var/log/auth.log', '/srv/data/credentials.enc',
];

const FAKE_PASSWORDS = [
  { user: 'admin', hash: '$6$rounds=656000$jP...', pass: 'P@ssw0rd!2025' },
  { user: 'root', hash: '$6$rounds=656000$xQ...', pass: 'r00tAccess#1' },
  { user: 'dbadmin', hash: '$6$rounds=656000$kL...', pass: 'Sup3rS3cur3!' },
  { user: 'deploy', hash: '$6$rounds=656000$mN...', pass: 'D3pl0y_K3y$' },
];

const CVEs = [
  'CVE-2025-31337', 'CVE-2025-0001', 'CVE-2024-48291', 'CVE-2025-12045',
];

interface HackLine {
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'header' | 'data' | 'dim' | 'progress' | 'ascii';
  delay?: number;
}

function generateHackScript(): HackLine[] {
  const targetIP = FAKE_IPS[Math.floor(Math.random() * FAKE_IPS.length)];
  const selectedPorts = FAKE_PORTS.sort(() => Math.random() - 0.5).slice(0, 5 + Math.floor(Math.random() * 3));
  const cve = CVEs[Math.floor(Math.random() * CVEs.length)];

  const lines: HackLine[] = [
    { text: '', type: 'info' },
    { text: '╔══════════════════════════════════════════════════════════╗', type: 'header' },
    { text: '║  R E F - F R A M E W O R K   v4.2.0                    ║', type: 'header' },
    { text: '║  Advanced Penetration Testing Suite                     ║', type: 'header' },
    { text: '╚══════════════════════════════════════════════════════════╝', type: 'header' },
    { text: '', type: 'info' },
    { text: `[*] Target acquired: ${targetIP}`, type: 'info' },
    { text: '[*] Initializing reconnaissance module...', type: 'info' },
    { text: '', type: 'info' },

    // Phase 1: Port scan
    { text: '── PHASE 1: NETWORK RECONNAISSANCE ──────────────────────', type: 'header', delay: 300 },
    { text: '', type: 'info' },
    { text: `[*] Launching SYN scan on ${targetIP}...`, type: 'info' },
    { text: '[*] Scanning 65535 ports...', type: 'info' },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%', type: 'progress' },
    { text: '', type: 'info' },
    { text: '  PORT      STATE   SERVICE         VERSION', type: 'dim' },
    { text: '  ─────     ─────   ───────         ───────', type: 'dim' },
    ...selectedPorts.map(p => ({
      text: `  ${String(p.port).padEnd(10)}OPEN    ${p.service.padEnd(16)}${p.version}`,
      type: 'success' as const,
      delay: 60,
    })),
    { text: '', type: 'info' },
    { text: `[+] ${selectedPorts.length} open ports discovered`, type: 'success' },

    // Phase 2: Vulnerability scan
    { text: '', type: 'info' },
    { text: '── PHASE 2: VULNERABILITY ASSESSMENT ───────────────────', type: 'header', delay: 400 },
    { text: '', type: 'info' },
    { text: '[*] Running vulnerability scanner...', type: 'info' },
    { text: '[*] Checking exploit database (47,823 entries)...', type: 'info' },
    { text: '[▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 25%', type: 'progress', delay: 200 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░] 60%', type: 'progress', delay: 200 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%', type: 'progress', delay: 200 },
    { text: '', type: 'info' },
    { text: `[!] CRITICAL: ${cve} found on port ${selectedPorts[0].port} (${selectedPorts[0].service})`, type: 'error' },
    { text: `[!] CVSS Score: 9.8 — Remote Code Execution`, type: 'error' },
    { text: '[+] Exploit available in module library', type: 'success' },

    // Phase 3: Exploitation
    { text: '', type: 'info' },
    { text: '── PHASE 3: EXPLOITATION ───────────────────────────────', type: 'header', delay: 500 },
    { text: '', type: 'info' },
    { text: `[*] Loading exploit: ${cve.toLowerCase()}_rce.py`, type: 'info' },
    { text: '[*] Generating polymorphic payload...', type: 'info' },
    { text: '[*] Encoding payload with shikata_ga_nai (x3 iterations)...', type: 'info' },
    { text: '[*] Payload size: 4,096 bytes', type: 'info' },
    { text: `[*] Sending exploit to ${targetIP}:${selectedPorts[0].port}...`, type: 'info', delay: 300 },
    { text: '', type: 'info' },
    { text: '[+] ██ Exploit delivered successfully ██', type: 'success' },
    { text: '[*] Waiting for reverse shell callback...', type: 'info', delay: 600 },
    { text: `[+] Meterpreter session 1 opened (${targetIP}:4444 → 10.0.0.2:443)`, type: 'success' },
    { text: '', type: 'info' },
    { text: '[*] Attempting privilege escalation...', type: 'info' },
    { text: '[*] Checking kernel version: Linux 5.15.0-generic', type: 'info' },
    { text: '[*] Trying DirtyPipe (CVE-2022-0847)...', type: 'info', delay: 400 },
    { text: '[+] ██ ROOT ACCESS OBTAINED ██', type: 'success' },
    { text: '', type: 'info' },
    { text: `  meterpreter > getuid`, type: 'data' },
    { text: `  Server username: root@${targetIP}`, type: 'data' },
    { text: `  meterpreter > sysinfo`, type: 'data' },
    { text: `  Computer    : target-server`, type: 'data' },
    { text: `  OS          : Ubuntu 22.04 (Linux 5.15.0-generic)`, type: 'data' },
    { text: `  Architecture: x64`, type: 'data' },
    { text: `  Meterpreter : python/linux`, type: 'data' },

    // Phase 4: Post-exploitation
    { text: '', type: 'info' },
    { text: '── PHASE 4: POST-EXPLOITATION ─────────────────────────', type: 'header', delay: 300 },
    { text: '', type: 'info' },
    { text: '[*] Dumping credentials...', type: 'info' },
    { text: '[*] Extracting /etc/shadow...', type: 'info', delay: 200 },
    { text: '', type: 'info' },
    { text: '  USER        HASH                          CRACKED', type: 'dim' },
    { text: '  ────        ────                          ───────', type: 'dim' },
    ...FAKE_PASSWORDS.map(p => ({
      text: `  ${p.user.padEnd(12)}${p.hash.padEnd(30)}${p.pass}`,
      type: 'data' as const,
      delay: 150,
    })),
    { text: '', type: 'info' },
    { text: `[+] ${FAKE_PASSWORDS.length}/${FAKE_PASSWORDS.length} hashes cracked`, type: 'success' },
    { text: '', type: 'info' },
    { text: '[*] Enumerating sensitive files...', type: 'info' },
    ...FAKE_FILES.map(f => ({
      text: `  [+] Found: ${f}`,
      type: 'success' as const,
      delay: 80,
    })),

    // Phase 5: Exfiltration
    { text: '', type: 'info' },
    { text: '── PHASE 5: DATA EXFILTRATION ─────────────────────────', type: 'header', delay: 300 },
    { text: '', type: 'info' },
    { text: '[*] Compressing data archive...', type: 'info' },
    { text: '[*] Encrypting with AES-256-GCM...', type: 'info' },
    { text: '[*] Establishing covert DNS tunnel...', type: 'info', delay: 300 },
    { text: '[*] Exfiltrating via dns.exfil.ref-fw.io...', type: 'info' },
    { text: '[▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]   3% — 12MB/s', type: 'progress', delay: 150 },
    { text: '[▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  22% — 18MB/s', type: 'progress', delay: 150 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░]  43% — 24MB/s', type: 'progress', delay: 150 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░]  65% — 31MB/s', type: 'progress', delay: 150 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░]  84% — 28MB/s', type: 'progress', delay: 150 },
    { text: '[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% — Done', type: 'progress', delay: 150 },
    { text: '', type: 'info' },
    { text: '[+] 347MB exfiltrated successfully', type: 'success' },

    // Phase 6: Cover tracks
    { text: '', type: 'info' },
    { text: '── PHASE 6: COVERING TRACKS ───────────────────────────', type: 'header', delay: 300 },
    { text: '', type: 'info' },
    { text: '[*] Wiping log files...', type: 'info' },
    { text: '  [+] /var/log/auth.log — WIPED', type: 'success', delay: 80 },
    { text: '  [+] /var/log/syslog — WIPED', type: 'success', delay: 80 },
    { text: '  [+] /var/log/kern.log — WIPED', type: 'success', delay: 80 },
    { text: '  [+] /var/log/apache2/access.log — WIPED', type: 'success', delay: 80 },
    { text: '  [+] ~/.bash_history — WIPED', type: 'success', delay: 80 },
    { text: '[*] Timestomping modified files...', type: 'info' },
    { text: '[+] All timestamps restored to original values', type: 'success' },
    { text: '[*] Removing artifacts...', type: 'info' },
    { text: '[+] Clean exit — no forensic traces', type: 'success' },
    { text: '', type: 'info' },

    // Final banner
    { text: '', type: 'info', delay: 500 },
    { text: '╔══════════════════════════════════════════════════════════╗', type: 'ascii' },
    { text: '║                                                        ║', type: 'ascii' },
    { text: '║     █████╗  ██████╗██████╗███████╗███████╗███████╗      ║', type: 'ascii' },
    { text: '║    ██╔══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝     ║', type: 'ascii' },
    { text: '║    ███████║██║     █████╗  ███████╗███████╗███████╗      ║', type: 'ascii' },
    { text: '║    ██╔══██║██║     ██╔══╝  ╚════██║╚════██║╚════██║     ║', type: 'ascii' },
    { text: '║    ██║  ██║╚██████╗███████╗███████║███████║███████║      ║', type: 'ascii' },
    { text: '║    ╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝╚══════╝╚══════╝   ║', type: 'ascii' },
    { text: '║                                                        ║', type: 'ascii' },
    { text: '║            G R A N T E D                               ║', type: 'ascii' },
    { text: '║                                                        ║', type: 'ascii' },
    { text: '╚══════════════════════════════════════════════════════════╝', type: 'ascii' },
    { text: '', type: 'info' },
    { text: `[*] Session duration: ${(12 + Math.random() * 8).toFixed(1)}s`, type: 'info' },
    { text: `[*] Target: ${targetIP} — FULLY COMPROMISED`, type: 'success' },
    { text: '[*] Meterpreter session closed.', type: 'info' },
    { text: '', type: 'info' },
    { text: '(Relax — this is just a simulation 😎)', type: 'dim' },
  ];

  return lines;
}

interface HackSequenceProps {
  onComplete: () => void;
}

const HackSequence: React.FC<HackSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<HackLine[]>([]);
  const [glitch, setGlitch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const scriptRef = useRef<HackLine[]>([]);

  useEffect(() => {
    scriptRef.current = generateHackScript();
    let elapsed = 0;

    scriptRef.current.forEach((line, i) => {
      const baseDelay = 50 + Math.random() * 40;
      elapsed += line.delay ?? baseDelay;

      const id = window.setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);

        // Random glitch flickers
        if (Math.random() < 0.08) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 80);
        }

        if (i === scriptRef.current.length - 1) {
          onComplete();
        }
      }, elapsed);
      timeoutsRef.current.push(id);
    });

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineClass = (type: HackLine['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400 font-bold';
      case 'warning': return 'text-yellow-400';
      case 'header': return 'text-cyan-300 font-bold';
      case 'data': return 'text-amber-300/90';
      case 'dim': return 'text-white/40';
      case 'progress': return 'text-purple-400';
      case 'ascii': return 'text-green-300 font-bold';
      default: return 'text-cyan-400/80';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-75 ${glitch ? 'translate-x-[2px] opacity-90 skew-x-[0.5deg]' : ''}`}
    >
      {visibleLines.map((line, i) => (
        <div
          key={i}
          className={`${getLineClass(line.type)} leading-5 ${line.type === 'ascii' ? 'text-[10px] sm:text-xs' : ''}`}
          style={{ textShadow: line.type === 'ascii' ? '0 0 8px rgba(74, 222, 128, 0.5)' : undefined }}
        >
          {line.text || '\u00A0'}
        </div>
      ))}
      <div className="flex mt-1 items-center">
        <span className="text-red-400 animate-pulse">█</span>
        <span className="text-red-400/70 ml-2 text-xs tracking-widest uppercase animate-pulse">
          Hacking in progress...
        </span>
      </div>
    </div>
  );
};

export default HackSequence;
