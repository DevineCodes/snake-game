// Snake Game Logic
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('game-overlay');
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.speed = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameLoop = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.drawGame();
        this.showOverlay('Snake Game', 'Press SPACE to start or use arrow keys to move');
    }
    
    bindEvents() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Button controls
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('up-btn').addEventListener('click', () => this.changeDirection(0, -1));
        document.getElementById('down-btn').addEventListener('click', () => this.changeDirection(0, 1));
        document.getElementById('left-btn').addEventListener('click', () => this.changeDirection(-1, 0));
        document.getElementById('right-btn').addEventListener('click', () => this.changeDirection(1, 0));
        
        // Touch controls for mobile
        this.addTouchControls();
    }
    
    addTouchControls() {
        let startX, startY;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!startX || !startY) return;
            
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0) {
                    this.changeDirection(1, 0); // Right
                } else {
                    this.changeDirection(-1, 0); // Left
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    this.changeDirection(0, 1); // Down
                } else {
                    this.changeDirection(0, -1); // Up
                }
            }
            
            startX = null;
            startY = null;
        });
    }
    
    handleKeyPress(e) {
        if (!this.gameRunning && e.code === 'Space') {
            this.startGame();
            return;
        }
        
        if (this.gameRunning && e.code === 'Space') {
            this.togglePause();
            return;
        }
        
        // Direction controls
        switch (e.code) {
            case 'ArrowUp':
                e.preventDefault();
                this.changeDirection(0, -1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.changeDirection(0, 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.changeDirection(-1, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.changeDirection(1, 0);
                break;
        }
    }
    
    changeDirection(newDx, newDy) {
        // Prevent reverse direction
        if (this.dx === -newDx && this.dy === -newDy) {
            return;
        }
        
        this.dx = newDx;
        this.dy = newDy;
        
        // Start game if not running
        if (!this.gameRunning) {
            this.startGame();
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.hideOverlay();
        
        if (this.dx === 0 && this.dy === 0) {
            this.dx = 1; // Default direction: right
        }
        
        this.gameLoop = setInterval(() => {
            if (!this.gamePaused) {
                this.update();
                this.drawGame();
            }
        }, 200 - (this.speed - 1) * 20); // Speed increases as level increases
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            this.showOverlay('Game Paused', 'Press SPACE to resume');
        } else {
            this.hideOverlay();
        }
    }
    
    update() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.speed = Math.floor(this.score / 50) + 1; // Increase speed every 50 points
            this.generateFood();
            this.updateDisplay();
        } else {
            this.snake.pop();
        }
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        this.food = newFood;
    }
    
    drawGame() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#00ff41';
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Snake head - brighter
                this.ctx.fillStyle = '#00ff41';
                this.ctx.shadowColor = '#00ff41';
                this.ctx.shadowBlur = 10;
            } else {
                // Snake body
                this.ctx.fillStyle = '#00cc33';
                this.ctx.shadowBlur = 5;
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff0000';
        this.ctx.shadowColor = '#ff0000';
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(
            this.food.x * this.gridSize + 2,
            this.food.y * this.gridSize + 2,
            this.gridSize - 4,
            this.gridSize - 4
        );
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Draw grid lines (subtle)
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.gamePaused = false;
        clearInterval(this.gameLoop);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateDisplay();
            this.showOverlay('New High Score!', `Score: ${this.score} | Previous Best: ${this.highScore}`);
        } else {
            this.showOverlay('Game Over', `Score: ${this.score} | High Score: ${this.highScore}`);
        }
        
        // Show restart button
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'inline-block';
    }
    
    restartGame() {
        // Reset game state
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.speed = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Reset UI
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('restart-btn').style.display = 'none';
        
        this.updateDisplay();
        this.drawGame();
        this.showOverlay('Snake Game', 'Press SPACE to start or use arrow keys to move');
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('high-score').textContent = this.highScore;
        document.getElementById('speed').textContent = this.speed;
    }
    
    showOverlay(title, message) {
        document.getElementById('overlay-title').textContent = title;
        document.getElementById('overlay-message').textContent = message;
        this.overlay.style.display = 'flex';
    }
    
    hideOverlay() {
        this.overlay.style.display = 'none';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});

// Prevent scrolling with arrow keys
window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
    }
});
