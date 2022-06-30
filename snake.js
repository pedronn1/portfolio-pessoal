//tela
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//cabeca da cobra começa na coordenada (5,5)
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Velocidade
var velocityX = 0;
var velocityY = 0;

//Corpo da cobra
var snakeBody = [];

//Comida
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board"); // acessa a tela 
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //desenha na tela

    placeFood();
    document.addEventListener("keyup", changeDirection);// Quando vc aperta uma seta ele chama esta funcao para mudar a direcao
    
    /* chama a funcao a cada 100 milisegundos*/
    setInterval(update, 1000/10); //100 milisegundos
}

function update() {
    if (gameOver) {
        return;
    }

    /* Desenha o quadro todo em preto */
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height); 

    /* Desenha a comida em vermelho */
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);// Se comer aumenta o tamanho da cobra
        placeFood();
    }

    /* Pega o corpo para acompanhar a cobra */
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    /* Pega o corpo e coloca no lugar da cabeca */ 
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    /* Desenha a cobra em verde */
    context.fillStyle="lime";

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;


    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Condicoes de game over

    //Se bater nas extremidades da tela game over
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over, a cobra bateu na extremidade da tela, Pressione F5 para recomeçar");
    }

    
    for (let i = 0; i < snakeBody.length; i++) {

        /* Se a cobra se comer, no caso virar para o mesmo lado q o corpo dela esta game over */
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over, a cobra comeu seu próprio, Pressione F5 para recomeçar");
        }
    }
}

function changeDirection(e) {

    /* funcao para mudar a direcao e garantindo q ela n coma ela mesma*/
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

/* Funcao para colocar a comida aleatoriamente na tela */
function placeFood() {
    //Pega um numero de linha e coluna entre 0 e 19.999 como eh inteiro pega 19
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
