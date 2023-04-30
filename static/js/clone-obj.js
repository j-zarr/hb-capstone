'use strict';

//*************<<  helper function for undo >>******************/

// helper function to create copy of a filled obj without the fill
// to handle undo of fill, since on fill entire obj overwritten

function cloneWithoutFill(obj, cloned) {

    // Initialize var to hold cloned obj
    let clonedNoFill;

    if (obj.type == 'rect') {
        
        clonedNoFill = new fabric.Rect({
            fill: '',
            width: obj.width,
            height: obj.height,
            top: obj.top,
            left: obj.left,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            hoverCursor: 'crosshair',
            selectable: false
        });
    }
    // if(obj.type == 'circle')

    // if(obj.type == 'triangle')

    // if(obj.type == 'path')


    cloned.push(clonedNoFill)
  //  console.log(cloned)
    

}