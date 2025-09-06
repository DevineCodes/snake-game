# 🐍 Snake Game

A modern, responsive Snake game built with HTML5 Canvas, CSS3, and JavaScript. Features smooth gameplay, touch controls, and a retro neon aesthetic.

## 🎮 Features

- **Classic Snake Gameplay**: Control the snake to eat food and grow
- **Multiple Control Methods**: 
  - Keyboard arrow keys
  - On-screen buttons
  - Touch/swipe gestures for mobile
- **Progressive Difficulty**: Speed increases as you score more points
- **High Score Tracking**: Persistent high score saved locally
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Neon green theme with glowing effects
- **Pause Functionality**: Press SPACE to pause/resume

## 🕹️ How to Play

1. **Start**: Press SPACE or use arrow keys to begin
2. **Move**: Use arrow keys or on-screen buttons to control the snake
3. **Eat**: Guide the snake to the red food to grow and score points
4. **Avoid**: Don't hit the walls or your own tail
5. **Pause**: Press SPACE anytime to pause/resume the game

## 🎯 Controls

- **Arrow Keys**: Move the snake (Up, Down, Left, Right)
- **SPACE**: Start game / Pause/Resume
- **Touch/Swipe**: Mobile gesture controls
- **On-screen Buttons**: Touch-friendly directional controls

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch-friendly on-screen controls
- Swipe gesture recognition
- Optimized canvas size for mobile screens
- Responsive UI layout

## 🚀 Getting Started

1. Clone this repository
2. Open `home.html` in your web browser
3. Start playing immediately - no installation required!

### Running Locally

```bash
# Clone the repository
git clone <your-repo-url>
cd snake-game

# Serve the files (optional, for development)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/home.html
```

## 📁 Project Structure

```
├── home.html      # Main HTML file
├── styles.css     # Game styling and animations
├── game.js        # Game logic and mechanics
└── README.md      # This file
```

## 🎨 Technical Details

- **Canvas Rendering**: 2D graphics with shadow effects
- **Game Loop**: Consistent timing with speed scaling
- **Local Storage**: High score persistence
- **Event Handling**: Keyboard, touch, and button inputs
- **Responsive CSS**: Mobile-first design approach

## 🏆 Scoring System

- **+10 points** per food eaten
- **Speed increases** every 50 points
- **High score** automatically saved and displayed

## 🎯 Future Enhancements

- Sound effects and background music
- Multiple difficulty levels
- Power-ups and special food items
- Multiplayer mode
- Leaderboard system

## 🛠️ Built With

- HTML5 Canvas
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Local Storage API

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Enjoy playing Snake! 🐍🎮
