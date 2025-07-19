import React, { useState, useEffect, useCallback, useRef } from 'react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 60;
const BALL_SIZE = 10;

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

const Pong: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  
  const [playerPaddle, setPlayerPaddle] = useState<Position>({ 
    x: 20, 
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 
  });
  
  const [aiPaddle, setAiPaddle] = useState<Position>({ 
    x: CANVAS_WIDTH - 30, 
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 
  });
  
  const [ball, setBall] = useState<Position>({ 
    x: CANVAS_WIDTH / 2, 
    y: CANVAS_HEIGHT / 2 
  });
  
  const [ballVelocity, setBallVelocity] = useState<Velocity>({ x: 4, y: 3 });

  const resetBall = useCallback(() => {
    setBall({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });
    setBallVelocity({ 
      x: Math.random() > 0.5 ? 4 : -4, 
      y: (Math.random() - 0.5) * 6 
    });
  }, []);

  const resetGame = useCallback(() => {
    setPlayerScore(0);
    setAiScore(0);
    setGameStarted(false);
    setGameOver(false);
    setPlayerPaddle({ x: 20, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
    setAiPaddle({ x: CANVAS_WIDTH - 30, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
    resetBall();
  }, [resetBall]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    resetBall();
  }, [resetBall]);

  const [keys, setKeys] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameStarted && e.key === ' ') {
      startGame();
      return;
    }
    if (gameOver && e.key === 'r') {
      resetGame();
      return;
    }
    setKeys(prev => new Set(prev.add(e.key)));
  }, [gameStarted, gameOver, startGame, resetGame]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(e.key);
      return newKeys;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move player paddle
      setPlayerPaddle(paddle => {
        let newY = paddle.y;
        if (keys.has('ArrowUp') && paddle.y > 0) {
          newY = Math.max(0, paddle.y - 6);
        }
        if (keys.has('ArrowDown') && paddle.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
          newY = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, paddle.y + 6);
        }
        return { ...paddle, y: newY };
      });

      // Move AI paddle
      setAiPaddle(paddle => {
        const ballCenterY = ball.y + BALL_SIZE / 2;
        const paddleCenterY = paddle.y + PADDLE_HEIGHT / 2;
        const diff = ballCenterY - paddleCenterY;
        const speed = 4;
        
        let newY = paddle.y;
        if (Math.abs(diff) > 5) {
          if (diff > 0 && paddle.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
            newY = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, paddle.y + speed);
          } else if (diff < 0 && paddle.y > 0) {
            newY = Math.max(0, paddle.y - speed);
          }
        }
        return { ...paddle, y: newY };
      });

      // Move ball
      setBall(currentBall => {
        let newX = currentBall.x + ballVelocity.x;
        let newY = currentBall.y + ballVelocity.y;
        let newVelX = ballVelocity.x;
        let newVelY = ballVelocity.y;

        // Ball collision with top/bottom walls
        if (newY <= 0 || newY >= CANVAS_HEIGHT - BALL_SIZE) {
          newVelY = -newVelY;
          newY = newY <= 0 ? 0 : CANVAS_HEIGHT - BALL_SIZE;
        }

        // Ball collision with player paddle
        if (newX <= playerPaddle.x + PADDLE_WIDTH &&
            newX >= playerPaddle.x &&
            newY + BALL_SIZE >= playerPaddle.y &&
            newY <= playerPaddle.y + PADDLE_HEIGHT) {
          newVelX = Math.abs(newVelX);
          newX = playerPaddle.x + PADDLE_WIDTH;
        }

        // Ball collision with AI paddle
        if (newX + BALL_SIZE >= aiPaddle.x &&
            newX <= aiPaddle.x + PADDLE_WIDTH &&
            newY + BALL_SIZE >= aiPaddle.y &&
            newY <= aiPaddle.y + PADDLE_HEIGHT) {
          newVelX = -Math.abs(newVelX);
          newX = aiPaddle.x - BALL_SIZE;
        }

        // Score
        if (newX <= 0) {
          setAiScore(s => s + 1);
          setTimeout(resetBall, 1000);
          return currentBall;
        }
        if (newX >= CANVAS_WIDTH) {
          setPlayerScore(s => s + 1);
          setTimeout(resetBall, 1000);
          return currentBall;
        }

        setBallVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });

      // Check win condition
      if (playerScore >= 5 || aiScore >= 5) {
        setGameOver(true);
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, keys, ball, ballVelocity, playerPaddle, aiPaddle, playerScore, aiScore, resetBall]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(aiPaddle.x, aiPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
  }, [playerPaddle, aiPaddle, ball]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="text-white text-xl font-bold">Pong</div>
      
      <div className="flex justify-between w-full max-w-md text-white">
        <div>Player: {playerScore}</div>
        <div>AI: {aiScore}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-white/30 bg-black"
      />

      {!gameStarted && !gameOver && (
        <div className="text-center text-white">
          <div>Press SPACE to start</div>
          <div className="text-sm text-white/70 mt-2">Use arrow keys to move your paddle</div>
        </div>
      )}

      {gameOver && (
        <div className="text-center text-white">
          <div className="text-lg font-bold">
            {playerScore > aiScore ? 'You Win!' : 'AI Wins!'}
          </div>
          <div>Final Score: {playerScore} - {aiScore}</div>
          <div className="text-sm text-white/70 mt-2">Press R to restart</div>
        </div>
      )}
    </div>
  );
};

export default Pong;