# Bugger

![Alt text](images/bugger_example.gif?raw=true "Bugger Example")

Bugger is an arcade-style game built with a game loop engine and visual assets to re-create the classic game, Frogger. The game begins with the player in the grassy bottom portion of the screen. Arrow keys or WASD are used to navigate the player across the landscape. Enemy bugs travel across the screen at different velocities as the player tries to make it to the river.

If the player collides with an enemy bug, the player loses and is reset back to the starting point on the grassy bottom portion of the screen. The player wins when they reach the river and is also reset back to the starting point to begin a new game.


Bugger utilizes the following:
* Javascript ES6
* HTML5 Canvas
* jQuery

# Gameplay and Features

Bugger contains 3 enemy bugs. In order to win, the player must reach the river.

Current features of the game include:
-[X] Laterally-moving enemies to avoid
-[X] Enemies travel at random velocities and increase in speed with each next level
-[X] Statistics (lives, scores, etc.) are tracked and updated live on-screen
-[X] Includes WASD movement
-[X] On-page instructures are viewable to guide the player

### Keyboard-Based Controls

The player controls all movement of the paddle via arrow keys or WASD. Upon triggering a keyup event, the event listener will return the direction of the arrow key.

After adding or subtracting any offset pixels, if the resulting value is positive and within the board's limitations, the player's position will be updated.

```javascript
handleInput = key => {
  switch (key) {
    case 'left':
      return this.x -= game.tileWidth;
    case 'right':
      return this.x += game.tileWidth;
    case 'up':
      this.y -= game.tileHeight;
      return this.checkWin();
    case 'down':
      return this.y += game.tileHeight;
  }
}
```

### Collision Detection

  During gameplay, two entities are able to collide with each other--the player and the enemy bug.

  Bugger uses a common algorithm for game development, 2D collision detection. In this game, an axis aligned (no rotation) rectangular shape covers both entities, the player and the enemy bugs, and are considered "hitboxes." If there is any gap between the hitboxes, there is no collision. 

  ```javascript
  checkCollisions = () => {
    allEnemies.forEach(enemy => {
      let enemyBoundingBox =
        enemy.x < this.x + game.playerWidth
        && enemy.x + (game.enemyWidth - 30) > this.x
        && enemy.y < this.y + game.playerHeight
        && enemy.y + game.enemyHeight > this.y;

        enemyBoundingBox && this.gameOver();
      });

  }
  ```

# Future Release
- [ ] Pause and Resume
