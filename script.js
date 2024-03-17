const board= document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

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
    // if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    // }
}

draw =()=>{
    board.innerHTML = '';
    drawSnake();
    drawFood();
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
        clearInterval(); // clear past interval to avoid errors
        gameInterval = setInterval(()=>{
            move();
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
        // checkCollision();
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
