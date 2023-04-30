'use strict'

//function definitions (for color, opacity, line-width), called by activateBtnClick from art-canvas.js
// Note: script tag must be before shapes.js = shapes.js dependant on these functions
// functions for coloring options for the canvas


//****************** Function to set line width option *************************/


function setLineWidth(){
    selectedWidth = document.getElementById(
        'selected-width').valueAsNumber;
}


//*************** Functions to set selectedColor as rgba: selectedColor + selectedOpacity  *** ********************/

//Note: Don't know if user will select opacity before or after selects color,
// so color needs to be updated separately in both a change on color and change on opacity 
//(only the shape objects in fabric.js have opacity properties so need to set manually with color property)
 

// Initialize selectedColor, selectedOpacity, selectedWidthto default value 
let selectedColor =  "#0091ff";
let selectedOpacity = 1;
let selectedWidth = 10;


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


function setOpacity(){
    selectedOpacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add alpha value to selectedColor and set final colorSelected value
        setColorToRGBA(selectedOpacity, selectedColor)
}


function setColor(){
    selectedOpacity = document.getElementById('selected-opacity').valueAsNumber;
        selectedColor = $('#selected-color').val();

        // add rgb color to the selectedOpacity and set final colorSelected value
        setColorToRGBA(selectedOpacity, selectedColor)
}


