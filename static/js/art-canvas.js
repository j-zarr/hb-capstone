
//object to store all canvas elements
const artCanvas = {
    mainHTML: `
         <div id="art-canvas">
            
                <div class="canvas-buttons">
                    
                <input type="color" id="input-color">
                <label for="color" id="color-label"></label>
                    <div id="color-picker" class="color-field"><input type="text" data-coloris></div> 
                    <span><button id="line-thickness" title="line-thickness">line thickness</button></span>
                    <span><button id="select-object" title="select-object"><i class="bi bi-arrows-move"></i></button></span>
                    <span><button id="paint" title="paint"><i class="bi bi-brush"></i></button></span>
                    <span><button id="draw" title="draw"><i class="bi bi-pencil"></i></button></span>
                    <span><button id="eraser" title="eraser"><i class="bi bi-eraser"></i></button></span>
                    <span><button id="color-fill" title="color-fill"><i class="bi bi-paint-bucket"></i></i></button></span> 
                    <span><button id="square" title="square"><i class="bi bi-square"></i></i></button></span>
                    <span><button id="circle" title="circle"><i class="bi bi-circle"></i></i></button></span>
                    <span><button id="triangle" title="triangle"><i class="bi bi-triangle"></i></button></span>
                    <span><button id="line" title="line"><i class="bi bi-dash-lg"></i></button></span>   
                 </div>
                
                <canvas id="c" style="border:1px solid black; border-radius: 5px;" ></canvas>
            
            </div>`,
}


function activateBtnClick(canvas) {

    //($(this).attr('id')) works as expected, event.target.id sometimes works and mostly behaves unexpectedly

    $('button').click(function () {

        $('button').css('color', 'white');
        $(this).css('color', '#55DD33');

        if ($(this).attr('id') != 'draw' || $(this).attr('id') != 'paint') {
            canvas.isDrawingMode = false;
        }
    //     // goes with function at end that does
    //     if ($(this).attr('id') != 'select-object') {
    //         canvas.forEachObject(obj => {
    //             obj.selectable = false;
    //             obj.evented = false; //object can not be a target of events
    //         });
    //     }
     });


    
    //need to update after implement color palette and wwidth options
    let selectedColor = 'blue'; 
    let selectedWidth = 5; 
    

    //slected color store in var
    // if press fill button (store in var), then next action selects obj, then set fill of selelcted object to 
    //event.deselected event.selected --> obj.on('selected', (cb))

    canvas.on('mouse:down', function(e) {
        position = [e.pageX, e.pageY];
        console.log(position)
       // console.log(position.get('left'), position.get('top'))
        return []
    })
    


    $('#square').click(function () {

        const rect = new fabric.Rect({
            // left: 100,
            // top: 100,
            fill: '',
            opacity: selectedOpacity,
            stroke: selectedColor,
            strokeWidth: selectedWidth,
            strokeUniform: true,
            width: 75,
            height: 75,
            objecctCaching: false //test if needed, can use obj.set('prop', 'val') instead 
        });
        canvas.add(rect);
    });


    $('#circle').click(function () {
        const circle = new fabric.Circle({
            // left: 100,
            // top: 100,
            fill: '',
            opacity: selectedOpacity,
            stroke: selectedColor,
            strokeWidth: selectedWidth,
            strokeUniform: true,
            radius: 50
        });
        canvas.add(circle);
    });

    $('#triangle').click(function () {
        const triangle = new fabric.Triangle({
            left: 100,
            top: 100,
            fill: '',
            opacity: selectedOpacity,
            stroke: selectedColor,
            strokeWidth: selectedWidth,
            strokeUniform: true,
            width: 50,
            height: 50,
            angle: 45
        });
        canvas.add(triangle);
    });

    $('#line').click(function () {
        const line = new fabric.Line(
            [150, 50, 300, 50],
            {
                stroke: selectedColor,
                strokeWidth: selectedWidth,
                opacity: selectedOpacity,
                strokeUniform: true,
            });
        canvas.add(line);
    });

    $('#draw').click(function () {
        canvas.isDrawingMode = true;

        const brush = new fabric.PencilBrush(canvas);
        brush.color = selectedColor;
        brush.width = selectedWidth;
        canvas.freeDrawingBrush = brush;
    });

    $('#paint').click(function () {  //try PatternBrush and using a water color img to make a better paint like brush
        canvas.isDrawingMode = true;

        const brush = canvas.freeDrawingBrush;
        brush.color = selectedColor;
        brush.width = 25;
        brush.strokeLineCap = 'bevel';
    });

    $('#eraser').click(function () {

    });


    //doesn't work but having the button makes appear to work to the user so this function not needed...
    //clicking any button after drawing/paingting will make the drawn object selectable
    $('#select').click(function () {
        canvas.isDrawingMode = false;
        canvas.forEachObject( obj => {
            obj.selectable = true;
            obj.evented = true;
        }); 
    });


} //close for activateBtnClick



