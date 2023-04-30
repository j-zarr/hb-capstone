'use strict'

// function definitions called by activateBtnClick from art-canvas.js
// functions for undo, redo, clear, delete


// Initialize variable to hold canvas state, to be accessible to clear and restore
let canvasState = '';


function undo(canvas, removed) {
    // Check if objetcs exist on canvas
    if (canvas.isEmpty()) {
        return;
    }
    // get last object added to canvas, add to removed stack and remove from canvas
    let last = canvas._objects[canvas._objects.length - 1];

    removed.push(last);
    canvas.remove(last);
    canvas.requestRenderAll();  
}


function redo(canvas, removed) {
    // Check if anything in removed stack to be added
    if (removed.length < 1) {
        return;
    }
    // pop object from removed stack and add to canvas
    canvas.add(removed.pop())
    canvas.requestRenderAll()
}


function clearCanvas(canvas, removed, cloned) {

    // Check if canvas empty - prevent saving a blank canvas to restore 
    if (canvas.isEmpty()) {
        return;
    }

    //Empty removed array to prevent redo - clear resets the entire canvas
    removed.length = 0;
    cloned.length = 0;

    //Store canvas state before clearing to be able to restore
    canvasState = canvas.toJSON();

    //Clear the canvas
    canvas.clear();

    //Keep the white background on clear, if checkbox checked
    if ($('#set-canvas-bg').prop('checked')) {
        canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
    }
}


function restoreCanvas(canvas) {
    if (canvasState == '') {
        return;
    }

    const objectsToRestore = canvas.loadFromJSON(canvasState)
    objectsToRestore.requestRenderAll();
    //reset canvasState 
    canvasState = '';
}
