/* Four global variables to hold the furthest possible values for rendering correctly
 * X-values ust far enough off "map" so the whole image can load before rendering in view.
 */
var leftEdge = -101;
var rightEdge = 589;
var bottomEdge = 435;
var topEdge = 15;

// Enemies our player must avoid
var Enemy = function(initialY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.direction = this.setDirection();
    this.speed = (this.direction === 'right') ? this.setSpeed() : this.setSpeed() * -1;
    
    this.x = (this.direction === 'right') ? leftEdge : rightEdge;
    this.y = initialY * 83; 

    this.sprite = (this.direction === 'right') ? 'images/enemy-bug.png' : 'images/enemy-bug-flipped.png';
    
    return this;
};

//Sets enemy speed to a random value between 25 and 125
//each time the player reaches the end, speed increases by 10 times the level number
Enemy.prototype.setSpeed = function() {
    return Math.floor(Math.random() * 100) + 25 + (player.level * 10);
}

//Sets initial starting direction/side to either left or right
Enemy.prototype.setDirection = function() {
    var startingDir = Math.floor(Math.random() * 2) + 1;

    return (startingDir === 1 ) ? 'left' : 'right'; 
};

//If enemy goes past edge of rendered map, it generates new random attributes
Enemy.prototype.reset = function() {
    this.direction = this.setDirection();
    this.speed = (this.direction === 'right') ? this.setSpeed() : this.setSpeed() * -1;
    
    this.x = (this.direction === 'right') ? leftEdge : rightEdge;

    this.sprite = (this.direction === 'right') ? 'images/enemy-bug.png' : 'images/enemy-bug-flipped.png';  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    //If enemy's new location is off map, call reset()
    if ((this.x < leftEdge && this.direction === 'left') || (this.x > rightEdge && this.direction === 'right'))
    {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

///////////Player Class

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initialX, initialY) {

    this.x = initialX;
    this.y = initialY;
    this.level = 0;

    this.sprite = 'images/char-boy.png';

    return this;
};

//Initial rendering function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Not totally necessary at present
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

//Helper function to isolate player X-movement and check for valid amounts
Player.prototype.moveX = function(value) {
    if ((this.x + value) > 420) {
        this.x = 420;
    }

    else if ((this.x + value) < 0) {
        this.x = 0;
    }

    else {
        this.x += value;
    }
};

//Helper function to isolate player Y-movement and check for valid amounts
Player.prototype.moveY = function(value) {
    if ((this.y + value) > bottomEdge) {
        this.y = bottomEdge;
    }

    else if ((this.y + value) < topEdge) {
        this.x = 200;
        this.y = bottomEdge;
        this.level += 1;
    }
    
    else {
        this.y += value;
    }
};

//Accepts input and calls helper functions 
Player.prototype.handleInput = function(key) {
    switch( key )
    {
        case 'up':
            this.moveY(-30);
            break;

        case 'down':
            this.moveY(30);
            break;
        
        case 'left':
            this.moveX(-30);
            break;

        case 'right':
            this.moveX(30);
            break;

        default:
            break;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = bottomEdge;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200,bottomEdge);
var allEnemies = [];

//Pushes five enemies into allEnemies array
//"i" will determine the row that this particular enemy uses
for( var i = 0; i < 5; i++ ) {
    allEnemies.push( new Enemy(i) );
}

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
