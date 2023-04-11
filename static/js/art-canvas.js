
//object to store all canvas elements
const artCanvas = {
      mainHTML: `
                <div id="art-canvas">
            
                <div class="draw-options">
                    <span><button id="draw">DRAW</button></span>
                    <span><button id="paint">PAINT</button></span>
                    <span><button id="eraser">ERASER</button></span>
                    <span><button id="square"><i class="bi bi-square"></i></i></button></span>
                    <span><button id="circle"><i class="bi bi-circle"></i></i></button></span>
                    <span><button id="triangle"><i class="bi bi-triangle"></i></button></span>
                    <span><button id="line"><i class="bi bi-dash-lg"></i></button></span>
                    
                    
                    
                </div>
                
                    <canvas id="c" width="600" height="600" style="border:1px solid black; border-radius: 5px;" ></canvas>
            
                </div>`, 

      rect: new fabric.Rect({
        left: 100,
        top: 100,
        fill: '',
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
        width: 20,
        height: 20
        }),

        myCanvas : new fabric.Canvas('c'),
}

   function activateBtnClick(){
        
            $('#square').click(function() {
                alert($(this).attr('id'));
            })
           
            $('#circle').click(function() {
                alert($(this).attr('id'));
            })

            $('#triangle').click(function() {
                alert($(this).attr('id'));
            })

            $('#line').click(function() {
                alert($(this).attr('id'));
            })

            $('#draw').click(function() {
                alert($(this).attr('id'));
                draw(artCanvas['myCanvas']);
            })
            
            $('#paint').click(function() {
                alert($(this).attr('id'));
            })

            $('#eraser').click(function() {
                alert($(this).attr('id'));
            })
   }


   function draw(canvas){
        canvas.isDrawingMode = true;
        console.log('drawing....')

        // myCanvas = new fabric.Canvas('c');
        // var rect = artCanvas.rect; // start test
        //   // "add" rectangle onto canvas
        //   myCanvas.add(rect); // end test

   }