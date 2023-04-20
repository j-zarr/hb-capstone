'use strict';

// function definitions for adding shapes, called by activateBtnClick from art-canvas.js
// functions for creating shapes to add to the canvas


function createSquare(){
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
    return rect;
}


function createCircle(){
    const circle = new fabric.Circle({
        fill: '',
        stroke: selectedColor,
        strokeWidth: selectedWidth,
        strokeUniform: true,
        radius: 50,
        selectable: false,
        hoverCursor: 'crosshair'
    });
    return circle;
}


function createTriangle(){
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
        strokeMiterLimit: 20

    });
    return triangle;
}


function createLine(){
    const line = new fabric.Line(
        [150, 50, 300, 50],
        {
            stroke: selectedColor,
            strokeWidth: selectedWidth,
            strokeUniform: true,
            selectable: false,
            hoverCursor: 'crosshair'
        });
        return line;
}