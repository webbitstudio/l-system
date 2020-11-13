import {
    fractalPlant,
    fractalPlant2,
    sierpinskiTriangle,
    dragonCurve,
    octo
} from './pattern.js'

const canvas = document.getElementById('canvas1');
const btnInput = document.getElementById('apply');
const patternInput = document.getElementById('pattern');
const lineWidthInput = document.getElementById('lineWidth');
const speedInput = document.getElementById('speed');
const ctx = canvas.getContext('2d');

const models = {fractalPlant, fractalPlant2, sierpinskiTriangle, dragonCurve, octo};
let model, rules, rotate, step, next, cX, cY, angle, length, speed, str = null;
let stackPos = [];

function setup () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.centerX = canvas.width / 2
    canvas.centerY = canvas.height / 2;
    
    initDraw();
    buildString();
    loop();
}

function initDraw() {
    console.log(patternInput.value)
    model = models[patternInput.value]
    rules = model.rules;
    rotate = model.rotate * Math.PI / 180;
    step = model.step;
    angle = model.angle * Math.PI / 180;
    length = model.length;
    speed = model.speed * speedInput.value;

    cX = canvas.width * model.xPos;
    cY = canvas.height * model.yPos;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidthInput.value;

    next = 0;
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
    for (let i = next; i < next + speed; i++) {
         ctx.strokeStyle = `hsl(${i % 360}, 50%, 50%)`;
        dispatchChar(str.charAt(i))
    }
    if (next < str.length) {
        next += speed;
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

btnInput.addEventListener('click', () => setup());
window.addEventListener('resize', () => setup());

setup();