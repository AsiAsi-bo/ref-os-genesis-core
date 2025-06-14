
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mic, MicOff, Send, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { generateAIResponse, AIProvider } from '@/utils/ai';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      text: 'Hello! I\'m Refy, your AI-powered virtual assistant. I now support both OpenAI and Gemini! How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [tempProvider, setTempProvider] = useState<AIProvider>('openai');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleApiKeySubmit = () => {
    setApiKey(tempApiKey);
    setProvider(tempProvider);
    setShowApiDialog(false);
    setTempApiKey('');
  };

  const handleUserMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Generate AI response
    const aiResponse = await generateAIResponse(text, apiKey, provider);
    
    const refyMessage: Message = {
      id: generateId(),
      sender: 'refy',
      text: aiResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, refyMessage]);
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleUserMessage("Can you tell me about Ref OS?");
      }, 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-refos-window p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-refos-primary/20 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Bot size={20} className="text-refos-primary" />
          </div>
          <div>
            <h3 className="font-medium text-white">Refy</h3>
            <p className="text-white/60 text-xs">AI Assistant ({provider === 'openai' ? 'OpenAI' : 'Gemini'})</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setShowApiDialog(true)}
        >
          <Key size={20} />
        </Button>
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

      <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
        <DialogContent className="sm:max-w-[425px] bg-refos-window text-white">
          <DialogHeader>
            <DialogTitle>Configure AI Provider</DialogTitle>
            <DialogDescription className="text-white/70">
              Choose your AI provider and enter your API key. We recommend connecting to Supabase for secure key storage.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">AI Provider</label>
              <Select value={tempProvider} onValueChange={(value: AIProvider) => setTempProvider(value)}>
                <SelectTrigger className="bg-refos-taskbar border-refos-window/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-refos-taskbar border-refos-window/30">
                  <SelectItem value="openai" className="text-white">OpenAI (GPT-4)</SelectItem>
                  <SelectItem value="gemini" className="text-white">Google Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder={`Enter your ${tempProvider === 'openai' ? 'OpenAI' : 'Gemini'} API key`}
              className="bg-refos-taskbar border-refos-window/30 focus-visible:ring-refos-primary text-white"
            />
            <Button onClick={handleApiKeySubmit} className="bg-refos-primary hover:bg-refos-primary/80">
              Save Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefyAssistant;
