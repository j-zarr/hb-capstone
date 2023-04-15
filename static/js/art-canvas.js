
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
            <span><button id="color-fill" title="color-fill"><i class="bi bi-paint-bucket"></i></button></span>
            <span><button id="select-object" title="select-object"><i class="bi bi-arrows-move"></i></button></span>
            <span><button class="drawing-mode" id="spray-paint" title="spray-paint"><i class="bi bi-water"></i></button></span>
            <span><button class="drawing-mode" id="paint" title="paint"><i class="bi bi-brush"></i></button></span>
            <span><button class="drawing-mode" id="draw" title="draw"><i class="bi bi-pencil"></i></button></span>
            <span><button class="drawing-mode" id="eraser" title="eraser"><i class="bi bi-eraser"></i></button></span> 
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

    // Initialize selectedColor and selectedOPacity to default value 
    let selectedColor = "#00FF00";
    let selectedOPacity = 1;

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
        alpha = selectedOPacity;
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

        selectedOPacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add alpha value to selectedColor and set final colorSelected value
        setColorToRGBA(alpha = selectedOPacity, color = selectedColor)
    });


    // Get the selected-color value on input change
    $('#selected-color').change(function () {

        selectedOpacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add rgb color to the selectedOpacity and set final colorSelected value
        setColorToRGBA(alpha = selectedOpacity, rgb = selectedColor)
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
            selectable: false
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
            selectable: false
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
            selectable: false
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
                selectable: false
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


    // Create new SprayBrush to draw with on click event of sguiggles button
    $('#spray-paint').click(function () {

        const brush = new fabric.SprayBrush(canvas);
        brush.color = selectedColor;
        brush.width = selectedWidth;
        canvas.freeDrawingBrush = brush;
    });

    
    // Set fill to selected color on color-fill button click
   $('#color-fill').click(function(){
         
         // Use getActiveObjects to include single or multiple selected objects
         const selectedObjects = canvas.getActiveObjects();
         selectedObjects.forEach((obj)=>{
            obj.set('fill', selectedColor);
         });
        canvas.requestRenderAll();
   });

   
// Delete selected object on click of delete-obj button
$('#delete-obj').click(function(){

    // Use getActiveObjects to include single or multiple selected objects
    const selectedObjects = canvas.getActiveObjects()
    selectedObjects.forEach((obj)=>{
        canvas.remove(obj);
     });  
    canvas.requestRenderAll();
});

// saveState()
// restore what was cleared


//eraser -- need to custom build, use clipPath?



} //close for activateBtnClick




