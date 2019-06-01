# Bugger

[insert gif]

Bugger is an arcade-style game built with a game loop engine and visual assets to re-create the classic game, Frogger. The game begins with the player in the grassy bottom portion of the screen and the arrow keys are used to navigate the player across the landscape. Enemy bugs travel across the screen at different velocities as the player tries to make it to the river.

If the player collides with an enemy bug, the player loses and is reset back to the starting point on the grassy bottom portion of the screen. The player wins when they reach the river and is also reset back to the starting point to begin a new game.


Bugger utilizes the following:
* Javascript ES6
* HTML5 Canvas
* jQuery

# Game Play and Features

Bugger contains 3 enemy bugs. In order to win, the player must reach the river.

Current features of the game include:
-[X] Laterally-moving enemies to avoid
-[X] Enemies travel at random velocities and increase in speed with each next level
-[X] Statistics (lives, scores, etc.) are tracked and updated live on-screen
-[X] On-page instructures are viewable to guide the player

## Keyboard-Based Controls

The player controls all movement of the paddle via arrow keys. Upon triggering a keyup event, the event listener will return the direction of the arrow key.

## Instructions

Use this [rubric](https://review.udacity.com/#!/rubrics/15/view) for self-checking your submission.

Make sure the functions you write are **object-oriented** - either class functions (like `Player` and `Enemy`) or class prototype functions such as `Enemy.prototype.checkCollisions`. Also make sure that the keyword `this` is used appropriately within your class and class prototype functions to refer to the object the function is called upon.

Your **README.md** file should be updated with instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
