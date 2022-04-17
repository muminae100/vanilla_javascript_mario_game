import platform from '../images/platform.png';
import hills from '../images/hills.png';
import background from '../images/background.png';


const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

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
      c.fillRect(this.position.x, this.position.y, this.width = 100, this.height = 100)
      c.fillStyle = 'red';
    }
    update(){
        this.draw();
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
    }
}

class Platform {
    constructor({ x, y, image }){
        this.position = {
            x: x,
            y: y
        }
        this.image = image

        this.width = this.image.width
        this.height = this.image.height

    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
  constructor({ x, y, image }){
      this.position = {
          x: x,
          y: y
      }
      this.image = image

      this.width = this.image.width
      this.height = this.image.height

  }
  draw(){
      c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const player = new Player();

function createImage(imgSrc) {
  const image = new Image();
  image.src = imgSrc
  return image;
}


const platforms = [new Platform(
    {   
        x: 0,
        y: 450,
        image: createImage(platform)
    }
),new Platform(
    {   
        x: createImage(platform).width -2,
        y: 450,
        image: createImage(platform)
    }
),new Platform(
    {   
        x: (createImage(platform).width -2)*2,
        y: 450,
        image: createImage(platform)
    }
),new Platform(
  {   
      x: (createImage(platform).width + 50)* 3,
      y: 450,
      image: createImage(platform)
  }
)]

const genericobjects = [new GenericObject(
  {   
      x: -1,
      y: -1,
      image: createImage(background)
  }
),
new GenericObject(
  {   
      x: -1,
      y: -1,
      image: createImage(hills)
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

let scrollOffset = 0;

function animate(){
    requestAnimationFrame(animate);
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    genericobjects.forEach(obj => {
      obj.draw();
    });

    platforms.forEach(platform =>{
        platform.draw()
    })

    player.update();

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5;
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5;
    }
    else{
        player.velocity.x = 0;
        if(keys.right.pressed){
            scrollOffset += 5;
            platforms.forEach(platform =>{
                platform.position.x -= 5;
            })
            genericobjects.forEach(obj =>{
              obj.position.x -= 3;
            })
        }else if(keys.left.pressed){
            scrollOffset -= 5;
            platforms.forEach(platform =>{
                platform.position.x += 5;
            })
            genericobjects.forEach(obj =>{
              obj.position.x += 3;
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

    console.log(scrollOffset);

    if(scrollOffset > 2000){
        console.log("You win!")
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
            player.velocity.y -= 40;
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