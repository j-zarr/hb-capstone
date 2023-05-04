'use strict';

$(document).ready(() => {

    //Note: use 'function()' syntax to maintain access to $(this)

    // Helper function to populate the portfolio tiles for the 
    //save-dropdown-form and artwork-update-form
    function populatePortfolioSelect() {
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
        // Change border of create link to indicate which menu currently on 
        $('#gallery-link').removeClass('clicked').addClass('unclicked');
        $('#gallery-link').children('span').removeClass('clicked').addClass('unclicked');

        $('#gallery-link').prop('disabled', false) 
        $(this).prop('disabled', true);

        $(this).removeClass('unclicked').addClass('clicked');
        $(this).children('span').removeClass('unclicked').addClass('clicked'); 

        // Looks good but distractracting for canvas/may clash with user canvas colors
        // // update body bg-img
        // $('body').css({
        //     'background-image': `linear-gradient(rgba(76, 0, 255, 1), rgba(255, 255, 255, 0.1)),
        //                          url(/static/assets/geo-pattern.jpg`,
        //     'background-repeat': 'no-repeat',
        //     'background-size': 'cover',
        //     'background-attachment': 'fixed'
        // });

        $('body').css({
            'background-image': 'none',
            'background-color': 'white'
        }).fadeIn('slow');

        // update the menu options in the HTML
        $('#nav-menu').html(navCreateMenu);

        populatePortfolioSelect();

        // update the HTML with the canvas and canvas features, reset css
        $('#content-area').html(canvasHTML);
        $('#nav-menu-border').css('position', 'relative');
               

        //instantiate fabric.js canvas on html camvas id
        const myCanvas = new fabric.Canvas('c', {
            width: 900,
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
        // Change border of gallery link to indicate which menu currently on 
        $('#create-link').removeClass('clicked').addClass('unclicked'); 
        $('#create-link').children('span').removeClass('clicked').addClass('unclicked');

        $('#create-link').prop('disabled', false);
        $(this).prop('disabled', true);

        $(this).removeClass('unclicked').addClass('clicked');
        $(this).children('span').removeClass('unclicked').addClass('clicked'); 

        // update body bg-img with parallax scroll
        $('body').css({
            'background-image': 'url("/static/assets/white-bg-texture.jpg")',
            'height': '100%',
            'background-attachment': 'fixed',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
            
         }).fadeIn('400', 'linear');

        // update the menu options in the HTML, adjust css
         $('#nav-menu').html(navGalleryMenu);
         $('#nav-menu-border').css('position', 'fixed');

         // Add gallery wall
        $('#content-area').html(galleryHTML.galleryWall);                      
         

       
        // update the HTML with the gallery and features for click of nav link "artworks"
        $('#all-artworks').click(() => {

            $('#content-area').html(galleryHTML.cardContainer);

            // fn def in artwork-card.js
            getAllArtworks()
        });

        // update DOM with artwork search results
        $('#search-artworks-btn').click(() => {
            if (!$('#search-artworks-input').val()) { return }

            $('#content-area').html(galleryHTML.cardContainer);

            // fn def in artwork-card.js
            getSearchArtworkResults();
        });


        // update the HTML with the gallery and features for click of nav link "portfolios"
        $('#all-portfolios').click(() => {
            $('#content-area').html(galleryHTML.cardContainer);

            // fn def in portfolio-card.js
            getAllPortfolios();
        });

        // update DOM with portfolio search results
        $('#search-portfolios-btn').click(() => {
            if (!$('#search-portfolios-input').val()) { return }

            $('#content-area').html(galleryHTML.cardContainer);

            // fn def in portfolio-card.js
            getSearchPortfolioResults();
        });

    });


}); // closing for document.ready