"use strict";

let SCORE = 0;
let pacman = {};
let enemies = [];
let stageItems = [];
let OUT_OF_BOUNDS_X = 0;
let OUT_OF_BOUNDS_Y = 0;
const MAIN_THEME_SOUND = new Audio("sound/theme.mp3");
const DYING_SOUND = new Audio("sound/dead.mp3");
const EAT_SOUND = new Audio("sound/eat.mp3");
const EAT_FRUIT_SOUND = new Audio("sound/eat-fruit.mp3");
const POWERUP_DURATION = 15;
const REFRESH_RATE = 250;

const selectRandomStage = (currentStage = 0) => {
  const totalStage = 4;
  let randomStage = 0;
  if (currentStage > 0) randomStage = currentStage;
  else randomStage = Math.floor(Math.random() * totalStage) + 1;
  if (randomStage === 1) {
    stageItems = [
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 3, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 3, 5],
      [5, 1, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 1, 5],
      [5, 2, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2, 5],
      [5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5],
      [5, 2, 1, 1, 5, 1, 5, 1, 5, 1, 5, 0, 5, 1, 5, 1, 5, 1, 5, 1, 1, 2, 5],
      [5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
      [5, 3, 1, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1, 1, 3, 5],
      [5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5],
      [5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5],
      [5, 1, 5, 5, 5, 5, 5, 1, 5, 5, 0, 0, 0, 5, 5, 1, 5, 5, 5, 5, 5, 1, 5],
      [0, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 0],
      [5, 1, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1, 5],
      [5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5],
      [5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5],
      [5, 3, 1, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1, 1, 3, 5],
      [5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
      [5, 2, 1, 1, 5, 1, 5, 1, 5, 1, 5, 0, 5, 1, 5, 1, 5, 1, 5, 1, 1, 2, 5],
      [5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 5],
      [5, 2, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2, 5],
      [5, 1, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 1, 5],
      [5, 3, 1, 1, 5, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 5, 1, 1, 3, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ];
    pacman = {
      xPos: 11,
      yPos: 21,
      direction: "",
      state: "",
    };

    enemies = [
      { xPos: 9, yPos: 11, direction: "", state: 0 },
      { xPos: 10, yPos: 11, direction: "", state: 0 },
      { xPos: 11, yPos: 11, direction: "", state: 0 },
      { xPos: 12, yPos: 11, direction: "", state: 0 },
    ];
  } else if (randomStage === 2) {
    stageItems = [
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 2, 5],
      [5, 1, 5, 5, 1, 5, 1, 5, 5, 1, 1, 5, 5, 1, 5, 1, 5, 5, 1, 5],
      [5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 5, 1, 5, 0, 0, 0, 0, 5, 1, 5, 5, 1, 5, 1, 5],
      [5, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 5],
      [5, 1, 5, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5],
      [5, 1, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 1, 5],
      [5, 2, 1, 1, 1, 5, 1, 1, 1, 1, 0, 1, 1, 1, 5, 1, 1, 1, 3, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ];
    pacman = {
      xPos: 10,
      yPos: 9,
      direction: "",
      state: "",
    };

    enemies = [
      { xPos: 8, yPos: 5, direction: "", state: 0 },
      { xPos: 9, yPos: 5, direction: "", state: 0 },
      { xPos: 10, yPos: 5, direction: "", state: 0 },
      { xPos: 11, yPos: 5, direction: "", state: 0 },
    ];
  } else if (randomStage === 3) {
    stageItems = [
      [5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5],
      [5, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 5],
      [5, 2, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [5, 1, 5, 1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 0, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 0, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 0, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 0, 1, 5, 0, 0, 0, 5, 1, 0, 1, 5, 1, 5, 1, 5],
      [5, 3, 5, 1, 5, 5, 5, 1, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 5, 3, 5],
      [5, 1, 5, 1, 5, 1, 0, 1, 5, 0, 0, 0, 5, 1, 0, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 5, 1, 5, 5, 1, 5, 5, 1, 5, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 5, 1, 5],
      [5, 1, 5, 1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 1, 5, 1, 5],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5],
      [5, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 2, 0, 5],
      [5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5],
    ];
    pacman = {
      xPos: 10,
      yPos: 10,
      direction: "",
      state: "",
    };

    enemies = [
      { xPos: 1, yPos: 1, direction: "" },
      { xPos: 19, yPos: 1, direction: "" },
      { xPos: 1, yPos: 19, direction: "" },
      { xPos: 19, yPos: 19, direction: "" },
    ];
  } else if (randomStage === 4) {
    stageItems = [
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 1, 1, 1, 1, 1, 1, 1, 2, 5, 2, 1, 1, 1, 1, 1, 1, 1, 5],
      [5, 3, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 3, 5],
      [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
      [5, 1, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 1, 5],
      [5, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 5],
      [5, 5, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 5, 5],
      [0, 0, 0, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 0, 0, 0],
      [5, 5, 5, 5, 1, 5, 1, 5, 0, 0, 0, 5, 1, 5, 1, 5, 5, 5, 5],
      [0, 0, 0, 0, 1, 5, 1, 5, 0, 0, 0, 5, 1, 5, 1, 0, 0, 0, 0],
      [5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 5, 5],
      [0, 0, 0, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 0, 0, 0],
      [5, 5, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 5, 5],
      [5, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 5],
      [5, 1, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 1, 5],
      [5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5],
      [5, 3, 5, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 3, 5],
      [5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ];
    pacman = {
      xPos: 9,
      yPos: 15,
      // xPos: 1,
      // yPos: 7,
      direction: "",
      state: "",
    };

    enemies = [
      { xPos: 8, yPos: 8, direction: "", state: 0 },
      { xPos: 8, yPos: 9, direction: "", state: 0 },
      { xPos: 10, yPos: 8, direction: "", state: 0 },
      { xPos: 10, yPos: 9, direction: "", state: 0 },
    ];
  }

  OUT_OF_BOUNDS_X = stageItems[0].length - 1;
  OUT_OF_BOUNDS_Y = stageItems.length - 1;
  changeWallColor();
};

// UI
const initializeStage = () => {
  document.getElementById("stage").innerHTML = "";
};

const displayWorld = () => {
  const stage = document.getElementById("stage");
  stage.innerHTML = "";
  for (let x = 0; x < stageItems.length; x++) {
    let row = document.createElement("div");
    row.id = `row-${x}`;
    row.classList.add("row");
    for (let y = 0; y < stageItems[x].length; y++) {
      let div = document.createElement("div");
      const currentItem = stageItems[x][y];
      let className = "item";
      if (currentItem == 1) {
        className = "coin";
      } else if (currentItem == 2) {
        className = "cherry";
      } else if (currentItem == 3) {
        className = "big-coin";
      } else if (currentItem === 5) {
        className = "wall";
      }
      div.id = `item-${x}-${y}`;
      div.classList.add(className);
      row.appendChild(div);
    }

    stage.appendChild(row);
  }
};

const changeWallColor = (color) => {
  const colors = [
    "darkcyan",
    "cadetblue",
    "blueviolet",
    "brown",
    "forestgreen",
    "indianred",
  ];

  document
    .querySelector(":root")
    .style.setProperty(
      "--wall_color",
      colors[Math.floor(Math.random() * (colors.length - 1))]
    );
};
const setScore = () => {
  document.getElementById("score").innerHTML = `SCORE: ${SCORE}`;
};

const drawPacman = () => {
  const element = document.getElementById(`item-${pacman.yPos}-${pacman.xPos}`);
  element.setAttribute("class", "");
  element.classList.add("pacman");
  if (pacman.direction === "right") {
    element.style.transform = "rotate(0)";
  } else if (pacman.direction === "down") {
    element.style.transform = "rotate(90deg)";
  } else if (pacman.direction === "left") {
    element.style.transform = "rotate(180deg)";
  } else if (pacman.direction === "up") {
    element.style.transform = "rotate(270deg)";
  }
};

const drawEnemies = () => {
  for (let enemyType = 0; enemyType < enemies.length; enemyType++) {
    const element = document.getElementById(
      `item-${enemies[enemyType].yPos}-${enemies[enemyType].xPos}`
    );
    element.setAttribute("class", "");
    element.classList.add(`enemy${enemyType}`);
    if (pacman.state > 8) {
      element.style.backgroundImage = "url('img/enemy-scared0.gif')";
    } else if (pacman.state > 0) {
      element.style.backgroundImage = "url('img/enemy-scared1.gif')";
    } else {
      element.style.backgroundImage = `url('img/enemy${enemyType}.gif')`;
    }
    if (enemies[enemyType].direction === "right") {
      element.style.transform = "rotate(0)";
    } else if (enemies[enemyType].directionn === "left") {
      element.style.transform = "rotate(180deg)";
    }
  }
};

const drawGameOver = () => {
  document.getElementById("stage").style.opacity = 0;
  document.getElementById("container").style.background =
    "url('img/gameover.jpg')";
  document.getElementById("container").style.backgroundRepeat = "no-repeat";
  document.getElementById("container").style.backgroundPositionY = "center";
  document.getElementById("container").style.backgroundPositionX = "120px";
};

const drawUi = () => {
  displayWorld();
  drawPacman();
  drawEnemies();
  setScore();
};

// pacman
const initializePacman = () => {
  const direction = "default";
  pacmanSetPos(pacman.xPos, pacman.yPos);
  pacmanSetDirection(direction);
};

const pacmanSetPos = (x, y) => {
  pacman.xPos = x;
  pacman.yPos = y;
};

const pacmanSetDirection = (direction) => {
  pacman.direction = direction;
};

const movePacman = () => {
  const [x, y] = getNextPos(pacman.xPos, pacman.yPos, pacman.direction);
  if (!checkCollision(x, y)) {
    pacmanSetPos(x, y);
    calculateScore();
    pacmanPowerUp(x, y);
    removeStageItem(x, y);
  }
};

const pacmanPowerUp = (x, y) => {
  if (stageItems[y][x] === 3) {
    pacman.state = POWERUP_DURATION;
    changeEnemiesDirection();
  }
};

const powerUpCountdown = () => {
  if (pacman.state > 0) {
    pacman.state -= 1;
  }
};

const changeDirection = ({ key }) => {
  let direction = "";
  if (key === "ArrowLeft") {
    direction = "left";
  } else if (key === "ArrowRight") {
    direction = "right";
  } else if (key === "ArrowDown") {
    direction = "down";
  } else if (key === "ArrowUp") {
    direction = "up";
  } else if (key === "1") {
    pacman.state = POWERUP_DURATION;
  } else if (key === "2") {
    pacman.state = 0;
  } else if (key === "3") {
    MAIN_THEME_SOUND.play();
  }

  const [x, y] = getNextPos(pacman.xPos, pacman.yPos, direction);
  if (!checkCollision(x, y) && direction != "") {
    if (pacman.direction === "default") {
      playSound(MAIN_THEME_SOUND);
      main();
    }
    pacmanSetDirection(direction);
  }
};

//enemy
const initializeEnemies = () => {
  for (let enemyType = 0; enemyType < enemies.length; enemyType++) {
    const direction = "default";
    const { xPos: x, yPos: y } = enemies[enemyType];
    enemySetPos(x, y, enemyType);
    enemySetDirection(direction, enemyType);
  }
};

const enemySetDirection = (direction, enemyType) => {
  enemies[enemyType].direction = direction;
};

const enemySetPos = (x, y, enemyType) => {
  enemies[enemyType].xPos = x;
  enemies[enemyType].yPos = y;
};

const getOppositeDirection = (direction) => {
  let opositeDirection;
  switch (direction) {
    case "up":
      opositeDirection = "down";
      break;
    case "down":
      opositeDirection = "up";
      break;
    case "left":
      opositeDirection = "right";
      break;
    case "right":
      opositeDirection = "left";
      break;
  }

  return opositeDirection;
};

const randomDirection = (xPos, yPos, opositeDirection) => {
  let direction = "";
  let collision = true;
  let counter = 0;
  do {
    counter++;
    if (counter > 100) {
      break;
    }
    const rand = Math.floor(Math.random() * 4) + 1;
    if (rand === 1) {
      direction = "left";
    } else if (rand === 2) {
      direction = "right";
    } else if (rand === 3) {
      direction = "up";
    } else if (rand === 4) {
      direction = "down";
    }
    const [x, y] = getNextPos(xPos, yPos, direction);
    collision = checkCollision(x, y);
  } while (direction === opositeDirection || collision);
  return direction;
};

const nearestPacmanDirection = (xPos, yPos, opositeDirection) => {
  let direction = "";
  const { xPos: pacmanX, yPos: pacmanY } = pacman;
  if (pacmanY < yPos) {
    direction = "up";
  } else if (pacmanY > yPos) {
    direction = "down";
  } else if (pacmanX > xPos) {
    direction = "right";
  } else if (pacmanX < xPos) {
    direction = "left";
  }
  const [x, y] = getNextPos(xPos, yPos, direction);
  const collision = checkCollision(x, y);
  if (direction === opositeDirection || collision) {
    direction = randomDirection(xPos, yPos, opositeDirection);
  }
  return direction;
};

const farthestPacmanDirection = (xPos, yPos, opositeDirection) => {
  let direction = "";
  const { xPos: pacmanX, yPos: pacmanY } = pacman;

  if (pacmanY <= yPos && !checkCollision(...getNextPos(xPos, yPos, "down"))) {
    direction = "down";
  } else if (
    pacmanY > yPos &&
    !checkCollision(...getNextPos(xPos, yPos, "up"))
  ) {
    direction = "up";
  } else if (
    pacmanX < xPos &&
    !checkCollision(...getNextPos(xPos, yPos, "right"))
  ) {
    direction = "right";
  } else if (
    pacmanX > xPos &&
    !checkCollision(...getNextPos(xPos, yPos, "left"))
  ) {
    direction = "left";
  }

  if (opositeDirection === direction || direction === "") {
    direction = randomDirection(xPos, yPos, opositeDirection);
  }

  return direction;
};

const changeEnemiesDirection = () => {
  for (let index = 0; index < enemies.length; index++) {
    enemySetDirection(getOppositeDirection(enemies[index].direction), index);
  }
};

const moveEnemies = () => {
  if (pacman.direction === "default") return;
  for (let index = 0; index < enemies.length; index++) {
    const xPos = enemies[index].xPos;
    const yPos = enemies[index].yPos;
    const opositeDirection = getOppositeDirection(enemies[index].direction);
    let direction = "";
    //pacman is powered up
    if (pacman.state > 0) {
      direction = farthestPacmanDirection(xPos, yPos, opositeDirection);
    }
    //pacman is far
    else if (Math.abs(pacman.xPos - xPos) + Math.abs(pacman.yPos - yPos) >= 6) {
      direction = randomDirection(xPos, yPos, opositeDirection);
    }
    //pacman is near
    else {
      direction = nearestPacmanDirection(xPos, yPos, opositeDirection);
    }

    let [x, y] = getNextPos(xPos, yPos, direction);
    if (checkEnemyCollision(x, y)) {
      enemySetDirection(opositeDirection, index);
    } else if (!checkCollision(x, y)) {
      enemySetPos(x, y, index);
      enemySetDirection(direction, index);
    }
  }
};

const removeStageItem = (x, y) => {
  stageItems[y][x] = 0;
};

const getNextPos = (x, y, direction) => {
  if (direction === "left") {
    x -= 1;
    y = y;
  } else if (direction === "right") {
    x += 1;
    y = y;
  } else if (direction === "down") {
    x = x;
    y += 1;
  } else if (direction === "up") {
    x = x;
    y -= 1;
  }

  if (x > OUT_OF_BOUNDS_X) x = 0;
  else if (x < 0) x = OUT_OF_BOUNDS_X;
  else if (y > OUT_OF_BOUNDS_Y) y = 0;
  else if (y < 0) y = OUT_OF_BOUNDS_Y;

  return [x, y];
};

const checkCollision = (x, y) => {
  if (stageItems[y][x] === 5) {
    return true;
  }
  return false;
};

const checkEnemyCollision = (x, y) => {
  for (let enemyType = 0; enemyType < enemies.length; enemyType++) {
    if (x === enemies[enemyType].xPos && y === enemies[enemyType].yPos) {
      return true;
    }
  }
  return false;
};

//sounds
const stopSound = (sound) => {
  sound.pause();
};
const playSound = (sound) => {
  sound.play();
};

//main
const calculateScore = () => {
  const { xPos: x, yPos: y } = pacman;
  const item = stageItems[y][x];
  if (item === 5) return;
  //sounds
  if (item === 1) {
    playSound(EAT_SOUND);
  } else if (item > 1) {
    playSound(EAT_FRUIT_SOUND);
  }
  SCORE += item * 10;
};

const isGaveOver = () => {
  for (let x = 0; x < enemies.length; x++) {
    if (pacman.xPos === enemies[x].xPos && pacman.yPos === enemies[x].yPos) {
      return true;
    }
  }
  return false;
};

const setGameOver = () => {
  playSound(DYING_SOUND);
  stopSound(MAIN_THEME_SOUND);
  drawGameOver();
};

const main = () => {
  if (!isGaveOver()) {
    setTimeout(function onTick() {
      movePacman();
      moveEnemies();
      powerUpCountdown();
      drawUi();
      main();
    }, REFRESH_RATE);
  } else {
    setGameOver();
  }
};

const start = () => {
  SCORE = 0;
  initializeStage();
  initializePacman();
  initializeEnemies();
  drawUi();
};

document.addEventListener("keydown", changeDirection);
selectRandomStage();
start();
