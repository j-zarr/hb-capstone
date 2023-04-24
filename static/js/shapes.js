'use strict';

// function definitions for adding shapes, called by activateBtnClick from art-canvas.js
// functions for creating shapes to add to the canvas

 
function createSquare(canvas, commonShapeSettings){
    const rect = new fabric.Rect({
        width: 75,
        height: 75,
    });
    commonShapeSettings(rect);
    canvas.add(rect);
}


function createCircle(canvas, commonShapeSettings){
    const circle = new fabric.Circle({
        radius: 50,
    });
    commonShapeSettings(circle);
    canvas.add(circle);
}


function createTriangle(canvas, commonShapeSettings){
    const triangle = new fabric.Triangle({
        width: 50,
        height: 50,
        angle: 45,    
        strokeLineJoin: 'miter',
        strokeMiterLimit: 10
    });
    commonShapeSettings(triangle);
    canvas.add(triangle);
}


function createLine(canvas, commonShapeSettings){
    const line = new fabric.Line(
        [150, 50, 300, 50],
        );
        commonShapeSettings(line);
        canvas.add(line);
}