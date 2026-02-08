import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSequentialTyping } from '@/hooks/useTypingAnimation';

interface CommandOutput {
  type: 'text' | 'component' | 'error' | 'success' | 'info';
  content: React.ReactNode;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output';
  content: string | CommandOutput;
  timestamp: Date;
}

const bootSequence = [
  '> Initializing portfolio environment...',
  '> Loading developer profile...',
  '> Mounting project repositories...',
  '> Establishing neural network connection...',
  '> System ready.',
  '',
  '╔══════════════════════════════════════════════════════════════════╗',
  '║                                                                  ║',
  '║   ██████╗ ██████╗  █████╗ ███╗   ███╗ ██████╗ ██████╗            ║',
  '║   ██╔══██╗██╔══██╗██╔══██╗████╗ ████║██╔═══██╗██╔══██╗           ║',
  '║   ██████╔╝██████╔╝███████║██╔████╔██║██║   ██║██║  ██║           ║',
  '║   ██╔═══╝ ██╔══██╗██╔══██║██║╚██╔╝██║██║   ██║██║  ██║           ║',
  '║   ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║╚██████╔╝██████╔╝           ║',
  '║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝            ║',
  '║                                                                  ║',
  '║          F U L L - S T A C K   D E V E L O P E R                 ║',
  '║                                                                  ║',
  '╚══════════════════════════════════════════════════════════════════╝',
  '',
  'Welcome to my interactive portfolio terminal.',
  'Type "help" to see available commands.',
  '',
];

const commands: Record<string, { description: string; handler: (navigate: (path: string) => void) => CommandOutput }> = {
  help: {
    description: 'Show available commands',
    handler: () => ({
      type: 'info',
      content: (
        <div className="space-y-1">
          <p className="text-terminal-cyan font-bold">Available Commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2">
            {Object.entries(commands).map(([cmd, { description }]) => (
              <div key={cmd} className="flex gap-3">
                <span className="text-terminal-green min-w-[100px]">{cmd}</span>
                <span className="text-muted-foreground">- {description}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    }),
  },
  whoami: {
    description: 'Display developer info',
    handler: () => ({
      type: 'success',
      content: (
        <div className="space-y-2">
          <p className="text-terminal-cyan">═══ Developer Profile ═══</p>
          <div className="pl-4 space-y-1">
            <p><span className="text-terminal-yellow">Name:</span> Pramod</p>
            <p><span className="text-terminal-yellow">Role:</span> Full-Stack Developer</p>
            <p><span className="text-terminal-yellow">Location:</span> Building the future, one commit at a time</p>
            <p><span className="text-terminal-yellow">Status:</span> <span className="text-terminal-green">● Available for opportunities</span></p>
          </div>
        </div>
      ),
    }),
  },
  skills: {
    description: 'List technical skills',
    handler: () => ({
      type: 'info',
      content: (
        <div className="space-y-3">
          <p className="text-terminal-cyan">═══ Technical Skills ═══</p>
          <div className="space-y-2">
            <SkillBar name="React / Next.js" level={90} color="cyan" />
            <SkillBar name="Node.js / Express" level={85} color="green" />
            <SkillBar name="TypeScript" level={88} color="yellow" />
            <SkillBar name="MongoDB / PostgreSQL" level={82} color="purple" />
            <SkillBar name="Python / Django" level={75} color="orange" />
            <SkillBar name="Docker / AWS" level={70} color="red" />
          </div>
        </div>
      ),
    }),
  },
  projects: {
    description: 'Show project list',
    handler: () => ({
      type: 'info',
      content: (
        <div className="space-y-2">
          <p className="text-terminal-cyan">═══ Featured Projects ═══</p>
          <div className="space-y-3 mt-2">
            {[
              { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', status: 'production' },
              { name: 'AI Task Manager', tech: 'Next.js, OpenAI, PostgreSQL', status: 'production' },
              { name: 'Real-time Chat App', tech: 'Socket.io, Express, Redis', status: 'production' },
              { name: 'DevOps Dashboard', tech: 'React, Docker, Kubernetes', status: 'development' },
            ].map((project, i) => (
              <div key={i} className="pl-4 border-l-2 border-terminal-cyan">
                <p className="text-terminal-green font-bold">{project.name}</p>
                <p className="text-muted-foreground text-sm">{project.tech}</p>
                <p className="text-xs">
                  Status: <span className={project.status === 'production' ? 'text-terminal-green' : 'text-terminal-yellow'}>
                    {project.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Type "goto projects" for detailed case studies
          </p>
        </div>
      ),
    }),
  },
  about: {
    description: 'Navigate to about page',
    handler: (navigate) => {
      setTimeout(() => navigate('/about'), 500);
      return {
        type: 'success',
        content: <p>Navigating to developer console... <span className="text-terminal-cyan animate-pulse">●</span></p>,
      };
    },
  },
  'goto': {
    description: 'Navigate to a page (about/projects/chat)',
    handler: (navigate) => ({
      type: 'info',
      content: (
        <div>
          <p className="text-terminal-yellow">Usage: goto [page]</p>
          <p className="text-muted-foreground">Available pages: about, projects, chat, journey</p>
        </div>
      ),
    }),
  },
  clear: {
    description: 'Clear terminal',
    handler: () => ({
      type: 'text',
      content: '',
    }),
  },
  contact: {
    description: 'Show contact information',
    handler: () => ({
      type: 'success',
      content: (
        <div className="space-y-2">
          <p className="text-terminal-cyan">═══ Contact Information ═══</p>
          <div className="pl-4 space-y-1">
            <p>📧 <span className="text-terminal-green">pramod@developer.io</span></p>
            <p>💼 <span className="text-terminal-green">linkedin.com/in/pramod-dev</span></p>
            <p>🐙 <span className="text-terminal-green">github.com/pramod-dev</span></p>
          </div>
        </div>
      ),
    }),
  },
  socials: {
    description: 'Display social links',
    handler: () => ({
      type: 'info',
      content: (
        <div className="flex flex-wrap gap-4 py-2">
          {[
            { name: 'GitHub', icon: '🐙', url: 'github.com/pramod' },
            { name: 'LinkedIn', icon: '💼', url: 'linkedin.com/in/pramod' },
            { name: 'Twitter', icon: '🐦', url: 'twitter.com/pramod_dev' },
          ].map((social) => (
            <span key={social.name} className="tech-badge cursor-pointer hover:glow-primary">
              {social.icon} {social.name}
            </span>
          ))}
        </div>
      ),
    }),
  },
};

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="min-w-[160px] text-sm">{name}</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full rounded-full bg-terminal-${color}`}
        style={{ backgroundColor: `hsl(var(--terminal-${color}))` }}
      />
    </div>
    <span className="text-xs text-muted-foreground min-w-[40px]">{level}%</span>
  </div>
);

const Terminal = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { completedLines, currentText, isComplete } = useSequentialTyping(bootSequence, {
    speed: 20,
    lineDelay: 100,
  });

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => setBootComplete(true), 500);
    }
  }, [isComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, completedLines, currentText]);

  const handleCommand = useCallback((input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const [cmd, ...args] = trimmedInput.split(' ');

    // Add input line
    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: input,
      timestamp: new Date(),
    };

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === 'goto' && args.length > 0) {
      const page = args[0];
      const validPages: Record<string, string> = {
        about: '/about',
        projects: '/projects',
        chat: '/chat',
        journey: '/journey',
      };

      if (validPages[page]) {
        setLines(prev => [
          ...prev,
          inputLine,
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: {
              type: 'success',
              content: <p>Navigating to {page}... <span className="text-terminal-cyan animate-pulse">●</span></p>,
            },
            timestamp: new Date(),
          },
        ]);
        setTimeout(() => navigate(validPages[page]), 500);
        return;
      }
    }

    const command = commands[cmd];
    const output: CommandOutput = command
      ? command.handler(navigate)
      : {
          type: 'error',
          content: <p>Command not found: <span className="text-terminal-red">{cmd}</span>. Type "help" for available commands.</p>,
        };

    setLines(prev => [
      ...prev,
      inputLine,
      {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: output,
        timestamp: new Date(),
      },
    ]);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  const focusInput = () => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="min-h-screen bg-background grid-pattern relative overflow-hidden"
      onClick={focusInput}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 min-h-screen flex flex-col"
      >
        {/* Terminal header */}
        <div className="glass-strong rounded-t-lg px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red" />
            <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
            <div className="w-3 h-3 rounded-full bg-terminal-green" />
          </div>
          <div className="flex-1 text-center">
            <span className="font-mono text-sm text-muted-foreground">
              pramod@portfolio ~ /interactive-terminal
            </span>
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="flex-1 glass rounded-b-lg p-4 md:p-6 overflow-y-auto custom-scrollbar font-mono text-sm md:text-base"
        >
          {/* Boot sequence */}
          <AnimatePresence>
            {completedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`whitespace-pre-wrap ${
                  line.startsWith('>') ? 'text-terminal-green' :
                  line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚') ? 'text-primary' :
                  'text-foreground'
                }`}
              >
                {line || '\u00A0'}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current typing line */}
          {currentText && (
            <div className={`whitespace-pre-wrap ${
              currentText.startsWith('>') ? 'text-terminal-green' :
              currentText.startsWith('╔') || currentText.startsWith('║') || currentText.startsWith('╚') ? 'text-primary' :
              'text-foreground'
            }`}>
              {currentText}
              <span className="cursor-blink text-primary">▋</span>
            </div>
          )}

          {/* Command history */}
          {bootComplete && lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              {line.type === 'input' ? (
                <div className="flex gap-2">
                  <span className="text-terminal-green">❯</span>
                  <span className="text-terminal-cyan">{line.content as string}</span>
                </div>
              ) : (
                <div className="pl-4 py-2">
                  {typeof (line.content as CommandOutput).content === 'string' 
                    ? (line.content as CommandOutput).content 
                    : (line.content as CommandOutput).content}
                </div>
              )}
            </motion.div>
          ))}

          {/* Input line */}
          {bootComplete && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex gap-2 mt-4 items-center"
            >
              <span className="text-terminal-green">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-terminal-cyan font-mono caret-primary"
                placeholder="Enter command..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <span className="cursor-blink text-primary">▋</span>
            </motion.form>
          )}
        </div>

        {/* Quick navigation hints */}
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-2 justify-center"
          >
            {['whoami', 'skills', 'projects', 'goto about'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputValue(cmd);
                  inputRef.current?.focus();
                }}
                className="tech-badge hover:glow-primary transition-all duration-300"
              >
                {cmd}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Terminal;
