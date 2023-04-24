'use strict';


// function definition called by activateBtnClick from art-canvas.js
// function for setting canvas background to transparent/white on checkbox change

function setCanvasBackground(canvas){
    if ($('#set-canvas-bg').prop('checked')){
        console.log('checked')
        canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
    } else{
        canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
    }
}
