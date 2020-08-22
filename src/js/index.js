//const meuCarro = {posx: 0, posy: 0};
//statusGame: E - Executando / P - Parado
const myGameArea = {frames: 0, width: 500, heigth: 700, lastObst: 'S', lastBack: '1', statusGame: 'E', sumHeli: 0, sumShip: 0, maxHeli: 20, maxShip: 20, limL: 50, limR: 50};

const myPlane = {img: 'src/images/plane.png', width: 50, height: 100, posX: 225, posY: 590, fuel: 5000, speed: 4, maxFuel: 5000};
const myTank = {img: 'src/images/tank.png', width: 20, height: 30, posX: 430, posY: 0};
const myHeliR = {img: 'src/images/heliR.png', width: 75, height: 75, posX: 430, posY: 0};
const myHeliL = {img: 'src/images/heliL.png', width: 75, height: 75, posX: 430, posY: 0};
const myShipR = {img: 'src/images/shipR.png', width: 75, height: 45, posX: 0, posY: 0};
const myShipL = {img: 'src/images/shipL.png', width: 75, height: 45, posX: 0, posY: 0};
const mySpaceShip =  {img: 'src/images/spaceship.png', width: 100, height: 63, posX: 0, posY: -2100, life: 10, direction: 'L', show: true};

const myFire =  {img: 'src/images/fire.png', width: 50, height: 103, posX: 0, posY: 0};
//const myShip = {img: 'src/images/tank.png', width: 20, height: 30, posX: 430, posY: 0};

let imgGameOver = new Image();
imgGameOver.src = 'src/images/gameover.png';

//Atualiza os dados da missão no html
let maxShipCss = document.getElementById('maxShip');
let maxHeliCss = document.getElementById('maxHeli');
maxShipCss.innerText = myGameArea.maxShip;
maxHeliCss.innerText = myGameArea.maxHeli;

let imgGameWin = new Image();
imgGameWin.src = 'src/images/winner.png';

const myExplosion =  {img: 'src/images/explosion.png', width: 50, height: 70, posX: 0, posY: 0};
//meuCarro.posx = 225;
//meuCarro.posy = 590;

let posyPista = 0;
let intervaloTank = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
//const ctx = {};
let imageRoad = new Image();
imageRoad.src = 'src/images/road.png'; //500 x 700

let imageRoad2 = new Image();
imageRoad2.src = 'src/images/road2.png'; //500 x 700

let imageRoad3 = new Image();
imageRoad3.src = 'src/images/road3.png'; //500 x 700

let imageRoad4 = new Image();
imageRoad4.src = 'src/images/road4.png'; //500 x 700

let imageAtual = imageRoad;
let imageNext = imageRoad2;

let imgTank = new Image();
imgTank.src = myTank.img;

let imgPlane = new Image();
imgPlane.src = myPlane.img;

let imgShipR = new Image();
imgShipR.src = myShipR.img;

let imgShipL = new Image();
imgShipL.src = myShipL.img;

let imgHeliR = new Image();
imgHeliR.src = myHeliR.img;

let imgHeliL = new Image();
imgHeliL.src = myHeliL.img;

let imgFire = new Image();
imgFire.src = myFire.img;

let imgExplosion = new Image();
imgExplosion.src = myExplosion.img;

let imgSpaceShip = new Image();
imgSpaceShip.src = mySpaceShip.img;

let ctx = {};

let interval = 0;
let interval2 = 0;

let contExpl = 0;
const myCrush = [];
const myObstacles = [];
const myFires = [];
const myTanks = [];

class Component {
  constructor(width, height, x, y, img, typeObj) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;
    this.typeObj = typeObj;

  }

  update() {

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

};

class Crush extends Component {
  constructor(width, height, x, y, img, typeObj, cont, indexObj, indexFire){
    super(width, height, x, y, img, typeObj);
    this.cont = cont;
    this.indexObj = indexObj;
    this.indexFire = indexFire;
  }
};


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {

    let btnStar = document.getElementById('start-button');
    btnStar.blur();

    ctx = document.getElementById('canvas').getContext('2d');

    //ctx.drawImage(imageRoad, 0, 0, 500, 700);
    //ctx.drawImage(imageRoad2, 0, 700, 500, 700);

    //ctx.drawImage(imgPlane, meuCarro.posx, meuCarro.posy,41, 55);
    //ctx.drawImage(imgPlane, meuCarro.posx, meuCarro.posy,50, 29);
    ctx.drawImage(imgPlane, myPlane.posX, myPlane.posY, myPlane.width, myPlane.height);

    ctx.drawImage(imgTank, 250, 350, myTank.width, myTank.height);
    //console.log(meuCarro['posx']);
    //console.log(meuCarro['posy']);
    //atualizaDados();
    //if (interval===0){
      interval = setInterval(updateGameArea, 20);
    //}
  }
};

function atualizaDados(){
  ctx.clearRect(0, 0, 500, 700);
  
  posyPista += 1;

  //ctx.drawImage(imageRoad, 0, posyPista, 500, 700);
  //ctx.drawImage(imageRoad, 0, posyPista-700, 500, 700);
  ctx.drawImage(imageAtual, 0, posyPista, 500, 700);
  ctx.drawImage(imageNext, 0, posyPista-700, 500, 700);

  if (posyPista>700){
    switch (myGameArea.lastBack) {
      case '0': 
        imageAtual = imageRoad;
        imageNext = imageRoad2;
        myGameArea.lastBack = '1';
        myGameArea.limL = 50; 
        myGameArea.limR = 50; 
        break;
      case '1': 
        imageAtual = imageRoad2;
        imageNext = imageRoad3;
        myGameArea.lastBack = '2';
        myGameArea.limL = 150; 
        myGameArea.limR = 150; 
        break;
      case '2': 
        imageAtual = imageRoad3;
        imageNext = imageRoad4;
        myGameArea.lastBack = '3';
        myGameArea.limL = 150; 
        myGameArea.limR = 150; 
        break;
      case '3':
        imageAtual = imageRoad4;
        imageNext = imageRoad;
        myGameArea.lastBack = '0';
        myGameArea.limL = 50; 
        myGameArea.limR = 50; 
        break;
      // case '4':
      //   imageAtual = imageRoad4;
      //   imageNext = imageRoad;
      //   myGameArea.lastBack = '1';
      //   break;
  
    }
    //console.log('lastback'+myGameArea.lastBack);
  
    posyPista = 0;
  }

  ctx.drawImage(imgPlane, myPlane.posX, myPlane.posY, myPlane.width, myPlane.height);

}

function updateGameArea(){
  atualizaDados();

  updateObstacles(); 

  updateSpaceShip();

  updateFire();

  updateCrush();

  updateFuel();

  updateTank();

  updatePlaneCrush();

  updateScore();

}

function updateSpaceShip(){

  // if (myGameArea.frames % 360 === 0) {
    
  // }
  if (mySpaceShip.show){

    ctx.drawImage(imgSpaceShip, mySpaceShip.posX, mySpaceShip.posY, mySpaceShip.width, mySpaceShip.height);

    mySpaceShip.posY += 2;
    
    if (mySpaceShip.direction==='L'){
      mySpaceShip.posX += 2;
      if (mySpaceShip.posX>=350){
        mySpaceShip.direction='R';
      }
    }else {
      mySpaceShip.posX -= 2;
      if (mySpaceShip.posX<=50){
        mySpaceShip.direction='L';
      }
    }

    if (mySpaceShip.posY >3000){
      mySpaceShip.posY = 0;
      mySpaceShip.posX = 0;
    }
  }else {
    mySpaceShip.posY = 900;
    mySpaceShip.posX = 600;
  }

}

function updateScore(){
  ctx.font = "normal 20px Arial";
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.fillText(`Sum Ship: ${myGameArea.sumShip}`, 230, 30);
  ctx.fillText(`Sum Helicopter: ${myGameArea.sumHeli}`, 230, 60);

  ctx.textAlign = 'left';

  // verifica se conseguei atingir o objetivo
  //console.log(myGameArea.maxShip/2);
  //console.log(myGameArea.maxHeli/2);
  if (myGameArea.sumShip >= myGameArea.maxShip/2 && myGameArea.sumHeli >= myGameArea.maxHeli/2 && interval2 ===0){
    interval2 = setInterval(updateGameArea, 10);
  }

  if (myGameArea.sumShip >= myGameArea.maxShip && myGameArea.sumHeli >= myGameArea.maxHeli ){
    //Ganhou 
    updateFimJogo('W');
  }
}

function updatePlaneCrush(){

  let carregouTank = false;
  for (i = 0; i < myObstacles.length; i++) {

    if (myObstacles[i].y <=700){
      //(myObstacles[j].y >= (myFires[i].y-myFires[i].height+50))
      if (myObstacles[i].y >= myPlane.posY-myPlane.height+45){
        if (myPlane.posX+20 >= myObstacles[i].x  && myPlane.posX <= myObstacles[i].x+myObstacles[i].width-10){
        
          //console.log('bateu');
          updateFimJogo('L');
          
          myCrush.push(new Crush(myExplosion.width, myExplosion.height, myPlane.posX, myPlane.posY, imgExplosion, 'E', 0, 0, 0));
          myCrush[myCrush.length-1].update();

        }
      }
    }
  }
  //se bater em algum obstaculo chama a rotina de fim de jogo
  //updateFimJogo('L');
}

function updateTank(){

  if (myGameArea.frames % intervaloTank === 0) {

    intervaloTank = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
    let minWidth = 50;
    let maxWidth = 430;
    let posX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    
    myTanks.push(new Component(myTank.width, myTank.height,posX, 0, imgTank, 'T'));

  }

  let carregouTank = false;
  for (i = 0; i < myTanks.length; i++) {

    if (myTanks[i].y <=700){
      if (myTanks[i].y >= myPlane.posY-myPlane.height+65){
        if (myPlane.posX+30 >= myTanks[i].x  && myPlane.posX <= myTanks[i].x+myTanks[i].width+30){
          carregouTank = true;
          myTanks.splice(i,1);
          if (myPlane.fuel <= 4000){
            myPlane.fuel += 1000;
            if (myPlane.fuel > (myPlane.maxFuel*.25)){
              myPlane.speed = 4;
            }
          }else {
            myPlane.fuel = 5000;
          }          
        }
      }
      if (!carregouTank){
        myTanks[i].y += 1;
        myTanks[i].update();    
      }
    }else {
      myTanks.splice(i,1);
    }
  } 
}

function updateFuel(){
  //ctx.fillStyle = black;
  //ctx.fillRect(450, 0, 75, 50);
  ctx.beginPath();
  ctx.rect(395, 10, 100, 25);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.stroke(); 

  ctx.beginPath();
  if (myPlane.fuel > 0) {
    ctx.rect(395, 10, myPlane.fuel/50, 25);
    if (myPlane.fuel < (myPlane.maxFuel*.25)) {
      //console.log('red');
      ctx.fillStyle = 'red';
      myPlane.speed = 2;
    }else {
      ctx.fillStyle = 'yellow';
    }
  }
  //}else{
   // ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'black';
  ctx.stroke();  

  ctx.font = "normal 20px Arial";
  ctx.fillStyle = 'black';
  ctx.fillText('Fuel', 350, 30);
  ctx.drawImage(imgTank, 325, 8, myTank.width, myTank.height);
  ctx.fillStyle = 'black';
  ctx.fillText('E', 398, 30);
  ctx.fillText('F', 477, 30);

  if (myPlane.fuel>0){
    myPlane.fuel -=1;
  }else {
    //chamar game over
    updateFimJogo('L');
  }
}

function updateFimJogo(lcTipo){
  myGameArea.statusGame = 'P';

  clearInterval(interval);
  clearInterval(interval2);
  ctx.drawImage(imgGameOver, 10, 100, 500, 423); //500X423

  if (lcTipo==='L'){
    ctx.font = "bold 60px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText('You Lose!!', 100, 450);
    ctx.strokeStyle = 'black';
    ctx.strokeText('You Lose!!', 100, 450);

  }else {
    ctx.drawImage(imgGameWin, 100, 230, 300, 300);
  }
}
function updateCrush(){
    for(i=0; i<myCrush.length;i++){
      if (myCrush[i].cont <= 20){
        myCrush[i].y += 1;
        myCrush[i].update(); 
        myCrush[i].cont += 1;
      }else {
        myCrush.splice(i,1);
      }
    }  
}
function updateFire(){

    let crushObj = false;

    for (i = 0; i < myFires.length; i++) {
        //Varre os obstaculos para saber se estão na mesma posição x e y do fire
        for (j = 0; j < myObstacles.length; j++) {
          //se o y estiver na mesma coordenada verifica a posição x se está dentro do objeto
          crushObj = false;

          if (myObstacles[j].y >= (myFires[i].y-myFires[i].height+50)){
            if ((myFires[i].x+20)  >= myObstacles[j].x  && myFires[i].x+30  <= (myObstacles[j].x + myObstacles[j].width)){
              crushObj = true; 
            }
          }

          if (!crushObj){
            if (myFires[i].y >= 0){
              myFires[i].y -= 1;
              myFires[i].update();    
            }else {
              myFires.splice(i,1);
            }
            
          }else {
            myCrush.push(new Crush(myExplosion.width, myExplosion.height, myObstacles[j].x, myObstacles[j].y, imgExplosion, 'E', 0, j, i));

            if (myObstacles[j].typeObj==='S'){
              myGameArea.sumShip += 1;
            }else {
              myGameArea.sumHeli += 1;
            }


            myObstacles.splice(j,1);
            myFires.splice(i,1);

          }
        } 

        //verifica se bateu na spaceship
        crushObj = false;

        if (mySpaceShip.posY >= (myFires[i].y-myFires[i].height+63) && mySpaceShip.posY < 700 && mySpaceShip.posY){
          if ((myFires[i].x+20)  >= mySpaceShip.posX  && myFires[i].x+30  <= (mySpaceShip.posX + 100)){
            //console.log('bateu nave');
            mySpaceShip.life -= 1;

            myCrush.push(new Crush(myExplosion.width, myExplosion.height, mySpaceShip.posX, mySpaceShip.posY, imgExplosion, 'E', 0, 0, i));
            myFires.splice(i,1);
            //console.log(mySpaceShip.life);

            if (mySpaceShip.life<= 0){
              mySpaceShip.show = false;
            }
          }
        }

    }         
}

function updateObstacles() {
  myGameArea.frames += 1;
  //console.log(myGameArea.frames);
  if (myGameArea.frames % 240 === 0) {
    let y = 0;

    //let minWidth = 50 ;
    let minWidth = myGameArea.limL;
    //let maxWidth = 380 (500 - 75- 50);
    let maxWidth = (myGameArea.width - 75 - myGameArea.limR);
    //let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    //console.log('limite:' + myGameArea.limR);

    let posX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);

    //console.log(posX);
    //let minGap = 70;
    //let maxGap = 150;
    //let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    //myObstacles.push(new Component(width, 20, '#870007', 0, y));
    if (myGameArea.lastObst==='N'){
        //myObstacles.push(new Component(myShipR.width, myShipR.height, posX, y, imgShipR, 'S'));
        myObstacles.push(new Component(myShipR.width, myShipR.height, posX, y, (posX >220  ? imgShipR : imgShipL), 'S'));
        myGameArea.lastObst='S';
    }else{
        myObstacles.push(new Component(myHeliR.width, myHeliR.height, posX, y, (posX >220  ? imgHeliR : imgHeliL), 'H'));
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
  if (myGameArea.statusGame==='E'){
    switch (e.keyCode) {
      case 37: // left arrow
        // if (player.x <= 0){
        //   player.x = 0;
        //   player.speedX = 0;
        //   return ;
        // }
        if (myPlane.posX >= myGameArea.limL){
          myPlane.posX -= myPlane.speed;
          atualizaDados();
        }
        break;
      case 39: // right arrow
        // if (player.x >= 450){
        //   player.x = 450;
        //   player.speedX = 0;
        //   return;
        // }
        if (myPlane.posX <= (myGameArea.width - myPlane.width - myGameArea.limR)){
          myPlane.posX += myPlane.speed;
          atualizaDados();
        }
        break;
      case 32: //space bar
          //console.log(e.keyCode);
          myFires.push(new Component(myFire.width, myFire.height, myPlane.posX, myPlane.posY-100, imgFire, 'F'));
          break;
      // case 84:
      //   //console.log('teste');
      //   interval = setInterval(updateGameArea, 10);
      //   break;
    }
  }
});