import {
    fractalPlant,
    fractalPlant2,
    sierpinskiTriangle,
    dragonCurve,
    octo
} from './pattern.js'

const model = fractalPlant;
//const model = fractalPlant2;
//const model = sierpinskiTriangle;
//const model = dragonCurve;
//const model = octo;

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const rules = model.rules;
let rotate = model.rotate * Math.PI / 180;
let step = model.step;


let cX = 0;
let cY = 0;
let stackPos = [];
let angle = null;
let length = null;

let next = 0;
let str = model.axiom;


function setup () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.centerX = canvas.width / 2
    canvas.centerY = canvas.height / 2;
    
    ctx.lineWidth = 2;
    initDraw();
    buildString();
}

function initDraw() {
    next = 0;
    angle = model.angle * Math.PI / 180;
    length = model.length;
    cX = canvas.width * model.xPos;
    cY = canvas.height * model.yPos;
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function buildString() {
    let tmp = '';
    str = model.axiom;
    for (let i = 1; i <= step; i++) {
        tmp = '';
        for (let j = 0; j < str.length; j++) {
            tmp += processRules(str.charAt(j))
        }
        str = tmp;
        length *= model.reduceRatio;
    }
}

function loop() {
    for (let i = next; i < next + model.speed; i++) {
        // console.log(str.charAt(i))
         ctx.strokeStyle = `hsl(${i % 360}, 50%, 50%)`;
        // ctx.strokeStyle = 'white'
        dispatchChar(str.charAt(i))
    }
    if (next < str.length) {
        next += model.speed;
        requestAnimationFrame(loop);
    }
}

function processRules(c) {
    for(let rule of rules) {
        if (c === rule.val)
            return rule.result;
    }
    return c;
}


function dispatchChar(c) {
    switch (c) {
        case 'F' : drawline(); break;
        case 'G' : drawline(); break;
        case '+' : rotation(rotate); break;
        case '-' : rotation(-rotate); break;
        case '[' : addPosition(); break;
        case ']' : setPosition(); break;
    }
}

function calcPosition() {
    cX = length * Math.cos(angle) + cX;
    cY = length * Math.sin(angle) + cY;
}

function drawline() {
    let x = cX;
    let y = cY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    calcPosition();
    ctx.lineTo(cX, cY);
    ctx.stroke();
}

function rotation(rotate) {
    angle += rotate;
}

function addPosition() {
    stackPos.push({ x : cX, y: cY, a: angle })
}

function setPosition() {
    let pos = stackPos.pop()
    cX = pos.x;
    cY = pos.y;
    angle = pos.a;
}

window.addEventListener('resize', () => {
    setup();
    loop();
});

setup();
loop();
