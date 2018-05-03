// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 450);
    }
    // check if the player collision in enemy 
    if (player.x < this.x + 70 && player.x + 70 > this.x && player.y < this.y + 65 && player.y + 65 > this.y) {
        // reset score to 0  player collision with enemy
        player.score = 0;
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '20px serif';
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + player.score, 10, 80);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
    this.score = 0;

}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the player movement 
Player.prototype.handleInput = function(key) {

    if (key == 'left' && this.x > 0) {

        this.x -= 100;
    }

    if (key == 'right' && this.x < 400) {

        this.x += 100;
    }

    if (key == 'up' && this.y > 0) {

        this.y -= 90;
    }

    if (key == 'down' && this.y < 400) {

        this.y += 90;
    }
    // if the player reach the water it will reset player to the start position 
    if (this.y < 0) {
        // increease score by 1 when the player already on water
        this.score += 1;
        if (this.score === 15) {
            alert("Congratulation! You Won!");
            this.score = 0;
        }
        setTimeout(function() {
            player.x = 200;
            player.y = 400;
        }, 300); // delay time when the player on water 


    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 400);
var moveEnemies = [60, 140, 230];

// display enimes 
moveEnemies.forEach(function(en) {
    var enemy = new Enemy(0, en, 100 + Math.floor(Math.random() * 450));
    allEnemies.push(enemy);
});



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
