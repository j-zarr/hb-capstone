'use strict';

class GalleryPortfolio {
    constructor(title, id) {
        this.title = title;

        this.id = id;
    }


    updateTitle(newTitle) {
        this.title = newTitle;
        return this.title;
    }

    //Display artworks from this portfolio
    openPortfolio() {
        //  this.artworks = artworks;
    }

    // Delete this portfolio and all it's artworks
    deletePortfolio() {

    }
}


class GalleryArtwork {
    constructor(title, portfolioId, id) {
        this.title = title;
        this.portfolioId = portfolioId;
        this.id = id;

    }
    updateTitle(newTitle) {
        this.title = newTitle
        this.title = newTitle;
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



function getAllPortfolios() {
    fetch('/api/user-portfolio-titles')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                data.message.forEach((pair) => {
                    // let p = new GalleryPortfolio('title', 'id');
                    let title = pair[0];
                    let pId = pair[1];

                    $('#card-to-add').after(galleryHTML.portfolioCard);
                    console.log(galleryHTML.portfolioCard)

                    // Replace the id with the portfolio id (as p+id) so card can be selected
                    $('#added-card').attr('id', `p${pId}`);
                    $('#p-artworks').text(title);
                    

                    $('#delete-portfolio').on('click',() => {
                        fetch(`/api/delete-porfolio/p${pId}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.status == 'success') {
                                   $(`#p${pId}`).remove()
                                   
                                }
                            });

                        $('#p-artworks').click(() => {
                            return /////////// SET UP LATER
                        });

                    });



                })
            }
        });

}

function getAllArtworks() {

}



// Set event handlers for interactivity with the dynamically added gallery
function activateGalleryCards() {



} /// close for activateGalleryBtns