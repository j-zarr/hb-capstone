'use strict';

// function definitions called by activateBtnClick from art-canvas.js
// functions for selecting, adding color-fill, deleting objects

// Make all canvas object selectable (single object or groups)
function select(canvas) {
    canvas.getObjects().map(obj => {
        obj.selectable = true;
        obj.hasControls = true;
        obj.hasBorders = true;
        obj.lockMovementX = false;
        obj.lockMovementY = false;
        obj.hoverCursor = 'move';
    });
}

function deselect(canvas) {
    canvas.getObjects().map(obj => {
        obj.hasControls = false;
        obj.hasBorders = false;
        obj.selectable = false;
        obj.lockMovementX = true;
        obj.lockMovementY = true;
        obj.hoverCursor = 'crosshair';
        canvas.requestRenderAll();
    });
}

// Apply color-fill to selected object/s
function fillColor(canvas, cloned) {
    // Use getActiveObjects to include single or multiple selected objects
    const selectedObjects = canvas.getActiveObjects();
    selectedObjects.forEach((obj) => { 
        obj.set('fill', selectedColor);
    });
    canvas.requestRenderAll();
}

// Delete selected object
function deleteObj(canvas, removed) {

    // Use getActiveObjects to include single or multiple selected objects
    const selectedObjects = canvas.getActiveObjects()
    selectedObjects.forEach((obj) => {

        // Push to removed array so can undo the delete
        removed.push(obj)
        canvas.remove(obj);
    });
    canvas.requestRenderAll();
}