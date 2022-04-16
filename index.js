const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// create player
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width = 100, this.height = 100)
    }
}

const player = new Player()

player.draw()