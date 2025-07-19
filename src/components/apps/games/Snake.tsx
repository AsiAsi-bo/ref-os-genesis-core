import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

const Snake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE));
    const y = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE));
    return { x, y };
  }, []);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  }, [generateFood]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setDirection({ x: 1, y: 0 });
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted && e.key === ' ') {
      startGame();
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: 1, y: 0 });
        break;
      case 'r':
        if (gameOver) resetGame();
        break;
    }
  }, [gameStarted, gameOver, startGame, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check walls
        if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
            head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="text-white text-xl font-bold">Snake Game</div>
      <div className="text-white">Score: {score}</div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="border border-white/30 bg-black"
      />

      {!gameStarted && !gameOver && (
        <div className="text-center text-white">
          <div>Press SPACE to start</div>
          <div className="text-sm text-white/70 mt-2">Use arrow keys to move</div>
        </div>
      )}

      {gameOver && (
        <div className="text-center text-white">
          <div className="text-red-400 font-bold">Game Over!</div>
          <div>Final Score: {score}</div>
          <div className="text-sm text-white/70 mt-2">Press R to restart</div>
        </div>
      )}
    </div>
  );
};

export default Snake;