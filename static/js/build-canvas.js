'use strict';

//html elements to dynamically add to main page body when "create" clicked in main user menu
// **** accessed by art-canvas.js *****

const setCanvas = {
    canvasHTML: `
    <div id="art-canvas">
        <div class="coloring-options">
            <div style="border: 1px solid black; display: flex; justify-content: center; align-items: center;"> 
                <label for="color-hex"><i class="bi bi-palette2"></i></label>
                <input type="color" id="selected-color" value="#00FF00" oninput="this.nextElementSibling.value = this.value">
                <output>#00FF00<output> 
            </div>
            
            <div style="border: 1px solid black; display: flex; justify-content: center; align-items: center;"> 
                <label for="selected-opacity">Opacity</label>
                <input type="range" id="selected-opacity" min="0" max="1" value="1" step="0.1" oninput="this.nextElementSibling.value = this.value">
                <output>1</output>
            </div>

            <div style="border: 1px solid black; display: flex; justify-content: center; align-items: center;"> 
                <label for="selected-width">Stroke Width</label>
                <input type="range" id="selected-width" min="1" max="200" value="10" step="1" oninput="this.nextElementSibling.value = this.value">
                <output>10</output>
            </div>
        </div>

         
        <div class="canvas-buttons">
            <span><button id="delete-obj" title="delete-obj"><i class="bi bi-trash"></i></button></span>
            <span><button class="redo-and-undo" id="redo" title="redo"><i class="bi bi-arrow-clockwise"></i></button></span>
            <span><button class="redo-and-undo" id="undo" title="undo"><i class="bi bi-arrow-counterclockwise"></i></button></span>
            <span><button id="color-fill" title="color-fill"><i class="bi bi-paint-bucket"></i></button></span>
            <span><button id="select-object" title="select-object"><i class="bi bi-arrows-move"></i></button></span>
            <span><button class="drawing-mode" id="water-color" title="water-color"><i class="bi bi-water"></i></button></span>
            <span><button class="drawing-mode" id="paint" title="paint"><i class="bi bi-brush"></i></button></span>
            <span><button class="drawing-mode" id="draw" title="draw"><i class="bi bi-pencil"></i></button></span>
            <span><button id="square" title="square"><i class="bi bi-square"></i></i></button></span>
            <span><button id="circle" title="circle"><i class="bi bi-circle"></i></i></button></span>
            <span><button id="triangle" title="triangle"><i class="bi bi-triangle"></i></button></span>
            <span><button id="line" title="line"><i class="bi bi-dash-lg"></i></button></span>   
        </div>
                
        <canvas id="c" style="border:1px solid black; border-radius: 5px;" ></canvas>
            
    </div>`

}