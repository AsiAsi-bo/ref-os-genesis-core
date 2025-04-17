
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  sender: 'user' | 'refy';
  text: string;
  timestamp: Date;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const RefyAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      sender: 'refy',
      text: 'Hello! I\'m Refy, your virtual assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Simulate microphone functionality
  const toggleMicrophone = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate listening and then receiving voice input
      setTimeout(() => {
        setIsListening(false);
        handleUserMessage("Can you tell me about Ref OS?");
      }, 3000);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleUserMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate assistant thinking
    setTimeout(() => {
      const responses = [
        "I'm here to help you navigate through Ref OS. You can use me to open apps, search for information, or answer questions.",
        "Ref OS has several apps including File Explorer, Notepad, Calculator, Settings, Weather, Calendar, Web Browser, and Terminal.",
        "You can customize your desktop through the Settings app. Just ask me to open it for you!",
        "Need to check the weather? Just ask me to open the Weather app.",
        "I can help you schedule events in the Calendar app.",
        "The Terminal app allows you to run commands directly in Ref OS."
      ];
      
      const responseIndex = Math.floor(Math.random() * responses.length);
      
      const refyMessage: Message = {
        id: generateId(),
        sender: 'refy',
        text: responses[responseIndex],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, refyMessage]);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-refos-window p-4">
      <div className="flex items-center mb-4">
        <div className="bg-refos-primary/20 h-10 w-10 rounded-full flex items-center justify-center mr-3">
          <Bot size={20} className="text-refos-primary" />
        </div>
        <div>
          <h3 className="font-medium text-white">Refy</h3>
          <p className="text-white/60 text-xs">Virtual Assistant</p>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.sender === 'user' 
                    ? "bg-refos-primary text-white rounded-tr-none" 
                    : "bg-refos-taskbar text-white rounded-tl-none"
                )}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-60 block text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full",
            isListening ? "text-red-400 bg-white/10" : "text-white"
          )}
          onClick={toggleMicrophone}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-refos-taskbar border-refos-window/30 focus-visible:ring-refos-primary text-white"
        />
        <Button type="submit" size="icon" className="rounded-full bg-refos-primary hover:bg-refos-primary/80">
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default RefyAssistant;
