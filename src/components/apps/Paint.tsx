import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Paintbrush, Eraser, Square, Circle, Minus, Trash2, Download, Undo2 } from 'lucide-react';

type Tool = 'brush' | 'eraser' | 'line' | 'rect' | 'circle';

const COLORS = [
  '#000000', '#ffffff', '#e74c3c', '#e91e63', '#9b59b6', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
];

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState([4]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      setHistory(prev => [...prev.slice(-20), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && history.length > 1) {
      const newHistory = history.slice(0, -1);
      ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
      setHistory(newHistory);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  };

  const getPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = brushSize[0];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const endDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: 'brush', icon: <Paintbrush size={16} />, label: 'Brush' },
    { id: 'eraser', icon: <Eraser size={16} />, label: 'Eraser' },
  ];

  return (
    <div className="h-full flex flex-col bg-refos-window text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-white/10 flex-wrap">
        {/* Tools */}
        {tools.map(t => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-2 rounded ${tool === t.id ? 'bg-refos-primary text-white' : 'text-white/60 hover:bg-white/10'}`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Brush size */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40">Size</span>
          <Slider value={brushSize} onValueChange={setBrushSize} min={1} max={30} className="w-20" />
          <span className="text-xs text-white/50 w-5">{brushSize[0]}</span>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Actions */}
        <button onClick={undo} className="p-2 rounded text-white/60 hover:bg-white/10" title="Undo"><Undo2 size={16} /></button>
        <button onClick={clearCanvas} className="p-2 rounded text-white/60 hover:bg-white/10" title="Clear"><Trash2 size={16} /></button>
      </div>

      {/* Color palette */}
      <div className="flex items-center gap-1 p-2 border-b border-white/10">
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); setTool('brush'); }}
            className={`w-6 h-6 rounded-sm border-2 ${color === c && tool !== 'eraser' ? 'border-refos-primary scale-110' : 'border-white/20'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden bg-white cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
        />
      </div>
    </div>
  );
};

export default Paint;
