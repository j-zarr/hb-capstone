'use strict';


//********<< Class def and functions for Portfolio Card >>*********//



//************** Portfiolio Card Class ***********//

//Portfolio Card Class
class GalleryPortfolio {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }

    updateTitle(newTitle) {
        const title = { title: newTitle }

        fetch(`/api/update-portfolio-title/${this.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(title)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    this.title = newTitle;

                    //update card title in DOM
                    $(`span[title-me=${this.id}]`).text(this.title)
                }
            });
    }

    openPortfolio(currentCards) {
        fetch(`/api/get-portfolio-artworks/${this.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {

                    if (data.message == 'none found') {
                        $('.cardsContainer').before(
                            ` <div class="alert alert-dark alert-dismissible fade show" role="alert" 
                            style="background-color: rgba(0, 0, 0, 0.6); color: rgb(30,30,30); text-align:center; margin-left:250px; margin-right:20px;">
                             Portfolio ${this.title} has no artworks!
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div> `);

                        return;
                    }

                    // remove portfolio cards by resetting html card container
                    $('#content-area').html(galleryHTML.cardContainer);

                    data.message.forEach((obj) => {
                        // create a card for each artwork
                        createArtworkCard(obj, currentCards); //fn def in artwork-card.js.js

                    });
                }
            });
    }

    // Delete this portfolio and all it's artworks
    deletePortfolio() {

        fetch(`/api/delete-porfolio/${this.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    $(`#${this.id}`).fadeOut('slow').remove();

                    //reset portfolio options
                    portfolios_arr.length = 0;
                    userPortfolios();//resets portfolios_arr // fn def in artwork-card.js
                }
            });
    }
    
}


//*****************<< create a portfolio card  >>*****************/

// Create portfolio-card and event listeners
function createPortfolioCard(pair, currentCards) {

    const title = pair[0];
    const pId = pair[1];

    const p = new GalleryPortfolio(title, pId); // create class instance

    // Add to new portfolio card to DOM
    $('#card-to-add').after(galleryHTML.portfolioCard).fadeIn('slow', 'linear');

    // add the potrfolio title to the card
    $('#current-p-title').text(title);

    //add unique attr to be able to select
    $('#current-p-title').attr('title-me', pId)

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
        if (!newTitle.val()) {
            return;
        }
        p.updateTitle(newTitle.val()); //class method
    });


    // Set event listener/handler for clicking see portfolio's artwworks
    $('#p-artworks').click(() => {
        p.openPortfolio(currentCards); //class method
    });
}




//*************<< get cards for all portfolios >>***********/

// Get all user portfolios and create a card for each
function getAllPortfolios(currentCards) {

    fetch('/api/user-portfolio-titles')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((pair) => {

                    // create a card for each portfolio 
                    createPortfolioCard(pair, currentCards);

                });
            }
        });
}



//*********<< get cards for searched portfolios >>**********//

function getSearchPortfolioResults(currentCards) {
    fetch('/api/search-porfolios', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            searchParam:
                $('#search-portfolios-input').val()
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                if (Object.keys(data.message).length < 1) {
                    $('#card-to-add').after(
                        ` <div class="alert alert-dark alert-dismissible fade show" role="alert">
                             No results found for ${$('#search-portfolios-input').val()}
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div> `);
                }

                data.message.forEach((pair) => {

                    // create a card for each portfolio 
                    createPortfolioCard(pair, currentCards);

                });

            }
        });

}






