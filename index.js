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
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }
    }
}

const player = new Player();

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}
animate();