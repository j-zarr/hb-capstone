'use strict';

$(document).ready(() => {

     //Note: use 'function()' syntax to maintain access to $(this)

    // get the bootstrap shade of blue to use 
    const blueColor = $('#logout').css('color')


     // Helper function to populate the portfolio tiles for the 
         //save-dropdown-form and artwork-update-form
         function populatePortfolioSelect(){
            fetch('/api/user-portfolio-titles')
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {

                    data.message.forEach((pair) => {
                        let element = `<option 
                                            class="portfolio-options"
                                            id=${pair[1]} 
                                            value=${pair[0]}> 
                                            ${pair[0]}
                                        </option>`;
                        $('.options').before(element);
                   });
                }
            });
        }


    //*****************<< Updated DOM for clicking "create" in main menu >>*****************/
    //****************<< html in buid-create-menu.js, build-canvas.js >>********************/
    //****************<< function definition in art-canvas.js >>****************************/


    // Set event handler for click on 'create' link
    $('#create-link').click(function () {

        // disable create link from being clicked again and reloading page
        // Change color of create link to indicate which menu currently on 
        $('#gallery-link').css('color', blueColor);
        $('#gallery-link').prop('disabled', false);

        $(this).prop('disabled', true);
        $(this).css('color', '#e6e8fa');

        // update the menu options in the HTML
        $('#nav-menu').html(navCreateMenu).fadeIn();
        
        populatePortfolioSelect();

        // update the HTML with the canvas and canvas features
        $('#content-area').html(canvasHTML);

        //instantiate fabric.js canvas on html camvas id
        const myCanvas = new fabric.Canvas('c', {
            width: 800,
            height: 800,
            selectionFullyContained: true
        });

        //Call functions from art-canvas.js to interact with the created canvas 
        activateCanvasBtns(myCanvas);
    });


    //******************<< Updated DOM for clicking "gallery" in main menu >>***************/
    //****************<< html in build-gallery-menu.js, build-art-gallery.js >>*************/
    //****************<< function definitions in art-gallery.js >>*******************************/


    // Set event handler for click on 'gallery' link
    $('#gallery-link').click(function () {

        // disable gallery link from being clicked again and reloading page
        // Change color of gallery link to indicate which menu currently on 
        $('#create-link').css('color', blueColor);
        $('#create-link').prop('disabled', false);
        $(this).prop('disabled', true);
        $(this).css('color', '#e6e8fa');

        // update the menu options in the HTML
        $('#nav-menu').html(navGalleryMenu).fadeIn();

        // Add gallery background image
        $('#content-area').html(galleryHTML.galleryWall);
       
         // update the HTML with the gallery and features for click of nav link "artworks"
        $('#all-artworks').click(()=>{
            $('#content-area').html(galleryHTML.cardContainer);
            
            // fn def in art-gallery.js
            getAllArtworks() 
        });

        // update DOM with artwork search results
        $('#search-artworks-btn').click(()=>{
            if( !$('#search-artworks-input').val()){ return}

            $('#content-area').html(galleryHTML.cardContainer);

             // fn def in art-gallery.js
             getSearchArtworkResults();
        });
        
        
         // update the HTML with the gallery and features for click of nav link "portfolios"
        $('#all-portfolios').click(()=>{
            $('#content-area').html(galleryHTML.cardContainer);

            // fn def in art-gallery.js
            getAllPortfolios();  
        });
            
        // update DOM with portfolio search results
        $('#search-portfolios-btn').click(()=>{
            if( !$('#search-portfolios-input').val()){ return}

            $('#content-area').html(galleryHTML.cardContainer);

             // fn def in art-gallery.js
             getSearchPortfolioResults();
        });
        
    });


}); // closing for document.ready