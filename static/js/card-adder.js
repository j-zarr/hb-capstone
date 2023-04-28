'use strict';

//**************<< Helper functions to create artwork-cards and portfolio-cards for DOM *********//
//****************************<< related classes and function calls in art-gallery.js >>***********************//



//**************<< SET SELECT PORTFOLIO OPTIONS - HELPER FOR ARTWORK CARD  >>************//

// global variable to hold user portfolios
// bc of async fetch need to have array set before using it in createArtworkCard fn
// so needs to be global var
const portfolios_arr = [];

//Helper function to get all the user portfolios 
const userPortfolios = () => {
    fetch('/api/user-portfolio-titles')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((obj) => {
                    portfolios_arr.push([obj[1], obj[0]]) // obj[1] = portfolio_id, obj[0] = p_title
                });
            }
        });
}

// call userPortfolios to set value for glabal portfolios_Arr
userPortfolios();




//***********************<< for PORTFOLIO CARD >>*******************//


// Create portfolio-card 
function createPortfolioCard(pair,) {

    const title = pair[0];
    const pId = pair[1];

    const p = new GalleryPortfolio(title, pId); // create class instance

    // Add to new portfolio card to DOM
    $('#card-to-add').after(galleryHTML.portfolioCard);

    // add the potrfolio title to the card
    $('#p-artworks').text(title);

    //add unique attr to be able to select
    $('#p-artworks').attr('title-me', pId)

    // Replace the id with the portfolio id (as pId) so card can be selected to remove
    $('#added-card').attr('id', pId);

    //add unique attr to be able to select specific card clicked to update title
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
        p.openPortfolio(); //class method
    });
}




//***********************<< for ARTWORK CARD >>*******************//


// Create artwork-card
function createArtworkCard(obj) {

    ///////// TO DO: ////////////
    //some have errors in filke_path, need to dleete those and create some more
    // before adding link to img tag src
    //////////////////////////////

    const [title, aId, pId, filePath] = obj;

    const a = new GalleryArtwork(title, aId, pId, filePath) // create class instance

    // Add new artwork card to DOM
    $('#card-to-add').after(galleryHTML.artworkCard);

       ////////// TO DO: ///////////
    // add image to artwork card from S3 
    // $('#card-img').html(`<a src="filePath" id="image"></a>`);
    // $('#image').wrap(` <div class="card-img" style="height:300px;"></div>`);
    /////////////////////////////////

    // populate select options for user portfolios
    portfolios_arr.forEach(item => {
        let el = `<option 
                            id=${item[0]}
                            value=${item[1]} >

                            ${item[1]} 

                            </option>`;

        $('#options-placeholder').before(el);
    });


    // Add the artrwork title to the card
    $('#current-title').text(title);

    //add unique attr to be able to select title if updated
    $('#current-title').attr('title-me', aId);

    // Replace the id with the artwork id (as aId) so card can be selected to remove
    $('#added-card').attr('id', aId);

    //add unique attr to be able to select specific card clicked to update title
    $('#update-a-title').attr('update-my-title', aId);

    //add unique attr to be able to get select val from correct card 
    $('#update-p-title').attr('update-my-p', aId)

    //add unique attr to input field to update to new portfolio for artwork
    $('#update-new-p-title').attr('update-me-new-p', aId);



     // Set event listener/handler for clicking delete
     $('#delete-artwork').click(() => {
        a.deleteArtwork() //class method
    });



    // set event listner/handler for clicking save on update 
    $('#update-artwork-form').submit((evt) => {
        evt.preventDefault();

        // get val of a-title input
        const newTitle = $(`input[update-my-title = ${aId} ]`)

        //get portfolio id from selected option 
        const selectPortfolio = $(`select[update-my-p = ${aId} ]`)

        //get value of new portfolio tile to create
        const createNewPortfolio = $(`input[update-me-new-p = ${aId}]`)

        // return if no values to update
        if (newTitle.val() == ''
            && selectPortfolio.val() == ''
            && createNewPortfolio.val() == '') {
            return;
        }

        // check if more than one portfolio field changed
        if (selectPortfolio.val() && createNewPortfolio.val()) {
            alert('cannot add to more than one portfolio')
            //reset form 
            selectPortfolio.val('');
            newTitle.val('');
            createNewPortfolio.val('');
            return;
        }

        if (selectPortfolio.val()) {
            const changePortfolio = selectPortfolio
                .children(':selected')
                .attr('id');

            a.updatePortfolio(changePortfolio)
        }

        if (createNewPortfolio.val()) {
            console.log(createNewPortfolio.val())
            a.updateCreatedPortfolio(createNewPortfolio.val())
        }

        //reset form 
        selectPortfolio.val('');
        newTitle.val('');
        createNewPortfolio.val('');
        $('#dropdown-update').click();

    });


}




