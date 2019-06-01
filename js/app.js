let game = {
    startButton: $('#start-button'),
    winMessage: $('#win-message'),
    gameOver: $('#game-over'),
    tileWidth: 100,
    tileHeight: 80,
    upperLimit: 400,
    lowerLimit: 0,
    enemyWidth: 105,
    enemyHeight: 60,
    playerWidth: 75,
    playerHeight: 60,
    accelerator: 1.2,
};

//Enemy bug constructor
class Enemy {
    constructor(sprite, x = 0, y = 140, direction, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed
        this.direction = direction;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update = dt => {
        switch (this.direction) {
            case "+":
                this.x += (this.speed * dt);
                this.x > (game.upperLimit + game.enemyWidth) &&
                    this.randomizeBugSpecs("+");
                break;
            case "-":
                this.x -= (this.speed * dt);
                this.x < (game.lowerLimit - game.enemyWidth) &&
                    this.randomizeBugSpecs("-");
                break;

        }
    }

    randomizeBugSpecs = direction => {
        switch (direction) {
            case "+":
                this.sprite = 'images/enemy-bug.png'
                this.x = game.lowerLimit - game.enemyWidth
                break;
            case "-":
                this.sprite = 'images/enemy-bug-reverse.png'
                this.x = game.upperLimit + game.enemyWidth
                break;
        }

        this.speed = Math.floor(Math.random() * 250) + 200;
        this.changeDirection();
    };

    // Draw the enemy on the screen, required method for game
    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    changeDirection = () => {
        let newDir = Math.random();
        (newDir > 0.5) ? (this.direction = "+") : (this.direction = "-")
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x = game.tileWidth * 2, y = game.tileHeight * 6) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
    };

    update = () => {
        //Player board limitations
        if (this.x < game.lowerLimit) {
            this.x = game.lowerLimit;
        }
        else if (this.x > game.upperLimit) {
            this.x = game.upperLimit;
        }
        else if (this.y < game.lowerLimit) {
            this.y = game.lowerLimit;
        }
        else if (this.y > game.upperLimit) {
            this.y = game.upperLimit;
        }
    }

    //Draws player on board
    render = () => {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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

    //2D collision detection
    checkCollisions = () => {
        allEnemies.forEach(enemy => {
            let enemyBoundingBox =
                enemy.x < this.x + game.playerWidth
                && enemy.x + (game.enemyWidth - 30) > this.x
                && enemy.y < this.y + game.playerHeight
                && enemy.y + game.enemyHeight > this.y;

            enemyBoundingBox && this.gameOver();
        })

    }

    checkWin = () => {
        if (this.y === 0) {
            game.winMessage.toggle();
            setTimeout(() => {
                game.winMessage.toggle();
                this.reset();
            }, 700);
        }
    }

    gameOver = () => {
        game.gameOver.toggle();
        setTimeout(() => {
            this.reset()
        }, 500);
        allEnemies = [];
    }

    reset(x = game.tileWidth * 2, y = game.tileHeight * 6) {
        setTimeout(() => {
            this.x = x;
            this.y = y;
        }, 100)
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let initiateGame = () => {
    player = new Player();

    allEnemies = [];
    enemyDirection = Math.random() > 0.5
        ? "+"
        : "-"
    enemySprite = enemyDirection === "+"
        ? 'images/enemy-bug.png'
        : 'images/enemy-bug-reverse.png'


    alphaBug = new Enemy(
        enemySprite,
        -105,
        60,
        enemyDirection,
        Math.floor(Math.random() * 250) + 200);
    betaBug = new Enemy(
        enemySprite,
        -105,
        140,
        enemyDirection,
        Math.floor(Math.random() * 250) + 200);
    gammaBug = new Enemy(
        enemySprite,
        -105,
        220,
        enemyDirection,
        Math.floor(Math.random() * 250) + 200);
}

let startGame = () => (
    allEnemies.push(alphaBug, betaBug, gammaBug)
)




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        83: 'down',
        68: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

initiateGame();

//jQuery
game.startButton
    .on('click', () => {
        startGame();
        game.startButton.toggle();
    })

game.gameOver
    .on('click', () => {
        startGame();
        game.gameOver.toggle();
    })