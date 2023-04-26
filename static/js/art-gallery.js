'use strict';

// Build class to with methods for each portfolio card instance 
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

    //Display artworks from this portfolio
    openPortfolio() {
        //  this.artworks = artworks;
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

// Build class with methods for each artwork card instance 
class GalleryArtwork {
    constructor(title, portfolioId, id) {
        this.title = title;
        this.portfolioId = portfolioId;
        this.id = id;

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



function getAllPortfolios() {

    fetch('/api/user-portfolio-titles')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((pair) => {
                    const title = pair[0];
                    const pId = pair[1];

                    const p = new GalleryPortfolio(title, pId); // create class instance

                    // Add to new portfolio card to DOM
                    $('#card-to-add').after(galleryHTML.portfolioCard);

                    $('#p-artworks').text(title); // add the potrfolio title to the card
                    $('#p-artworks').attr('title-me', pId) //add unique attr to be able to select

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
                        p.updateTitle(newTitle.val()) //class method
                    });


                    // Set event listener/handler for clicking see portfolio's artwworks
                    $('#p-artworks').click(() => {
                        return /////////// SET UP LATER
                    });


                }); // closure for forEach loop
            } // closure if success check
        }); // fetch closure
} // outer function closure




function getAllArtworks() {

}



