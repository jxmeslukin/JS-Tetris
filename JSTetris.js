document.addEventListener('DOMContentLoaded', () =>{
//all code in here

const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10 
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
let nextRandom = 0
let timerId
let score = 0

console.log(squares);

//Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0

let random = Math.floor(Math.random()*theTetrominoes.length);
console.log(random);
let current = theTetrominoes[0][0]

draw()
//draw tetromino 
function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  //undraws tetromino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino') 
    })
}

//tetromino move down every second
//timerId = setInterval(moveDown, 1000)

//assign functions to keystrokes
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  }
  else if(e.keyCode === 38) {
    rotate()
  }
  else if(e.keyCode === 39) {
    moveRight()
  }
  else if(e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

//move down function 
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}


function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start new tetromino
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
  }
}

//move tetromino left unless edge or blocked
function moveLeft() {
  undraw()
  const atLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  
  if(!atLeftEdge) currentPosition -=1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }

  draw()

  }

function moveRight() {
  undraw()
  const atRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    
  if(!atRightEdge) currentPosition +=1
  
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
    }
  
    draw()
  
  }  

//rotate tetromino 
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}

//show next tetromino in mini display
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0 


//tetromino without rotation
const nextTetromino = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
  [0, 1, displayWidth, displayWidth+1], //oTetromino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
]

//display shapes in mini display
function displayShape() {
  //remove any tetromino from grid
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  nextTetromino[nextRandom].forEach(index => {
    displaySquares[displayIndex +index].classList.add('tetromino')
  })
}

//add functionality to button
startBtn.addEventListener('click', () => {
  if(timerId){
    clearInterval(timerId)
    timerId = null
  }
  else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*theTetrominoes.length)
    displayShape()
  }
})

//add score 
function addScore() {
  for (let i = 0; i < 199; i +=width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index=> square[index.classList.contains('taken'))) {
      score += 10
      scoreDisplay.innerHTML = score 
      row.forEach(index => {
        squares[index].classList.remove('taken')
      })
      const squaresRemoved = squares.splice(i,width)
      console.log(squaresRemoved)
    }
  } 
}

})