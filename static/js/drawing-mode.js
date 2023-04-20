'use strict';

// function definitions for adding shapes, called by activateBtnClick from art-canvas.js
// functions for drawing/painting on the canvas


// Create pencilBrush
function draw(canvas){
    const brush = new fabric.PencilBrush(canvas);
    brush.color = selectedColor;
    brush.width = selectedWidth;
    canvas.freeDrawingBrush = brush;
}

//Create freeDrawingBrush 
function paint(canvas){
    const brush = canvas.freeDrawingBrush;
    brush.color = selectedColor;
    brush.width = selectedWidth;
    brush.strokeLineCap = 'bevel';
}

// ******** TO DO: revisit if have time to change ************/
// **********sprayBrush to a custom brush ************/

//Create custom water-color brush 
function waterColor(canvas){
    const brush = new fabric.SprayBrush(canvas);
    brush.color = selectedColor;
    brush.width = selectedWidth;
    canvas.freeDrawingBrush = brush;
}