const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUP = document.querySelector('#up')
const btnDOWN = document.querySelector('#down')
const btnLEFT = document.querySelector('#left')
const btnRIGHT = document.querySelector('#right')

const levelText = document.querySelector('#levelText')
const playerNameDisplay = document.querySelector('#playerName')
const vidas = document.querySelector('.vidas')

const bye = document.querySelector('#bye')
const login = document.querySelector('#login')
const usersList = document.querySelector('#usersList')
const newUser = document.querySelector('#newUser')
    newUser.addEventListener('click', createUser)
    function createUser() {
        playerName = prompt('Elige el nombre de usuario:')
        enterGame()
    }

const reload = document.querySelector('.reload')
const reloadTitle = document.querySelector('#reloadTitle')
const reloadYes = document.querySelector('#reloadYes')
const reloadNo = document.querySelector('#reloadNo')

let canvasSize;
let elementsSize;

let playerPos = {
    x:'',
    y:'',
    binaryX: '',
    binaryY: '',

    startLevelX:'',
    startLevelY:'',
    startLevelBinaryX:'',
    startLevelBinaryY:'',

    startFirstLevelX: '',
    startFirstLevelY: '',
    startFirstLevelBinaryX: '',
    startFirstLevelBinaryY: '',

    item:'',
    };

let playerName = ''
let level = 1
let lifes = 3

let gameTime = document.querySelector('#gameTime')
let gameHours = document.querySelector('#hours')
let gameMinutes = document.querySelector('#minutes')
let gameSeconds = document.querySelector('#seconds')

time = false
seconds = 0
minutes = 0
hours = 0




let items = []
for (item in localStorage) {
    items.push(item)
}

let excludes = ['loglevel', 'length', 'clear', 'getItem', 'key', 'removeItem', 'setItem']
let users = items.filter(function(exclude){
    return !excludes.includes(exclude)
})

for (user of users) {
    userSelector = document.createElement('button')
    userSelector.setAttribute('id', user)
    usersList.appendChild(userSelector)
    userSelector.innerText = user
    playerName = user
    userSelector.addEventListener('click', enterGame)
}


let resizing = false

function enterGame() {
    login.style.display = 'none'
    initialWidth = canvasSize
    initialHeight = canvasSize
    window.addEventListener('load', setCanvasSize);
    //window.addEventListener('resize', setCanvasSize);
    window.addEventListener('resize', resizeCheck);

    setCanvasSize()

function resizeCheck () {
    resizing = true
    }

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7
    } else {
        canvasSize = window.innerHeight * 0.7
        }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10
    playerPos.x = ''
    playerPos.y = ''

    if (login.style.display == 'none'){
            console.log ('inicia')
            time = true
            startGame()
        }
    }}


function timing() {
    if (time) {
//SECONDS
    seconds ++
    if (seconds < 10) {
        gameSeconds.innerText = ':0' + seconds
    }else{
        gameSeconds.innerText = ':' + seconds
        }
//MINUTES
    if (seconds == 60) {
        gameSeconds.innerText = ':00'
        seconds = 0
        minutes ++
        if (minutes < 10) {
            gameMinutes.innerText = ':0' + minutes
        }else{
            gameMinutes.innerText = ':' + minutes
            }
        }

    if (minutes < 10) {
        gameMinutes.innerText = ':0' + minutes
    }else{
        gameMinutes.innerText = ':' + minutes
        }

//HOURS
    if (minutes == 60) {
        gameMinutes.innerText = ':00'
        minutes = 0
        hours ++
        if (hours < 10) {
            gameHours.innerText = '0' + hours
        }else{
            gameHours.innerText = hours
            }
        }

    if (hours <=60) {
        if (hours < 10) {
            gameHours.innerText = '0' + hours
        }else{
            gameHours.innerText = hours
            }
        }
    }}
  
let getTiming = setInterval(timing, 1000)

function startGame() {
    game.width = '100 px';
    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'end'

    let mapa = maps[level-1]
    levelText.innerText = 'Nivel ' + level

    let savedRecord = localStorage[playerName]
    let savedRecordMainDOM = document.querySelector('#savedRecordMain')
    let savedRecordReloadDOM = document.querySelector('#savedRecordMain')

    if(savedRecord) {
        savedRecordMainDOM.innerText = savedRecord
        console.log(savedRecord)
    }

    if (level > maps.length) {
        let newScore = gameHours.innerText + gameMinutes.innerText + gameSeconds.innerText
        newScoreDOM = document.querySelector('#bestRecord')
        levelText.innerText = 'Nivel ' + maps.length

        let newScoreSimplificado = newScore.replace(/\n  /g, "")
        let savedRecordSimplificado = function() {
            if(savedRecord) {
                savedRecordSimplificado = savedRecord.replace(/\n  /g, "");
                console.log(savedRecordSimplificado)
            }}
            savedRecordSimplificado()
        if(!savedRecord){ 
            savedRecordDOM.innerText = '-'
            localStorage.setItem(playerName, newScore)
            newScoreDOM.innerText = 'Has guardado un nuevo record: ' + newScore
            }
        else if (savedRecordSimplificado > newScoreSimplificado) {
            newScoreDOM.innerText = 'Has guardado un nuevo record: ' + newScore
            savedRecordReloadDOM.innerText = 'Tu record anterior fue: ' + savedRecord

            localStorage.setItem(playerName,newScore)
            }
        else if(savedRecordSimplificado <= newScoreSimplificado) {
            console.log('No has batido tu record de ' + localStorage[playerName] )
            newScoreDOM.innerText = 'No has guardado un nuevo record'
            savedRecordReloadDOM.innerText = 'Tu mejor record fue: ' + savedRecord
            }
        reload.style.display = 'flex'
        reloadTitle.innerText = 'Felicitaciones, completaste todos los niveles!'
        reloadTitle.style.fontSize = '24px'
        reloadYes.addEventListener('click', reloadGame)
        reloadNo.addEventListener('click', goodBye)
        setTimeout(function() {
            time = false
            console.log('tiempo frenado')
        },1)}
        

    const allLifes = document.querySelectorAll('.life')//Agrupa los corazones
    allLifes.forEach(result => {//Elimina cada corazon
        result.remove();        //Siempre y cuando se hayan creado (mas abajo)
        });
    for (life = 0; life < lifes; life ++) {
        const life = document.createElement('p')
        life.setAttribute('class','life')
        vidas.appendChild(life)
        life.innerText = '❤️'
       }

    mapaSimplificado = mapa.replace(/\n  /g, "");
    game.clearRect(0,0,canvasSize,canvasSize)

    for (let row = 1; row <= 10; row++) {
        for (let column = 1; column <= 10; column++) {
            if (row ==1) {
                item = mapaSimplificado[column-1]
            }else{
                count = row*10+column-11
                item = mapaSimplificado[count]
                }

            const posX = elementsSize * column + 10;
            const posY = elementsSize * row - 8;

            if (item == 'O' && playerPos.x == '')  {
                resizing = false
                playerPos.x = posX;
                playerPos.y = posY;

                playerPos.startLevelX = posX;
                playerPos.startLevelY = posY;

                let start = [mapaSimplificado.indexOf('O')]
                if (start == 0) {
                    start = ['00']
                    }
                playerPos.binaryX = start.toString()[1]
                playerPos.binaryY = start.toString()[0]
                playerPos.startLevelBinaryX = start.toString()[1]
                playerPos.startLevelBinaryY = start.toString()[0]

                if (level==1) {
                    playerPos.startFirstLevelX = posX;
                    playerPos.startFirstLevelY = posY;
                    playerPos.startFirstLevelBinaryX = start.toString()[1]
                    playerPos.startFirstLevelBinaryY = start.toString()[0]
                    }
                }

            playerPos.item = mapaSimplificado[[playerPos.binaryY] + playerPos.binaryX]
            if (playerPos.binaryY == 0) {
                playerPos.item = mapaSimplificado[playerPos.binaryX]
                }
            if(playerPos.item == 'I' && item == 'I') {
                item = '-'
                }
            game.fillText(emojis[item], posX, posY)
            //console.log(mapaSimplificado)

        }
        }   
        if (playerPos.item === 'X') {
            lifes --
            setTimeout(function() {
            playerPos.x = playerPos.startLevelX;
            playerPos.y = playerPos.startLevelY;

            playerPos.binaryX = playerPos.startLevelBinaryX
            playerPos.binaryY = playerPos.startLevelBinaryY
            playerPos.item = 'O'
            startGame()
            
            if (lifes == 0) {
                reloadTitle.innerText = 'PERDISTE TODAS TUS VIDAS'
                level = 1
                lifes = 3
                playerPos.item = 'O'
                playerPos.x = playerPos.startFirstLevelX
                playerPos.y = playerPos.startFirstLevelY
                playerPos.binaryX = playerPos.startFirstLevelBinaryX
                playerPos.binaryY = playerPos.startFirstLevelBinaryY
                reload.style.display = 'flex'
                reloadYes.addEventListener('click', reloadGame)
                reloadNo.addEventListener('click', goodBye)
                time = false
                }

            }, 1000);
            }
        if (playerPos.item === 'I') {
            var mapaSimplificado = mapaSimplificado.substring(0, [playerPos.binaryY] + playerPos.binaryX) + '-' + mapaSimplificado.substring([playerPos.binaryY] + playerPos.binaryX + 1);
            setTimeout(function() {
            playerPos.x = ''
            playerPos.y = ''
            if (level <= maps.length) {
                level += 1
                }
            startGame()
            }, 1000);
            }
    movePlayer()
    }

function movePlayer(){
    if (playerPos.item == 'X') {
        game.fillText(emojis['BOMB_COLLISION'], playerPos.x, playerPos.y)
    }
    else if (playerPos.item == 'I'){
        game.fillText(emojis['WIN'], playerPos.x, playerPos.y)
    }else{
        game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y)
    }
    }

btnUP.addEventListener('click', moveUP);
btnDOWN.addEventListener('click', moveDOWN);
btnLEFT.addEventListener('click', moveLEFT);
btnRIGHT.addEventListener('click', moveRIGHT);

window.addEventListener('keydown', moveByKeyboard);

function moveByKeyboard(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUP();
            break;
        case 'ArrowDown':
            moveDOWN();
            break;
        case 'ArrowLeft':
            moveLEFT();
            break;
        case 'ArrowRight':
            moveRIGHT();
            break;
    }}

function moveUP() {       
    if(playerPos.y >= elementsSize & playerPos.item != 'X' & playerPos.item != 'I'& reload.style.display != 'flex'){
        playerPos.y -= elementsSize
        playerPos.binaryY--
        movePlayer()
        startGame()
    }else{
        console.log('No se puede subir mas')
    }}
function moveDOWN() {
    if(playerPos.y < canvasSize-elementsSize & playerPos.item != 'X' & playerPos.item != 'I' & reload.style.display != 'flex') {
        playerPos.y += elementsSize
        playerPos.binaryY++
        movePlayer()
        startGame()
    }else{
        console.log('No se puede bajar mas')
    }}
function moveLEFT() {
    if(playerPos.x >= elementsSize*2 & playerPos.item != 'X' & playerPos.item != 'I' & reload.style.display != 'flex'){
        playerPos.x -= elementsSize
        playerPos.binaryX--
        movePlayer()
        startGame()
    }else {
        console.log('No se puede ir más a la izquierda')
    }}
function moveRIGHT() {
    if(playerPos.x < canvasSize & playerPos.item != 'X' & playerPos.item != 'I' & reload.style.display != 'flex') {
        playerPos.x += elementsSize
        playerPos.binaryX++
        movePlayer()
        startGame()
    }else {
        console.log('No se puede ir más a la derecha')
    }}

function reloadGame(event) {
    event.preventDefault();
    reload.style.display = 'none'
    level = 1
    lifes = 3
    seconds = 0
    minutes = 0
    hours = 0
    time = true
    startGame()
    }

function goodBye() {
    bye.style.display = 'flex'
}
//let string = 'qwerty'
//console.log(string)
//console.log(string[3])
//string = string.substring(0, 3) + 's' + string.substring(3+1)
//console.log(string)
