'use strict';

//store html elements to dynamically add when "create" clicked in menu
const artCanvas = {
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

// Set event handlers for interactivity with the dynamically added canvas and related buttons/inputs
function activateBtnClick(canvas, currCanvas) {

    // Deselect buttons if selected from coloring otions (color picker, opacity, width)
    $('.coloring-options').on('input', function () {
        $('button').css('color', 'white');

        // Set drawing mode and selectable to false after user selects color options
        // so new clicks will be updated with new color options 
        // and previous drawings will not become selectable objects unless click select
        canvas.isDrawingMode = false;
        canvas.getObjects().map(obj => {
            obj.selectable = false;
        });
    });


    $('button').click(function () {

        // Deselect previously selected button and select current cliked button 
        $('button').css('color', 'white');
        $(this).css('color', '#55DD33');

        // Set drawing mode to false on any non-drawing button click
        if ($(this).attr('id') != 'draw' || $(this).attr('id') != 'paint') {
            canvas.isDrawingMode = false;
        }
    });

    // Update selectedColor as rgba: selectedColor + selectedOpacity 
    // Don't know if user will select opacity before or after selects color so color needs to be updated separately in both
    // change on color and change on opacity 
    // (only the shape objects in fabric.js have opacity properties so need to set manually with color property)

    // Initialize selectedColor and selectedOpacity to default value 
    let selectedColor = "#00FF00";
    let selectedOpacity = 1;

    // Helper function to convert the hexidecimal value to rgb
    function convertHexToRGB(hex) { //01 23 45
        hex = selectedColor.slice(1); //remove '#' prefix
        const r = hex.slice(0, 2);
        const g = hex.slice(2, 4);
        const b = hex.slice(-2);

        return {
            R: r,
            G: g,
            B: b
        }
    }


    // Helper function to combine rgb and alpha values to set the final selectedColor
    function setColorToRGBA(alpha, color) {
        color = selectedColor;
        alpha = selectedOpacity;
        const rgb = convertHexToRGB(color)

        const rgba = [
            parseInt(rgb.R, 16),
            parseInt(rgb.G, 16),
            parseInt(rgb.B, 16),
            alpha
        ]

        selectedColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]} )`
        return selectedColor;
    }


    // Update the selected-opacity value on input change (as int)
    $('#selected-opacity').change(function () {

        selectedOpacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add alpha value to selectedColor and set final colorSelected value
        setColorToRGBA(selectedOpacity, selectedColor)
    });


    // Get the selected-color value on input change
    $('#selected-color').change(function () {

        selectedOpacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add rgb color to the selectedOpacity and set final colorSelected value
        setColorToRGBA(selectedOpacity, selectedColor)
    });


    // Initialize selectedWidth  default value (as int)
    let selectedWidth = document.getElementById('selected-width').valueAsNumber;


    // Update selected-width on input change (as int)
    $('#selected-width').change(function () {
        selectedWidth = document.getElementById('selected-width').valueAsNumber;
    });

    // Set all objects (shapes and drawings) already on canvas to be selectable on select-object button click
    $('#select-object').click(function () {
        canvas.getObjects().map(obj => {
            obj.selectable = true;
            obj.hoverCursor = 'move'
        });
    });

    // Helper function to set shape objects to be placed in center of canvas
    const canvasCenter = (obj) => {
        obj.top = canvas.getCenter().top;
        obj.left = canvas.getCenter().left
    }

    // Create new Square on click event of square button
    $('#square').click(function () {

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
    });

    // Create new circle on click event of circle button
    $('#circle').click(function () {
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
    });

    // Create new Triangle on click event of triangle button
    $('#triangle').click(function () {
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
        canvasCenter(triangle);
        canvas.add(triangle);
    });

    // Create new Line on click event of line button
    $('#line').click(function () {
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
    });


    // Set drawing mode to true on any drawing tool button click
    $('.drawing-mode').click(function () {
        // Set drawing mode to true
        canvas.isDrawingMode = true;
    });


    // Create new PencilBrush to draw with on click event of pencil button
    $('#draw').click(function () {

        const brush = new fabric.PencilBrush(canvas);
        brush.color = selectedColor;
        brush.width = selectedWidth;
        canvas.freeDrawingBrush = brush;
    });


    // Create new freeDrawingBrush to draw with on click event of paintbrush button
    $('#paint').click(function () {  //try PatternBrush and using a water color img to make a better paint like brush

        const brush = canvas.freeDrawingBrush;
        brush.color = selectedColor;
        brush.width = selectedWidth;
        brush.strokeLineCap = 'bevel';
    });


    // After MVP change from SprayBrush to custom patterBrush to mimmick watercolor strokes
    // Create new SprayBrush to draw with on click event of sguiggles button
    $('#water-color').click(function () {

        const brush = new fabric.SprayBrush(canvas);
        brush.color = selectedColor;
        brush.width = selectedWidth;
        canvas.freeDrawingBrush = brush;
    });


    // Set fill to selected color on color-fill button click
    $('#color-fill').click(function () {

        // Use getActiveObjects to include single or multiple selected objects
        const selectedObjects = canvas.getActiveObjects();
        selectedObjects.forEach((obj) => {
            obj.set('fill', selectedColor);
        });
        canvas.requestRenderAll();
    });


    // Initialize stack (as array) to be accessible to undo, redo, delete
    // Store stack of removed item to be able to restore
    let removed = []  //To be emptied on clear canvas

    // Delete selected object on click of delete-obj button
    $('#delete-obj').click(function () {

        // Use getActiveObjects to include single or multiple selected objects
        const selectedObjects = canvas.getActiveObjects()
        selectedObjects.forEach((obj) => {

            // Push to removed array so can undo the delete
            removed.push(obj)
            canvas.remove(obj);
        });
        canvas.requestRenderAll();
    });


    // Set undo click handler
    $('#undo').click(function() {

         // Check if objetcs exist on canvas
         if (canvas.isEmpty()) {
            return;
        }
        // get last object added to canvas, add to removed stack and remove from canvas
        let last = canvas._objects.pop()
        removed.push(last)
        canvas.remove(last);
        canvas.requestRenderAll();
    });

    
    // Set redo click handler 
    $('#redo').click(function() {

        // Check if anything in removed stack to be added
        if(removed.length < 1){
            return;
        }
        // pop object from removed stack and add to canvas
        canvas.add(removed.pop())
        canvas.requestRenderAll()
    });
    
    // Initialize variable to hold canvas state, to be accessible to clear and restore
    let canvasState = '';
        
    // set event handler for click on 'clear' to clear the canvas 
    $('#clear').click(function() {

        // Check if canvas empty - prevent saving a blank canvas to restore
        if (canvas.isEmpty()) {
        return;
        }

        //Empty removed array to prevent redo - clear resets the entire canvas
        removed.length = 0;
        console.log(removed)

         //Store canvas state before clearing to be able to restore
         canvasState = canvas.toJSON();  
    
        //Clear the canvas
        canvas.clear();
        });


    //restore cleared canvas
    $('#restore').click(function(){
        if (canvas.isEmpty()) return;
         canvas.loadFromJSON(canvasState).requestRenderAll(); 
         //reset canvasState 
         canvasState = '';
    });


    // Set event handler for submit button in dropdown form (save click)
    // Make Ajax request when submit from from save link
    $('#save-form').submit(function(evt){
    
        if (canvas.isEmpty()) {
          evt.preventDefault();
            // Create error message if tries to save an empty canvas and return
            alert('Unsuccessful - cannot save an empty canvas');
           return;
        }
        evt.preventDefault();

        // Only pass portfolio data for either selected portfolio or new portfolio
        // Create error message if both portfolio fields filled out and return
        // Create error message if neither portfolio fileds filled out and return
        // check which portfolio input has a value -ternary statement and use that 
        // 
        
        // $('#portfolio-title').children(':selected').attr('id')

   
        const formInputData = {"artwork-title": `${$('#artwork-title').val()}`,
                            //    "portfolio-id": `${$('#portfolio-title')
                            //                         .children(':selected')
                            //                         .attr('id')}`,
                                "portfolio_title": `${$('#portfolio-title').val()}`,
                                "new-portfolio-title":`${$('#new-portfolio-title').val()}`,
                              }

         fetch('/api/save-artwork', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInputData),
         })
           .then(response => response.json())
           .then( data => {
            document.getElementById('save-form').reset()
            $('#save-form').append(
                `<div id="message" class="alert alert-success" role="alert"> ${data.message} </div>`)
                setTimeout(()=>{
                    $('#message').remove();
                    setTimeout(()=>{
                        //reload create page 
                        $('#create-link').prop('disabled', false);
                        $('#create-link').click()
                    }, 1500);
                }, 2000);
           }); 
    });




} //close for activateBtnClick




