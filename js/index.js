//const meuCarro = {posx: 0, posy: 0};
const myGameArea = {frames: 0, heigth: 700, lastObst: 'S'};

const myPlane = {img: 'images/plane.png', width: 50, height: 100, posX: 225, posY: 590};
const myTank = {img: 'images/tank.png', width: 20, height: 30, posX: 430, posY: 0};
const myHeliR = {img: 'images/heliR.png', width: 75, height: 75, posX: 430, posY: 0};
//const myHeli = {img: 'images/tank.png', width: 20, height: 30, posX: 430, posY: 0};
const myShipR = {img: 'images/shipR.png', width: 75, height: 45, posX: 0, posY: 0};

const myFire =  {img: 'images/fire.png', width: 50, height: 103, posX: 0, posY: 0};
//const myShip = {img: 'images/tank.png', width: 20, height: 30, posX: 430, posY: 0};


//meuCarro.posx = 225;
//meuCarro.posy = 590;

let posyPista = 0;
//const ctx = {};
let imageRoad = new Image();
imageRoad.src = 'images/road.png'; //500 x 700

let imgTank = new Image();
imgTank.src = myTank.img;

let imgPlane = new Image();
imgPlane.src = myPlane.img;

let imgShipR = new Image();
imgShipR.src = myShipR.img;

let imgHeliR = new Image();
imgHeliR.src = myHeliR.img;

let imgFire = new Image();
imgFire.src = myFire.img;

let ctx = {};

let interval = 0;


const myObstacles = [];
const myFires = [];

class Component {
  constructor(width, height, x, y, img) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;

    // new speed properties
    this.speedX = 0;
    this.speedY = 0;  
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    //const ctx = myGameArea.context;
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
 
//   crashWith(obstacle) {
//     return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
//   }  
};


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {

    ctx = document.getElementById('canvas').getContext('2d');

    ctx.drawImage(imageRoad, 0, 0, 500, 700);
    ctx.drawImage(imageRoad, 0, 700, 500, 700);

    //ctx.drawImage(imgPlane, meuCarro.posx, meuCarro.posy,41, 55);
    //ctx.drawImage(imgPlane, meuCarro.posx, meuCarro.posy,50, 29);
    ctx.drawImage(imgPlane, myPlane.posX, myPlane.posY, myPlane.width, myPlane.height);

    ctx.drawImage(imgTank, 250, 350, myTank.width, myTank.height);
    //console.log(meuCarro['posx']);
    //console.log(meuCarro['posy']);
    //atualizaDados();
    interval = setInterval(updateGameArea, 20);
  }
};

function atualizaDados(){
  ctx.clearRect(0, 0, 500, 700);

  ctx.drawImage(imageRoad, 0, posyPista, 500, 700);
  ctx.drawImage(imageRoad, 0, posyPista-700, 500, 700);

  ctx.drawImage(imgPlane, myPlane.posX, myPlane.posY, myPlane.width, myPlane.height);

  ctx.drawImage(imgTank, myTank.posX, myTank.posY, myTank.width, myTank.height);

  myTank.posY += 1;

  if (myTank.posY >= 900){
      myTank.posY = 0;
      if (myTank.posX === 430){
        myTank.posX = 50;
      }else {
        myTank.posX = 430;
      }
    };
}

function updateGameArea(){
  atualizaDados();

  updateObstacles(); 

  updateFire();
}
function updateFire(){
    for (i = 0; i < myFires.length; i++) {
        myFires[i].y -= 1;
        myFires[i].update();
      }      
}

function updateObstacles() {
  myGameArea.frames += 1;
  //console.log(myGameArea.frames);
  if (myGameArea.frames % 240 === 0) {
    let y = 0;
    let minWidth = 50;
    let maxWidth = 380;
    //let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    let posX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    //let minGap = 70;
    //let maxGap = 150;
    //let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    //myObstacles.push(new Component(width, 20, '#870007', 0, y));
    if (myGameArea.lastObst==='N'){
        myObstacles.push(new Component(myShipR.width, myShipR.height, posX, y, imgShipR));
        myGameArea.lastObst='S';
    }else{
        myObstacles.push(new Component(myHeliR.width, myHeliR.height, posX, y, imgHeliR));
        myGameArea.lastObst='N';
    }
    

    //imgHeliR
    //myObstacles.push(new Component(myHeliR.width, myHeliR.height, 500 - pos, y, imgHeliR));

  }
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += 1;
    myObstacles[i].update();
  }  

}



document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 37: // left arrow
      // if (player.x <= 0){
      //   player.x = 0;
      //   player.speedX = 0;
      //   return ;
      // }
      myPlane.posX -= 1;
      atualizaDados();
      break;
    case 39: // right arrow
      // if (player.x >= 450){
      //   player.x = 450;
      //   player.speedX = 0;
      //   return;
      // }
      myPlane.posX += 1;
      atualizaDados();
      break;
    case 32:
        //console.log(e.keyCode);
        myFires.push(new Component(myFire.width, myFire.height, myPlane.posX, myPlane.posY-100, imgFire));


  }
});