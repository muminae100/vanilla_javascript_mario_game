const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const gravity = 0.5;
// create player
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 20
        this.height = 20
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width = 100, this.height = 100)
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }
    }
}

class Platform {
    constructor({ x, y }){
        this.position = {
            x: x,
            y: y
        }
        this.width = 200
        this.height = 20
    }
    draw(){
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();

const platforms = [new Platform(
    {   
        x: 200,
        y: 250
    }
),new Platform(
    {   
        x: 500,
        y: 400
    }
),new Platform(
    {   
        x: 800,
        y: 300
    }
)]

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    platforms.forEach(platform =>{
        platform.draw()
    })

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5;
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5;
    }
    else{
        player.velocity.x = 0;
        if(keys.right.pressed){
            platforms.forEach(platform =>{
                platform.position.x -= 5;
            })
        }else if(keys.left.pressed){
            platforms.forEach(platform =>{
                platform.position.x += 5;
            })
        }
    }

    // platforms collision detection
    platforms.forEach(platform =>{
    if(player.height + player.position.y <= platform.position.y
        && player.position.y + player.height + player.velocity.y 
        >= platform.position.y && player.position.x + player.width >=
        platform.position.x && player.position.x <= platform.position.x +
        platform.width){
        player.velocity.y = 0;
    }
    })
}
animate();

window.addEventListener('keydown', ( { keyCode } )=>{
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            console.log('This is left');
            break;
        case 68:
            keys.right.pressed = true;
            console.log('This is right');
            break;
        case 87:
            player.velocity.y -= 20;
            console.log('This is up');
            break;
    
        default:
            break;
    }
})

window.addEventListener('keyup', ( { keyCode } )=>{
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            console.log('This is left');
            break;
        case 68:
            keys.right.pressed = false;
            console.log('This is right');
            break;
        case 87:
            player.velocity.y = 0;
            console.log('This is up');
            break;
    
        default:
            break;
    }
})