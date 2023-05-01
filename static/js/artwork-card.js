'use strict';


//**********<< Class def and functions for Artwork Card >**************//



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
        
        const title = { title: newTitle }

        fetch(`/api/update-artwork-title/${this.id}/${this.portfolioId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(title)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    this.title = newTitle

                    //update card title in DOM
                    $(`h5[title-me=${this.id}]`).text(this.title);
                }
            });
    }

    // Update selected portfolio option 
    updatePortfolio(newPortfolioID, portfolioTitle) {

        const pId = { pId: newPortfolioID }

        fetch(`/api/update-artwork-portfolio-id/${this.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pId)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {

                    this.portfolioId = newPortfolioID;

                     //update card title in DOM
                    $(`h6[portfolio-title-me=${this.id}]`).text(portfolioTitle);

                }
            });
           
    }

    // Update to new created portfolio
    updateCreatedPortfolio(newPortfolioTitle) {
        const pTitle = { pTitle: newPortfolioTitle }

        fetch(`/api/update-artwork-new-portfolio/${this.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pTitle)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    this.portfolioId = data.message;
                
                    //update card title in DOM
                    $(`h6[portfolio-title-me=${this.id}]`).text(newPortfolioTitle);
                    
                     //reset portfolio options
                     portfolios_arr .length = 0;
                     userPortfolios(); 
                }
            });
    }

    deleteArtwork() {
        fetch(`/api/delete-artwork/${this.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({path: this.path})
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    $(`#${this.id}`).remove();
                }
            });
    }

}

//**************<< Helper function to set portfolios select options  >>************//

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

// call userPortfolios to set value for global portfolios_Arr
userPortfolios(); 




//*****************<< create an artwork card  >>*****************/

// Create artwork-card and event listeners
function createArtworkCard(obj) {
 
    const [title, aId, pId, filePath] = obj;

    const a = new GalleryArtwork(title, aId, pId, filePath) // create class instance

    // Add new artwork card to DOM
    $('#card-to-add').after(galleryHTML.artworkCard);


    // add image link to S3 bucket url
    $('#card-img').attr('id', `card-img-${aId}`) // create unique element for each card
    $(`#card-img-${aId}`).html(`<img src=${filePath} width="250" height="300"  id="image">`);
    $('#image').wrap(` <div class="card-img" style="height:300px; width: 250px;"></div>`);

    let curr_portfolio = '';

    // populate select options for user portfolios
    portfolios_arr.forEach(item => {
       
        // get current portfolio name
        if (item[0] == pId) {
            curr_portfolio = item[1];
        } 
            let el = `<option 
                            id=${item[0]}
                            value="${item[1]}" >

                            ${item[1]} 

                            </option>`;

            $('#options-placeholder').before(el);
    });


    // Add the artrwork title and current portfolio to the card
    $('#current-title').text(title);
    $('#current-portfolio').text(curr_portfolio);
                             

    //add unique attr to be able to select title/piortfolio if updated
    $('#current-title').attr('title-me', aId);
    $('#current-portfolio').attr('portfolio-title-me', aId);

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

        //get portfolio from selected option 
        const selectPortfolio = $(`select[update-my-p = ${aId} ]`)

        //get value of new portfolio tile to create
        const createNewPortfolio = $(`input[update-me-new-p = ${aId}]`)


        // return if no values to update
        if (!newTitle.val() 
            && !selectPortfolio.val() 
            && !createNewPortfolio.val()) {
            return;
        }

        if (newTitle.val()) {
            if(newTitle.val() == 0){
                alert('Cannot use "0" for title');
                newTitle.val('');
                return;
            }
            a.updateTitle(newTitle.val()) //class method
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
            
            // if selecting current portfolio return
            if(selectPortfolio.children(':selected')
                                .attr('id') == pId){ 
              //  selectPortfolio.val('');  //reset value
                return;
            }

            const changePortfolio = selectPortfolio
                .children(':selected')
                .attr('id');

            a.updatePortfolio(changePortfolio, selectPortfolio.val()) //class method
        }

        if (createNewPortfolio.val()) {
            a.updateCreatedPortfolio(createNewPortfolio.val()) //class method
        }

        //reset form 
        selectPortfolio.val('');
        newTitle.val('');
        createNewPortfolio.val('');
        $('#dropdown-update').click();
    });
}


//*************<< get cards for all artwworks >>*************//

// Get all user artworks and create a card for each
function getAllArtworks() {

    fetch('api/get-user-artworks')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                data.message.forEach((obj) => {

                    // create a card for each artwork
                    createArtworkCard(obj);

                });
            }
        });
}


//***********<< get cards for searched artworks >>**********//

function getSearchArtworkResults() {
    fetch('/api/search-artworks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            searchParam:
                $('#search-artworks-input').val()
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {

                if (Object.keys(data.message).length < 1) {
                    $('#card-to-add').after(
                        ` <div class="alert alert-dark alert-dismissible fade show" role="alert">
                             No results found for ${$('#search-artworks-input').val()}
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div> `);
                }

                data.message.forEach((obj) => {
                    // create a card for each portfolio 
                    createArtworkCard(obj);

                });

            }
        });

}