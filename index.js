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
        this.width = 30
        this.height = 30
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

const player = new Player();

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

    if(keys.right.pressed){
        player.velocity.x = 5;
    }
    else if(keys.left.pressed){
        player.velocity.x = -5;
    }
    else{
        player.velocity.x = 0;
    }
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