'use strict';


//********<< Note: Helper functions in card-adder.js >>*********//



//************** Portfiolio Card Class ***********//

//Portfolio Card Class
class GalleryPortfolio {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
        const title = { title: this.title }
        //console.log(this.title)
        fetch(`/api/update-portfolio-title/${this.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(title)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    //update card title in DOM
                    $(`a[title-me=${this.id}]`).text(this.title)
                }
            });
    }

    openPortfolio(populatePortfolioSelect) {
        fetch(`/api/get-portfolio-artworks/${this.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    data.message.forEach((obj) => {

                        if(Object.keys(data.message).length < 1){
                            $('#card-to-add').after(
                            ` <div class="alert alert-dark alert-dismissible fade show" role="alert">
                                 Portfolio ${this.title} has no artworks!
                                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div> `);
                        }

                        // remove portfolio cards by resetting html
                        $('#content-area').html(galleryHTML.portfolioCardContainer);

                        // create a card for each artwork
                        createArtworkCard(obj, populatePortfolioSelect); //fn def in card-adder.js
    
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
                    $(`#${this.id}`).remove();
                }
            });

    }
}


//************** Artwork Card Class ***********//

// Artwork Card class
class GalleryArtwork {
    constructor(title, id, portfolioId, path) {
        this.title = title;
        this.id = id;
        this.portfolioId = portfolioId;
        this.path = path;

    }

    updateTitle(newTitle) {
        this.title = newTitle
        return this.title;
    }

    // Update based on either select option or newly created portfolio
    updatePortfolio(newPortfolioID) {
        this.portfolioId = newPortfolioID
        return this.portfolioId
    }

    deleteArtwork() {

    }
}

//*************<< set cards for all portfolios >>***********/

// Get all user portfolios and create a card for each
function getAllPortfolios(populatePortfolioSelect) {

    fetch('/api/user-portfolio-titles')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((pair) => {

                    // create a card for each portfolio 
                    createPortfolioCard(pair, populatePortfolioSelect);

                }); 
            }
        });
}



//*********<< set cards for searched portfolios >>**********//
function getSearchPortfolioResults(){
    fetch('/api/search-porfolios', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({searchParam: 
                                $('#search-portfolios-input').val()})
    })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                   
                    if(Object.keys(data.message).length < 1){
                        $('#card-to-add').after(
                        ` <div class="alert alert-dark alert-dismissible fade show" role="alert">
                             No results found for ${$('#search-portfolios-input').val()}
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div> `);
                    }

                   data.message.forEach((pair) => {

                    // create a card for each portfolio 
                    createPortfolioCard(pair);

                }); 

                }
            });

}


//*******<< set cards for one portfolio's artwworks >>*******//


//***********<< set cards for searched artwworks >>**********//



//*************<< set cards for all artwworks >>*************//

// Get all user artworks and create a card for each
function getAllArtworks(populatePortfolioSelect) {

    fetch('api/get-user-artworks')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((obj) => {

                    // create a card for each artwork
                    createArtworkCard(obj, populatePortfolioSelect); //fn def in card-adder.js

                }); 
            }
        });
}
