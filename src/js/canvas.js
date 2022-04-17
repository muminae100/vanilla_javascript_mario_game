import platform from "../images/platform.png";
import hills from "../images/hills.png";
import background from "../images/background.png";
import platformSmallTall from "../images/platformSmallTall.png";

const canvas = document.querySelector("canvas");

canvas.width = 1024;
canvas.height = 576;

const c = canvas.getContext("2d");

const gravity = 0.5;
// create player
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 20;
    this.height = 20;
  }

  draw() {
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.fillStyle = "red";
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;

    this.width = this.image.width;
    this.height = this.image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;

    this.width = this.image.width;
    this.height = this.image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imgSrc) {
  const image = new Image();
  image.src = imgSrc;
  return image;
}

let player = new Player();
let platforms = [];
let genericobjects = [];

function init() {
  player = new Player();
  platforms = [
    new Platform({
      x: createImage(platform).width * 4 + 500 + 
      createImage(platform).width-createImage(platformSmallTall).width,
      y: 250,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x: 0,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width - 2,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 2 + 100,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 3 + 300,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 4 + 500,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 5 + 700,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 6 + 700 -2,
      y: 450,
      image: createImage(platform),
    }),
    new Platform({
      x: createImage(platform).width * 7 + 700 -3,
      y: 450,
      image: createImage(platform),
    })
  ];

  genericobjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
}

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericobjects.forEach((obj) => {
    obj.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericobjects.forEach((obj) => {
        obj.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericobjects.forEach((obj) => {
        obj.position.x += player.speed * 0.66;
      });
    }
  }

  // platforms collision detection
  platforms.forEach((platform) => {
    if (
      player.height + player.position.y <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // win condition
  if (scrollOffset > createImage(platform).width * 6 + 700 -2) {
    console.log("You win!");
  }

  //lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}

init();
animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      console.log("This is left");
      break;
    case 68:
      keys.right.pressed = true;
      console.log("This is right");
      break;
    case 87:
      player.velocity.y -= 15;
      console.log("This is up");
      break;

    default:
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      console.log("This is left");
      break;
    case 68:
      keys.right.pressed = false;
      console.log("This is right");
      break;

    default:
      break;
  }
});
