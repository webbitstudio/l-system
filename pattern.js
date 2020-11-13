export const fractalPlant = {
    xPos: 1 / 2,
    yPos: 1, 
    axiom: 'X',
    length: -10,
    step: 7,
    angle: 90,
    rotate: 21,
    reduceRatio: 0.8,
    speed: 50,
    rules: [
        {val: 'X', result: 'F+[[X]-X]-F[-FX]+X'},
        {val: 'F', result: 'FF'}
    ]
};

export const fractalPlant2 = {
    xPos: 1 / 2,
    yPos: 1, 
    axiom: 'F',
    length: -7,
    step: 5,
    angle: 90,
    rotate: 22.5,
    reduceRatio: 0.8,
    speed: 50,
    rules: [
        {val: 'F', result: 'FF+[+F-F-F]-[-F+F+F]F'}
    ]
};


export const sierpinskiTriangle = {
    xPos: 1 / 10,
    yPos: 2.3 / 2.75,   
    axiom: 'F-G-G',  
    length: -(320 / Math.pow(2, 5)), // puissance = step - 1
    step: 6,
    angle: 180,
    rotate: 120,
    reduceRatio: 1,
    speed: 1,
    rules: [
        {val: 'G', result: 'GG'},
        {val: 'F', result: 'F-G+F+G-F'}
    ]
};

export const dragonCurve = {
    xPos: 1 / 3,
    yPos: 2 / 3,   
    axiom: 'FX',  
    length: -15,
    step: 10,
    angle: 90,
    rotate: 90,
    reduceRatio: 1,
    speed: 1,
    rules: [
        {val: 'X', result: 'X+YF+'},
        {val: 'Y', result: '-FX-Y'}
    ]
}

export const octo = {
    xPos: 2 / 5,
    yPos: 2 / 5,   
    axiom: 'F-F-F-F-F-F-F-F',  
    length: -50,
    step: 2,
    angle: 90,
    rotate: 45,
    reduceRatio: 1,
    speed: 1,
    rules: [
        {val: 'F', result: 'F-–-F+F+F+F+F+F+F-–-F'},
    ]
}