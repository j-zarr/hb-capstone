'use strict';

//html elements to dynamically add to main page body when "create" clicked in main user menu
// **** accessed by art-canvas.js *****


// Note: There is a div (id="c-bg") wrapped around the html canvas element, (placed under with -z index) 
// with bg-image to indicate to user that the default canvas background is transparent. 

const canvasHTML = 
   ` 
        <div class="coloring-options">

            <div class="coloring-field" style="margin-top: -10px; margin-right:100px;"> 
                <label for="color-hex"><i class="bi bi-palette2"></i></label>
                <input type="color" id="selected-color" value="#0091ff" oninput="this.nextElementSibling.value = this.value">
                <output>#0091ff<output> 
            </div>
            
            <div class="coloring-field" style="width: 15%; margin-right: 100px;"> 
                <label for="selected-opacity">Opacity</label>
                <input type="range" class="form-range" id="selected-opacity" min="0" max="1" value="1" step="0.1" 
                oninput="this.nextElementSibling.value = this.value">
                <output>1</output>
            </div>

            <div class="coloring-field" style="width: 30%;"> 
                <label for="selected-width">Stroke Width</label>
                <input type="range" class="form-range" id="selected-width" min="1" max="200" value="10" step="1" 
                oninput="this.nextElementSibling.value = this.value">
                <output>10</output>
            </div>

        </div>

         
        <div class="canvas-buttons">

            <span><button id="delete-obj" title="delete-obj"><i class="bi bi-trash"></i></button></span>
            <span><button class="redo-and-undo" id="redo" title="redo"><i class="bi bi-arrow-clockwise"></i></button></span>
            <span><button class="redo-and-undo" id="undo" title="undo"><i class="bi bi-arrow-counterclockwise"></i></button></span>
            <span><button id="select-object" title="select-object"><i class="bi bi-arrows-move"></i></button></span>
            <span><button class="drawing-mode" id="water-color" title="water-color"><i class="bi bi-water"></i></button></span>
            <span><button class="drawing-mode" id="paint" title="paint"><i class="bi bi-brush"></i></button></span>
            <span><button class="drawing-mode" id="draw" title="draw"><i class="bi bi-pencil"></i></button></span>
            <span><button id="square" title="square"><i class="bi bi-square"></i></i></button></span>
            <span><button id="circle" title="circle"><i class="bi bi-circle"></i></i></button></span>
            <span><button id="triangle" title="triangle"><i class="bi bi-triangle"></i></button></span>
            <span><button id="line" title="line"><i class="bi bi-dash-lg"></i></button></span>   

        </div>
         
        <div id="art-canvas">
        <div id="c-bg" style="z-index: -20; 
                            background-image:
                                linear-gradient(45deg, #E8E8E8 25%, transparent 25%),
                                linear-gradient(45deg, transparent 75%, #E8E8E8 75%),
                                linear-gradient(45deg, transparent 75%, #E8E8E8 75%),
                                linear-gradient(45deg, #E8E8E8 25%, #fff 25%);    
                            background-size:100px 100px;       
                            background-position:0 0, 0 0, -50px -50px, 50px 50px; 
                            width: 950px; height:850px">
        <canvas id="c" style="border:1px solid #6b696d;" ></canvas>
        </div>
            
    </div>`;

    

