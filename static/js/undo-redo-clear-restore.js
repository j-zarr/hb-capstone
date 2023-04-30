'use strict'

// function definitions called by activateBtnClick from art-canvas.js
// functions for undo, redo, clear, delete


// Initialize stack -  accessible to color-fill, undo, clear - to be emptied on clear canvas
// Note: color-fill will modify the obj, to be able to undo color-fill, need to store
// a new copied object without the color-fill
const cloned = []; // To store new non-fill obj to be able to undo


// Initialize variable to hold canvas state, to be accessible to clear and restore
let canvasState = '';


function undo(canvas, removed) {
    // Check if objetcs exist on canvas
    if (canvas.isEmpty()) {
        return;
    }
    // get last object added to canvas, add to removed stack and remove from canvas
    let last = canvas._objects[canvas._objects.length - 1];


    // add non-filled clone of the filled-obj (remove color-fill, keep obj)
    if (last.hasFill()) {
        cloneWithoutFill(last, cloned);
        // console.log(cloned);
        const popped = cloned.pop()
        canvas.add(popped);
        canvas.requestRenderAll();
    }


    removed.push(last);
    canvas.remove(last);
    canvas.requestRenderAll();
    
    console.log(`*** CLONED: ${cloned} `)
    console.log(`*** REMOVED: ${removed} `)

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


function clearCanvas(canvas, removed) {

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
