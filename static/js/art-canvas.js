
//object to store all canvas elements
const artCanvas = {
      mainHTML: `
         <div id="art-canvas">
            
                <div class="canvas-buttons">
                    <span><button id="color-palette" title="color-palette">color palette</button></span> 
                    <span><button id="brush-effect" title="brush-effect">brush effect</button></span> 
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


   function activateBtnClick(canvas){

    //($(this).attr('id')) works as expected, event.target.id sometimes works and mostly behaves unexpectedly

        $('button').click(function(){

            if($(this).attr('id') !=  'draw'){
                canvas.isDrawingMode = false; 
            }   
            if($(this).attr('id') !=  'select-object'){
            
                canvas.forEachObject(function(object){ //doesn't work how i want
                    object.selectable = false 
                });
             
               // canvas.selection = false; //doesn't work
            }     
        });

        // myCanvas.renderAll(); ///doesn't seem neccessary to add this
        //need to update after implement color palette
        let selected_color = 'blue';

            $('#square').click(function() {
                
                rect = new fabric.Rect({
                    // left: 100,
                    // top: 100,
                    fill: '',
                    stroke: `${selected_color}`,
                    strokeWidth: 1,
                    strokeUniform: true,
                    width: 50,
                    height: 50
                    });

                canvas.add(rect);
            });

           
            $('#circle').click(function() {
                
            });

            $('#triangle').click(function() {
                
            });

            $('#line').click(function() {
                
            });

            $('#draw').click(function() {
                canvas.isDrawingMode = true;
            });
            
            $('#paint').click(function() {
                
            });

            $('#eraser').click(function() {
                
            });

             
            $('#select').click(function() {
               // canvas.selection = true; //doesn't work
               canvas.forEachObject(function(object){  //doesn't work how i want
                  object.selectable = true 
                });
                //canvas.renderAll()
            });
   }


   