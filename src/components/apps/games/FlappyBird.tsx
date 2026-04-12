import React, { useState, useEffect, useRef, useCallback } from 'react';

const GRAVITY = 0.4;
const JUMP = -7;
const PIPE_WIDTH = 50;
const GAP = 140;
const PIPE_SPEED = 2.5;
const BIRD_SIZE = 24;

interface Pipe { x: number; topH: number; }

const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'dead'>('idle');
  const stateRef = useRef({ birdY: 200, velocity: 0, pipes: [] as Pipe[], score: 0, bestScore: 0, gameState: 'idle' as string });
  const animRef = useRef<number>(0);

  const jump = useCallback(() => {
    if (stateRef.current.gameState === 'idle' || stateRef.current.gameState === 'dead') {
      stateRef.current = { birdY: 200, velocity: 0, pipes: [], score: 0, bestScore: stateRef.current.bestScore, gameState: 'playing' };
      setGameState('playing');
    }
    if (stateRef.current.gameState === 'playing') {
      stateRef.current.velocity = JUMP;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (s.gameState === 'playing') {
        s.velocity += GRAVITY;
        s.birdY += s.velocity;

        // Pipes
        if (s.pipes.length === 0 || s.pipes[s.pipes.length - 1].x < W - 200) {
          s.pipes.push({ x: W, topH: 60 + Math.random() * (H - GAP - 120) });
        }
        s.pipes.forEach(p => { p.x -= PIPE_SPEED; });
        s.pipes = s.pipes.filter(p => p.x > -PIPE_WIDTH);

        // Collision
        const bx = 60, by = s.birdY;
        for (const p of s.pipes) {
          if (bx + BIRD_SIZE > p.x && bx < p.x + PIPE_WIDTH) {
            if (by < p.topH || by + BIRD_SIZE > p.topH + GAP) {
              s.bestScore = Math.max(s.bestScore, s.score);
              s.gameState = 'dead';
              setGameState('dead');
            }
          }
          if (Math.abs(bx - (p.x + PIPE_WIDTH)) < PIPE_SPEED + 1 && bx > p.x) {
            s.score++;
          }
        }
        if (by > H || by < 0) {
          s.bestScore = Math.max(s.bestScore, s.score);
          s.gameState = 'dead';
          setGameState('dead');
        }
      }

      // Draw pipes
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      for (const p of stateRef.current.pipes) {
        ctx.fillRect(p.x, 0, PIPE_WIDTH, p.topH);
        ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.topH);
        ctx.fillRect(p.x, p.topH + GAP, PIPE_WIDTH, H - p.topH - GAP);
        ctx.strokeRect(p.x, p.topH + GAP, PIPE_WIDTH, H - p.topH - GAP);
      }

      // Draw bird
      ctx.fillStyle = '#60a5fa';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(60 + BIRD_SIZE / 2, stateRef.current.birdY + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Score
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 28px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(String(stateRef.current.score), W / 2, 50);

      if (s.gameState === 'idle') {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '16px system-ui';
        ctx.fillText('Tap or click to start', W / 2, H / 2 + 40);
      }
      if (s.gameState === 'dead') {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px system-ui';
        ctx.fillText('Game Over', W / 2, H / 2 - 20);
        ctx.font = '14px system-ui';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(`Score: ${s.score}  Best: ${s.bestScore}`, W / 2, H / 2 + 10);
        ctx.fillText('Tap to restart', W / 2, H / 2 + 40);
      }

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.code === 'Space') { e.preventDefault(); jump(); } };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  return (
    <div className="h-full flex items-center justify-center bg-refos-window">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="rounded-xl border border-white/10 cursor-pointer max-w-full max-h-full"
        onClick={jump}
        onTouchStart={(e) => { e.preventDefault(); jump(); }}
      />
    </div>
  );
};

export default FlappyBird;
