'use strict'

// function definitions called by activateBtnClick from art-canvas.js
// functions for undo, redo, clear, delete


// Initialize variable to hold canvas state, to be accessible to clear and restore
let canvasState = '';


// Initialize stack to hold fill values for undo after fill
let fillInfo = []


function undo(canvas, removed) {
    // Check if objetcs exist on canvas
    if (canvas.isEmpty()) {
        return;
    }

    // get last object added to canvas, add to removed stack and remove from canvas
    const last = canvas.item(canvas.size() - 1);
   
    
   // Handle removing of filled obj
    if (last.fill != '') {
           
        fillInfo.push(last.fill);
       
        last.fill = ''; // this will also add the obj to the canvas
    }
        // remove non-filled obj
        removed.push(last);
        canvas.remove(last);
        canvas.requestRenderAll();
}


function redo(canvas, removed) {
    // Check if anything in removed
    if (removed.length < 1) {
        return;
    }

    const toRedo = removed.pop()
    
    if(fillInfo.length){ //redo color fill if fill was undone
        toRedo.fill = fillInfo.pop();  
    }
    canvas.add(toRedo);
    canvas.requestRenderAll();
}


function clearCanvas(canvas, removed) {

    // Check if canvas empty - prevent saving a blank canvas to restore 
    if (canvas.isEmpty()) {
        return;
    }

    //Empty removed array to prevent redo - clear resets the entire canvas
    removed.length = 0;

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

    // don't restore previously cleared canvas onto a new drawing
    if(!canvas.isEmpty()){
        return;
    }

    const objectsToRestore = canvas.loadFromJSON(canvasState)
    objectsToRestore.requestRenderAll();

    //reset canvasState 
    canvasState = '';
}
