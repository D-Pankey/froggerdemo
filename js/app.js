// Enemies our player must avoid
//We put speed as a(parameter) to help when you instantiate objects
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
//The Math.random() part will return a value between 0 and 1 
//so the bug's speed will be anywhere between 300 - 500.
var Enemy = function(y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 25;
    this.y = y;
    this.speed = Math.random() * 200 + 300;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = 0;

    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 40;
    this.y = 400;
    this.speed = 50;

};




// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

    if (this.y <= -15 || this.y >= 415)
        this.y = 400;

    if (this.x <= -15)
        this.x = 0;

    if (this.x >= 415)
        this.x = 400;


    this.checkCollisions();
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Resets player back to original place
Player.prototype.reset = function() {
    this.y = 400;
    this.x = 40;
};


//Handles Collision with player

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemiesLength; i++) {
        if (this.x < (allEnemies[i].x + 50) &&
            (this.x + 50) > allEnemies[i].x &&
            this.y < (allEnemies[i].y + 50) &&
            (50 + this.y) > allEnemies[i].y) {
            this.reset();

        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var bug1 = new Enemy(125, 300);
var bug2 = new Enemy(200, 500);
var bug3 = new Enemy(100, 400);

var allEnemies = [bug1, bug2, bug3];
var allEnemiesLength = allEnemies.length;

// Place the player object in a variable called player

var player = new Player();

//When an arrow is pressed move Player in that direction if 
//If in videogame map's boundaries 
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 10;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 10;
    }
    console.log('keyPress is: ' + keyPress);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});