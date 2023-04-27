'use strict';

//**************<< Helper functions to create artwork-cards and portfolio-cards for DOM *********//
//****************************<< related classes and function calls in art-gallery.js >>***********************//


// Create portfolio-card 
function createPortfolioCard(pair, populatePortfolioSelect) {

    const title = pair[0];
    const pId = pair[1];

    const p = new GalleryPortfolio(title, pId); // create class instance

    // Add to new portfolio card to DOM
    $('#card-to-add').after(galleryHTML.portfolioCard);

    // add the potrfolio title to the card
    $('#p-artworks').text(title);

    //add unique attr to be able to select
    $('#p-artworks').attr('title-me', pId)

    // Replace the id with the portfolio id (as pId) so card can be selected
    $('#added-card').attr('id', pId);

    //add unique attr to be able to select specific card clicked to update
    $('#update-p-title').attr('update-me', pId)



    // Set event listener/handler for clicking delete
    $('#delete-portfolio').click(() => {
        p.deletePortfolio(); //class method
    });


    //  Set event listener/handler for clicking update title
    $('#update-portfolio-form').submit((evt) => {
        evt.preventDefault();

        const newTitle = $(`input[update-me = ${pId} ]`)
        if (newTitle.val() == '') {
            return;
        }
        p.updateTitle(newTitle.val()); //class method
    });


    // Set event listener/handler for clicking see portfolio's artwworks
    $('#p-artworks').click(() => {
        p.openPortfolio(populatePortfolioSelect); //class method
    });
}



// Create artwork-card
function createArtworkCard(obj, populatePortfolioSelect) {

    ///////// TO DO: ////////////
    //some have errors in filke_path, need to dleete those and create some more
    // before adding link to img tag src
    //////////////////////////////

    const [title, aId, pId, filePath] = obj;


    const a = new GalleryArtwork(title, aId, pId, filePath) // create class instance

    // Add to new portfolio card to DOM
    $('#card-to-add').after(galleryHTML.artworkCard);

    populatePortfolioSelect();//populate portfolio select options

    $('#current-title').text(title)

    
}