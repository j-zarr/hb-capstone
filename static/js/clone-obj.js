'use strict';

//*************<<  helper function for undo >>******************/

// helper function to create copy of a filled obj without the fill
// to handle undo of fill, since on fill entire obj overwritten

function cloneWithoutFill(obj, cloned, idx, canvas) {

    // Initialize var to hold cloned obj
    let clonedNoFill;

    if (obj.type == 'rect') {

        clonedNoFill = new fabric.Rect({
            width: obj.width,
            height: obj.height,
            fill: '',
            top: obj.top,
            left: obj.left,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            strokeUniform: obj.strokeUniform,
            hoverCursor: obj.hoverCursor,
            selectable: obj.selectable
        });
    }
    if (obj.type == 'circle') {
        clonedNoFill = new fabric.Circle({
            radius: obj.radius,
            fill: '',
            top: obj.top,
            left: obj.left,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            strokeUniform: obj.strokeUniform,
            hoverCursor: obj.hoverCursor,
            selectable: obj.selectable
        });
    }

    if (obj.type == 'triangle') {
        clonedNoFill = new fabric.Triangle({
            width: obj.width,
            height: obj.height,
            angle: obj.angle,
            strokeLineJoin: obj.strokeLineJoin,
            strokeMiterLimit: obj.strokeMiterLimit,
            fill: '',
            top: obj.top,
            left: obj.left,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            strokeUniform: obj.strokeUniform,
            hoverCursor: obj.hoverCursor,
            selectable: obj.selectable
        });
    }

    cloned.push(clonedNoFill)
    canvas._objects.splice(idx, 0, cloned.pop());
    canvas.requestRenderAll();
}

