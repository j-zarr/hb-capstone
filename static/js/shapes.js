'use strict';

// function definitions for adding shapes, called by activateBtnClick from art-canvas.js
// functions for creating shapes to add to the canvas

 
function createSquare(canvas, canvasCenter){
    const rect = new fabric.Rect({
        fill: '',
        stroke: selectedColor,
        strokeWidth: selectedWidth,
        strokeUniform: true,
        width: 75,
        height: 75,
        selectable: false,
        hoverCursor: 'crosshair'
    });
    canvasCenter(rect);
    canvas.add(rect);
}


function createCircle(canvas, canvasCenter){
    const circle = new fabric.Circle({
        fill: '',
        stroke: selectedColor,
        strokeWidth: selectedWidth,
        strokeUniform: true,
        radius: 50,
        selectable: false,
        hoverCursor: 'crosshair'
    });
    canvasCenter(circle);
    canvas.add(circle);
}


function createTriangle(canvas, canvasCenter){
    const triangle = new fabric.Triangle({
        fill: '',
        stroke: selectedColor,
        strokeWidth: selectedWidth,
        strokeUniform: true,
        width: 50,
        height: 50,
        angle: 45,
        selectable: false,
        hoverCursor: 'crosshair',
        strokeLineJoin: 'miter',
        strokeMiterLimit: 10

    });
    canvasCenter(triangle);
    canvas.add(triangle);
}


function createLine(canvas, canvasCenter){
    const line = new fabric.Line(
        [150, 50, 300, 50],
        {
            stroke: selectedColor,
            strokeWidth: selectedWidth,
            strokeUniform: true,
            selectable: false,
            hoverCursor: 'crosshair'
        });
        canvasCenter(line);
        canvas.add(line);
}