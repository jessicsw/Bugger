const game = {
    startButton: $('#start-button'),
    winMessage: $('#win-message'),
    gameOver: $('#game-over'),
    points: document.getElementById('points'),
    hearts: document.getElementById('hearts'),
    tileWidth: 80,
    tileHeight: 77,
    upperXLimit: 420,
    lowerXLimit: 20,
    upperYLimit: 400,
    lowerYLimit: 20,
    enemyWidth: 100,
    enemyHeight: 42,
    offset: 20,
    playerWidth: 50,
    playerHeight: 56,
    accelerator: 1.2,
};

let score = 0,
    levelUpPoints = 50,
    hearts = 6;


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
                this.x > (game.upperXLimit + game.enemyWidth) &&
                    this.randomizeBugSpecs("+");
                break;
            case "-":
                this.x -= (this.speed * dt);
                this.x < (0 - game.enemyWidth) &&
                    this.randomizeBugSpecs("-");
                break;

        }
    }

    randomizeBugSpecs = direction => {
        let startPos = this.sprite.indexOf('-') + 1;
        let endPos = this.sprite.indexOf('-', startPos) === -1
            ? this.sprite.indexOf('.', startPos)
            : this.sprite.indexOf('-', startPos);
        let newSprite = this.sprite.substring(startPos, endPos);

        switch (direction) {
            case "+":
                this.sprite = 'images/enemy-' + newSprite + '.png'
                this.x = game.lowerXLimit - game.enemyWidth
                break;
            case "-":
                this.sprite = 'images/enemy-' + newSprite + '-reverse.png'
                this.x = game.upperXLimit + game.enemyWidth
                break;
        }

        this.speed = Math.floor(Math.random() * 150) + 100;
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
    constructor(x = game.offset * 9, y = game.offset * 20) {
        this.sprite = 'images/char-pink.png';
        this.x = x;
        this.y = y;
        this.loseHeart = false;
    };

    update = () => {
        //Player board limitations
        if (this.x < game.lowerXLimit) {
            this.x = game.lowerXLimit;
        }
        else if (this.x > game.upperXLimit) {
            this.x = game.upperXLimit;
        }
        else if (this.y < game.lowerYLimit) {
            this.y = game.lowerYLimit;
        }
        else if (this.y > game.upperYLimit) {
            this.y = game.upperYLimit;
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

            let currentSpeed = enemy.speed;
            if (enemyBoundingBox) {
                this.loseHeart = true;

                this.reset();
            }
        })
    }


    //Player status
    levelUp = () => {
        game.accelerator = 1.05;
    }

    score = points => {
        score += points;
        this.speed *= 1.2;

        game.points.innerHTML = score;

        if (score > 250) {
            levelUp();
        }
    }

    removeHeart = () => {
        switch (this.loseHeart) {
            case true:
                let li = document.getElementsByTagName('li');
                game.hearts.removeChild(li[0]);
                hearts -= 1;

                if (hearts === 0) {
                    game.hearts.innerHTML = "";
                    this.gameOver();
                }

                this.loseHeart = false;
                break;
            case false:
                break;
        }
    }


    //Game status
    checkWin = () => {
        if (this.y === 15) {
            game.winMessage.toggle();
            this.score(levelUpPoints)

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

        score = 0;
        hearts = 5;
        allEnemies = [];
    }

    reset = (x = game.offset * 9, y = game.offset * 20) => {
        setTimeout(() => {
            this.removeHeart();
            this.x = x;
            this.y = y;
        }, 100)

    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let initiateHearts = () => {
    for (let i = 0; i < hearts; i++) {
        let heartEl = document.createElement('li');
        game.hearts.appendChild(heartEl);
        heartEl.innerHTML = '<img src="images/heart.png">'
    }
}

let initiateGame = () => {
    player = new Player();

    initiateHearts();

    allEnemies = [];
    enemySpeed = 125;
    enemyXpos = - game.enemyWidth;

    enemyDirection = Math.random() > 0.5
        ? "+"
        : "-"

    // Enemy sprites
    alphaSprite = enemyDirection === "+"
        ? 'images/enemy-spider.png'
        : 'images/enemy-spider-reverse.png'

    betaSprite = enemyDirection === "+"
        ? 'images/enemy-ghost.png'
        : 'images/enemy-ghost-reverse.png'

    gammaSprite = enemyDirection === "+"
        ? 'images/enemy-snail.png'
        : 'images/enemy-snail-reverse.png'

    deltaSprite = enemyDirection === "+"
        ? 'images/enemy-fly.png'
        : 'images/enemy-fly-reverse.png'


    //Enemy objects
    alphaBug = new Enemy(
        alphaSprite,
        enemyXpos,
        110,
        enemyDirection,
        Math.floor(Math.random() * (enemySpeed + 25)) + enemySpeed);
    betaBug = new Enemy(
        betaSprite,
        enemyXpos,
        179,
        enemyDirection,
        Math.floor(Math.random() * (enemySpeed + 25)) + enemySpeed);
    gammaBug = new Enemy(
        gammaSprite,
        enemyXpos,
        268,
        enemyDirection,
        Math.floor(Math.random() * (enemySpeed + 25)) + enemySpeed);
    deltaBug = new Enemy(
        deltaSprite,
        enemyXpos,
        349,
        enemyDirection,
        Math.floor(Math.random() * (enemySpeed + 25)) + enemySpeed);
}

let startGame = () => (
    allEnemies.push(alphaBug, betaBug, gammaBug, deltaBug)
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
        initiateGame();
        startGame();
        game.gameOver.toggle();
    })