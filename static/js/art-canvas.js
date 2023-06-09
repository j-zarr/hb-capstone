'use strict';

// Set event handlers for interactivity with the dynamically added canvas 
function activateCanvasBtns(canvas) {

    //**************<< Deactivate select, drawingMode for any user selection of color, opacity, line-width >>**************/


    // Deselect buttons if selected from coloring otions (color picker, opacity, width)
    $('.coloring-options').on('input', function () {
        $('button').css('color', 'white').prop('disabled', false)
                            .mouseover(function(){
                            $(this).css('color', 'rgb(37,37,37');
                            }).mouseout(function(){
                            $(this).css('color', 'white');});

        // Set drawing mode and selectable to false after user selects color options
        // so new clicks will be updated with new color options 
        // and previous drawings will not become selectable objects unless click select
        canvas.isDrawingMode = false;
        canvas.getObjects().map(obj => {
            obj.selectable = false;
        });
    });


    //***************<< For any button click related to the canvas >>***************/

    // Note: need to reset hover (once jquery changes a property the hover acted on, need to reset hover)

    let selectIsActive = false; // Initialize select button active as false

    $('button').click(function () {
        // Deselect previously selected button and select current cliked button 
        $('button').css('color', 'white')
                            .mouseover(function(){
                            $(this).css('backgroundColor', 'blanchedalmond')
                            $(this).css('color', 'rgb(37,37,37');
                            }).mouseout(function(){
                            $(this).css('backgroundColor', 'rgb(37,37,37')
                            $(this).css('color', 'white');});

       if ($(this).attr('id') != 'select-object') { //handle select click separately
            $(this).css('color', '#55DD33').css('backgroundColor','rgb(37,37,37')
                            .mouseover(function(){
                            $(this).css('color', '#55DD33');
                            $(this).css('backgroundColor', 'rgb(37,37,37');
                            }).mouseout(function(){
                            $(this).css('color', '#55DD33');});
                           
           deselect(canvas);
           selectIsActive = false; 
       }

        // Set drawing mode to false on any non-drawing button click
        if ($(this).attr('id') != 'draw' || $(this).attr('id') != 'paint') {
            canvas.isDrawingMode = false;
        }
    });

 


    // Set all objects (shapes and drawings) already on canvas to be selectable on select-object button click
    $('#select-object').click(function () {
       
        // if select button active and reclicked, deselect all objects
        if (selectIsActive) {
            selectIsActive = false;
            $(this).css('color', 'white')
            deselect(canvas);
        } else {
            selectIsActive = true;
            $(this).css('color', '#55DD33')
                        .mouseover(function(){
                        $(this).css('color', 'rgb(37,37,37');
                        }).mouseout(function(){
                        $(this).css('color', '#55DD33');});
            select(canvas);
        }
    });


    // ***************<< Setting opacity, color, line-width on click >>****************/
    //****************<< function definitions in coloring-options.js >>****************/



    // Update the selected-opacity value on input change (as int)
    $('#selected-opacity').change(setOpacity);

    // Get the selected-color value on input change
    $('#selected-color').change(setColor);

    // Update selected-width on input change (as int)
    $('#selected-width').change(setLineWidth)


    //****************<< Adding shapes to the canvas on shape button clicks >>*********************/
    //****************<< function definitions in shapes.js >>**************************************/


    // Helper function to set canvas location and commomn attributes for shapes
    const commonShapeSettings = (obj) => {
        obj.top = canvas.getCenter().top;
        obj.left = canvas.getCenter().left;
        obj.fill = '';
        obj.stroke = selectedColor;
        obj.strokeWidth = selectedWidth;
        obj.strokeUniform = true;
        obj.hoverCursor = 'crosshair';
        obj.selectable = false;
    }

    // Create and add new Square on click event of square button
    $('#square').click(() => {
        createSquare(canvas, commonShapeSettings);
    });


    // Create and add new circle on click event of circle button
    $('#circle').click(() => {
        createCircle(canvas, commonShapeSettings);
    });


    // Create and add new Triangle on click event of triangle button
    $('#triangle').click(() => {
        createTriangle(canvas, commonShapeSettings);
    });


    // Create and add new Line on click event of line button
    $('#line').click(() => {
        createLine(canvas, commonShapeSettings);
    });



    //************************<< Setting brush type for paint/draw button click >>************************/
    //***********************<< function definitions in drawing-mode.js >>*********************************/

    // Helper function to set drawing mode to true on any drawing tool button click
    $('.drawing-mode').click(function () {
        canvas.isDrawingMode = true;
    });


    // Create new PencilBrush to draw with on click event of pencil button
    $('#draw').click(() => {
        draw(canvas);
    });


    // Create new freeDrawingBrush to paint with on click event of paintbrush button
    $('#paint').click(() => {  //try PatternBrush and using a water color img to make a better paint like brush
        paint(canvas);
    });


    // After MVP change from SprayBrush to custom patterBrush to mimmick watercolor strokes
    // Create new SprayBrush to draw with on click event of sguiggles button
    $('#water-color').click(() => {
        waterColor(canvas);
    });


    //***************** Adding select option and buttons that can use with select: color-fill, delete ***************/
    //****************<< function definitions select-fill-delete.js >>***********************************************/

    // Initialize stack (as array) to be accessible to undo, redo, delete, clear
    // To be emptied on clear canvas
    const removed = [];   // To store removed item to be able to redo


    // Set fill to selected color on color-fill button click
    $('#color-fill').click(() => {
        fillColor(canvas);
    });


    // Delete selected object on click of delete-obj button
    $('#delete-obj').click(() => {
        deleteObj(canvas, removed);
    });


    //********************<< Handler for changing canvas background to white/transparent>> *********************************/ 
    //****************<< function definition in set-canvas-bg-color.js >>****************************/

    $('#set-canvas-bg').change(() => {
        setCanvasBackground(canvas);
    })

    //********************<< Handlers for undo + redo, clear + restore>> *********************************/ 
    //****************<< function definitions in undo-redo-clear-restore.js >>****************************/



    // Set undo click handler
    $('#undo').click(() => {
        undo(canvas, removed);
    });


    // Set redo click handler 
    $('#redo').click(() => {
        redo(canvas, removed);
    });


    // set event handler for click on 'clear' to clear the canvas 
    $('#clear').click(() => {
        clearCanvas(canvas, removed);
    });


    //restore cleared canvas
    $('#restore').click(() => {
        restoreCanvas(canvas);
    });


    //*****************<< Saving the completed canvas to the database>>*****************************/
    //****************<< function definition in save-artwork.js >>****************************************************/

    // Set event handler for submit button in dropdown form (save click)
    $('#save-form').submit((evt) => {

        // return if no artwork to save
        if (canvas.isEmpty()) {
            evt.preventDefault();
            // Create error message if tries to save an empty canvas and return
            displayErrorMessage('Cannot save an empty canvas!');
            return;
        }

        evt.preventDefault();

        submitSaveForm(canvas);
    });


} //close for activateCanvasBtns




