//Adding PIXI app
const Application = PIXI.Application;

const speed = 4;

const app = new Application({
    width: 1600,
    height: 800,
    transparent: false,
    antialias: true
}
);

app.renderer.backgroundColor = 0x87CEEB
app.renderer.view.style.position = 'absolute';

//Appending PIXI to the dom
document.body.appendChild(app.view);

//PLAYER
//Creating the player
const Graphics = PIXI.Graphics;

const player = new Graphics();

player.beginFill(0xF1BF90);
player.lineStyle(4, 0xFFEA00, 1);
player.drawRect(200, 400, 100, 100);
player.endFill();

app.stage.addChild(player);

//Keyboard Events on Player
document.addEventListener('keydown', function (e) {
    if(e.key === 'ArrowUp')
        player.y -= 15;
    if(e.key === 'ArrowDown')
        player.y += 15;
});

//ENEMIES
//Random Spawn Function
const enemy = new Graphics();

enemy.beginFill(0xF15757);
enemy.lineStyle(4, 0x7A2C2C, 1)
enemy.drawRect(1200, 400, 100, 100);
enemy.endFill();

app.stage.addChild(enemy);

app.ticker.add(gameLoop);

//Making the enemy move on the x-axis
function gameLoop(delta) {
    enemy.x -= speed;

    if (rectsIntersect(player, enemy)) {
        //add healthbar -
        health -= 10;
        healthBar.updateHealth(health);
        //kill the enemy
        speed = 0;
    }
}

//Detect collision on the player and enemy
function rectsIntersect (a, b){
    const aBox = a.getBounds();
    const bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}

//HEALTHBAR
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 320;
const height = canvas.height = 50;

let health = 100;
const healthBarWidth = 200;
const healthBarHeight = 30;
const x = width / 2 - healthBarWidth / 2;
const y = height / 2 - healthBarHeight / 2;

const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "green");

const frame = function() {
  context.clearRect(0, 0, width, height);
  healthBar.show(context);
  requestAnimationFrame(frame);
}

frame();










