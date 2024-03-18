const board= document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// game variables
let snake = [{x:10, y:10}];
// all positions of snake ?
const gridSize = 20;
// generate random food pos
generateFood=()=>{
    const x= Math.floor(Math.random()*gridSize)+1;    //0-1 math.random
    const y= Math.floor(Math.random()*gridSize)+1;
    return {x,y};
}
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// create a snake or food cube/div
createGameElement= (tag,className) => {
    const element= document.createElement(tag);
    element.className = className;
    return element;
}

// set the position of snake or food  // mapping
SetPosition=(element, position)=>{
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

drawSnake =()=>{
    snake.forEach((segment)=>{
        const SnakeElement = createGameElement('div', 'snake');
        SetPosition(SnakeElement, segment);
        board.appendChild(SnakeElement);
    })   
}

// draw food function
drawFood =()=>{
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        SetPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
  }

// increase speed of snake
increaseSpeed =()=>{
    if(gameSpeedDelay>150){
        gameSpeedDelay-= 5;
    }
    else if(gameSpeedDelay>100){
        gameSpeedDelay-= 3;
    }
    else if(gameSpeedDelay>50){
        gameSpeedDelay-= 2;
    }
    else{
        gameSpeedDelay--;
    }
}  
updateScore=()=>{
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

updateHighScore=()=>{
    highScore = Math.max(highScore, snake.length-1);
    highScoreText.textContent = highScore.toString().padStart(3,'0');
    highScoreText.style.display = 'block'
}

stopGame=()=>{
    clearInterval(gameInterval);
    gameStarted =false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

// reset game ftn
resetGame=()=>{
    updateHighScore();
    stopGame();
    snake = [{x:10 , y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}


// check collision with grid and itself
checkCollision=()=>{
    const head = snake[0];

    if(head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize){
        resetGame();
    }

    for(let i=1;i<snake.length;i++){
        // checking the head overlap with snake other body part

        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
    }
}


// Moving the snake
move=()=>{
    const head = {...snake[0]};
    switch(direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);
    // The unshift() method of Array instances adds the specified elements to the beginning 
    // of an array and returns the new length of the array.
    // snake.pop();

    if(head.x === food.x && head.y === food.y){
        food= generateFood();
        increaseSpeed();
        clearInterval(gameInterval); // clear past interval to avoid errors
        gameInterval = setInterval(()=>{
            move();
            checkCollision();
            draw();
        },gameSpeedDelay);
    }
    else{
        snake.pop();
    }
}

startGame=()=>{
    gameStarted = true; // keep track of running game
    instructionText.style.display= 'none';
    logo.style.display= 'none';
    gameInterval = setInterval(()=>{
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay)
}

// keypress event listener
handleKeyPress=(event)=>{
    if(
        (!gameStarted && event.code ==='Space') || 
        (!gameStarted && event.key ===' ')
    ){
        startGame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

// Testing Draw ftn
// draw();

// Testing move
// setInterval(()=>{
//     move();
//     draw();
// },200);

// Testing StartGame
// startGame();
