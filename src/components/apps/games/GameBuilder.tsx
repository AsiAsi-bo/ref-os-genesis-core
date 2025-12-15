
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Square, Trash2, Save, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface GameObject {
  id: string;
  type: 'player' | 'enemy' | 'platform' | 'coin';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const GameBuilder: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [selectedTool, setSelectedTool] = useState<GameObject['type']>('platform');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameName, setGameName] = useState('My Game');
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 300 });
  const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 0 });

  const toolColors: Record<GameObject['type'], string> = {
    player: '#4CAF50',
    enemy: '#f44336',
    platform: '#795548',
    coin: '#FFD700',
  };

  const toolSizes: Record<GameObject['type'], { width: number; height: number }> = {
    player: { width: 30, height: 30 },
    enemy: { width: 30, height: 30 },
    platform: { width: 100, height: 20 },
    coin: { width: 20, height: 20 },
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if there's already a player
    if (selectedTool === 'player' && objects.some(obj => obj.type === 'player')) {
      toast.error('Only one player allowed!');
      return;
    }
    
    const newObject: GameObject = {
      id: Date.now().toString(),
      type: selectedTool,
      x: x - toolSizes[selectedTool].width / 2,
      y: y - toolSizes[selectedTool].height / 2,
      ...toolSizes[selectedTool],
      color: toolColors[selectedTool],
    };
    
    setObjects(prev => [...prev, newObject]);
  };

  const clearCanvas = () => {
    setObjects([]);
    setIsPlaying(false);
    toast.success('Canvas cleared!');
  };

  const saveGame = () => {
    const gameData = { name: gameName, objects };
    localStorage.setItem(`refgame_${gameName}`, JSON.stringify(gameData));
    toast.success(`Game "${gameName}" saved!`);
  };

  const togglePlay = () => {
    const player = objects.find(obj => obj.type === 'player');
    if (!player && !isPlaying) {
      toast.error('Add a player to play the game!');
      return;
    }
    
    if (!isPlaying && player) {
      setPlayerPos({ x: player.x, y: player.y });
      setPlayerVelocity({ x: 0, y: 0 });
    }
    
    setIsPlaying(!isPlaying);
  };

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gravity = 0.5;
    const jumpForce = -12;
    const moveSpeed = 5;
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        // Horizontal movement
        if (keys['ArrowLeft'] || keys['a']) newX -= moveSpeed;
        if (keys['ArrowRight'] || keys['d']) newX += moveSpeed;
        
        // Apply gravity
        setPlayerVelocity(v => {
          let newVelY = v.y + gravity;
          
          // Check platform collisions
          objects.forEach(obj => {
            if (obj.type === 'platform') {
              if (
                newX + 30 > obj.x &&
                newX < obj.x + obj.width &&
                newY + 30 > obj.y &&
                newY + 30 < obj.y + obj.height + newVelY
              ) {
                newVelY = 0;
                newY = obj.y - 30;
                
                // Allow jump
                if (keys[' '] || keys['ArrowUp'] || keys['w']) {
                  newVelY = jumpForce;
                }
              }
            }
          });
          
          return { x: 0, y: newVelY };
        });
        
        newY += playerVelocity.y;
        
        // Boundaries
        if (newX < 0) newX = 0;
        if (newX > 570) newX = 570;
        if (newY > 360) {
          newY = 360;
          setPlayerVelocity(v => ({ ...v, y: 0 }));
        }
        
        // Check coin collection
        objects.forEach(obj => {
          if (obj.type === 'coin') {
            if (
              newX + 30 > obj.x &&
              newX < obj.x + obj.width &&
              newY + 30 > obj.y &&
              newY < obj.y + obj.height
            ) {
              setObjects(prev => prev.filter(o => o.id !== obj.id));
              toast.success('Coin collected! +100');
            }
          }
        });
        
        // Check enemy collision
        objects.forEach(obj => {
          if (obj.type === 'enemy') {
            if (
              newX + 30 > obj.x &&
              newX < obj.x + obj.width &&
              newY + 30 > obj.y &&
              newY < obj.y + obj.height
            ) {
              toast.error('Game Over! Hit an enemy.');
              setIsPlaying(false);
            }
          }
        });
        
        return { x: newX, y: newY };
      });
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, objects, playerVelocity.y]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw objects
    objects.forEach(obj => {
      if (isPlaying && obj.type === 'player') return; // Don't draw original player position
      
      ctx.fillStyle = obj.color;
      if (obj.type === 'coin') {
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + obj.height/2, obj.width/2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      }
    });
    
    // Draw player during play
    if (isPlaying) {
      ctx.fillStyle = toolColors.player;
      ctx.fillRect(playerPos.x, playerPos.y, 30, 30);
    }
  }, [objects, isPlaying, playerPos]);

  return (
    <div className="h-full flex flex-col bg-refos-window p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Input
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-48 bg-white/10 border-white/20 text-white"
            placeholder="Game name"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={saveGame}>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4 mr-1" /> Clear
          </Button>
          <Button size="sm" onClick={togglePlay} className={isPlaying ? 'bg-red-600 hover:bg-red-700' : ''}>
            {isPlaying ? <Square className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Toolbox */}
        <div className="w-32 bg-white/5 rounded-lg p-3 space-y-2">
          <h3 className="text-white text-sm font-semibold mb-3">Objects</h3>
          {(['player', 'enemy', 'platform', 'coin'] as const).map(tool => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`w-full p-2 rounded text-left text-sm flex items-center gap-2 transition-colors ${
                selectedTool === tool 
                  ? 'bg-refos-primary text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: toolColors[tool] }}
              />
              {tool.charAt(0).toUpperCase() + tool.slice(1)}
            </button>
          ))}
          
          <div className="pt-4 text-white/50 text-xs">
            <p className="font-semibold mb-1">Controls:</p>
            <p>Arrow keys / WASD</p>
            <p>Space to jump</p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-black/20 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={handleCanvasClick}
            className="cursor-crosshair"
          />
        </div>
      </div>
    </div>
  );
};

export default GameBuilder;
