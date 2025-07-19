import React, { useState, useEffect, useCallback, useRef } from 'react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const BALL_SIZE = 10;
const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 20;
const BRICK_ROWS = 6;
const BRICK_COLS = 10;

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Brick {
  x: number;
  y: number;
  visible: boolean;
  color: string;
}

const Breakout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [paddle, setPaddle] = useState<Position>({ 
    x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, 
    y: CANVAS_HEIGHT - 30 
  });
  
  const [ball, setBall] = useState<Position>({ 
    x: CANVAS_WIDTH / 2, 
    y: CANVAS_HEIGHT - 50 
  });
  
  const [ballVelocity, setBallVelocity] = useState<Velocity>({ x: 0, y: 0 });

  const createBricks = useCallback((): Brick[] => {
    const bricks: Brick[] = [];
    const colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff'];
    
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: col * (BRICK_WIDTH + 5) + 25,
          y: row * (BRICK_HEIGHT + 5) + 30,
          visible: true,
          color: colors[row % colors.length]
        });
      }
    }
    return bricks;
  }, []);

  const [bricks, setBricks] = useState<Brick[]>(createBricks);

  const resetBall = useCallback(() => {
    setBall({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 });
    setBallVelocity({ x: 0, y: 0 });
    setPaddle({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 30 });
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    setBricks(createBricks());
    resetBall();
  }, [createBricks, resetBall]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setBallVelocity({ x: 3, y: -3 });
  }, []);

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
    if (!gameStarted || gameOver || gameWon) return;

    const gameLoop = setInterval(() => {
      // Move paddle
      setPaddle(paddle => {
        let newX = paddle.x;
        if (keys.has('ArrowLeft') && paddle.x > 0) {
          newX = Math.max(0, paddle.x - 8);
        }
        if (keys.has('ArrowRight') && paddle.x < CANVAS_WIDTH - PADDLE_WIDTH) {
          newX = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, paddle.x + 8);
        }
        return { ...paddle, x: newX };
      });

      // Move ball
      setBall(currentBall => {
        let newX = currentBall.x + ballVelocity.x;
        let newY = currentBall.y + ballVelocity.y;
        let newVelX = ballVelocity.x;
        let newVelY = ballVelocity.y;

        // Ball collision with walls
        if (newX <= 0 || newX >= CANVAS_WIDTH - BALL_SIZE) {
          newVelX = -newVelX;
          newX = newX <= 0 ? 0 : CANVAS_WIDTH - BALL_SIZE;
        }
        if (newY <= 0) {
          newVelY = -newVelY;
          newY = 0;
        }

        // Ball collision with paddle
        if (newY + BALL_SIZE >= paddle.y &&
            newY <= paddle.y + PADDLE_HEIGHT &&
            newX + BALL_SIZE >= paddle.x &&
            newX <= paddle.x + PADDLE_WIDTH) {
          newVelY = -Math.abs(newVelY);
          
          // Add angle based on where ball hits paddle
          const hitPos = (newX - paddle.x) / PADDLE_WIDTH;
          newVelX = (hitPos - 0.5) * 6;
          newY = paddle.y - BALL_SIZE;
        }

        // Ball collision with bricks
        setBricks(currentBricks => {
          const newBricks = [...currentBricks];
          let hitBrick = false;

          for (let i = 0; i < newBricks.length; i++) {
            const brick = newBricks[i];
            if (!brick.visible) continue;

            if (newX + BALL_SIZE >= brick.x &&
                newX <= brick.x + BRICK_WIDTH &&
                newY + BALL_SIZE >= brick.y &&
                newY <= brick.y + BRICK_HEIGHT) {
              
              newBricks[i] = { ...brick, visible: false };
              setScore(s => s + 10);
              hitBrick = true;
              
              // Determine collision side
              const ballCenterX = newX + BALL_SIZE / 2;
              const ballCenterY = newY + BALL_SIZE / 2;
              const brickCenterX = brick.x + BRICK_WIDTH / 2;
              const brickCenterY = brick.y + BRICK_HEIGHT / 2;
              
              const dx = ballCenterX - brickCenterX;
              const dy = ballCenterY - brickCenterY;
              
              if (Math.abs(dx) > Math.abs(dy)) {
                newVelX = -newVelX;
              } else {
                newVelY = -newVelY;
              }
              break;
            }
          }

          // Check if all bricks are destroyed
          if (newBricks.every(brick => !brick.visible)) {
            setGameWon(true);
          }

          return newBricks;
        });

        // Ball falls below paddle
        if (newY >= CANVAS_HEIGHT) {
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameOver(true);
            } else {
              setTimeout(resetBall, 1000);
            }
            return newLives;
          });
          return currentBall;
        }

        setBallVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, gameWon, keys, ball, ballVelocity, paddle, resetBall]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw bricks
    bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
      }
    });

    // Draw paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
  }, [bricks, paddle, ball]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="text-white text-xl font-bold">Breakout</div>
      
      <div className="flex justify-between w-full max-w-md text-white">
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-white/30 bg-black"
      />

      {!gameStarted && !gameOver && !gameWon && (
        <div className="text-center text-white">
          <div>Press SPACE to start</div>
          <div className="text-sm text-white/70 mt-2">Use arrow keys to move the paddle</div>
        </div>
      )}

      {gameWon && (
        <div className="text-center text-white">
          <div className="text-green-400 font-bold text-xl">You Win!</div>
          <div>Final Score: {score}</div>
          <div className="text-sm text-white/70 mt-2">Press R to play again</div>
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

export default Breakout;