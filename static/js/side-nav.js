'use strict';

$(document).ready(() => {

    // Create updated menu options (for create link click)
    const navCreateMenu =
        ` <li>
            <a href="#" class="nav-link px-0 align-middle" id="clear">
            <span class="ms-1 d-none d-sm-inline" style="color:white;">Clear</span></a>
        </li>
        <li>
            <a href="#" class="nav-link px-0 align-middle" id="restore">
            <span class="ms-1 d-none d-sm-inline" style="color:white;">Restore</span></a>
        </li>
        
        <li>
            <div class="dropdown nav-link px-0 align-middle">
             <a href="#" class="d-flex align-items-center align-middle text-white text-decoration-none dropdown-toggle" id="dropdown-save" data-bs-toggle="dropdown" aria-expanded="false">
             <span class="ms-1 d-none d-sm-inline" style="color:white;">Save</span></a>

                <ul class="dropdown-menu dropdown-menu" aria-labelledby="dropdown-save">
                    <form action="/api/save-artwork" method="post" id="submit-form">
                    
                        <li style="margin: 20px">
                            <label for="artwork-title">Artwork title: </label>
                            <input type="text" name="artwork-title" id="artwork-title" placeholder="untitled">
                        </li>
                        <li style="margin: 20px">
                            <label for="portfolio-title">Choose your portfolio: </label>
                            <select name="porfolios" id="portfolio-title">
                                <option id="options" value="">--Choose an option--</option>
                            </select>
                        </li>
                        <li style="margin: 20px">
                             <label for="new-portfolio-title">Create a new portfolio: </label>
                            <input type="text" name="new-portfolio-title" id="new-portfolio-title">
                        </li>

                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li style=" display: flex; justify-content: center; align-items: center;">
                            <input type="submit"  value="submit" class="btn btn-outline-dark" id="submit-save">
                        </li>
                    </form>
                </ul>
                
            </div>
        </li> 
        
        <hr>`;


    //update and delete should only be available when cards populate the page
    // <li>
    //      <a href="#" class="nav-link px-0 align-middle">
    //      <span class="ms-1 d-none d-sm-inline">Update</span></a>
    // </li>
    // <li>
    //     <a href="#" class="nav-link px-0 align-middle">
    //         <span class="ms-1 d-none d-sm-inline">Delete</span></a>
    // </li>
    // <hr> `;

    // Create updated menu options (for gallery link click)
    const navGalleryMenu =
        `<li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:white;">Portfolios</span></a>
        </li>
        <li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:white;">Artworks</span></a>
        </li>
        <br>
         <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-portfolios" class="form-control rounded" placeholder="Portfolio title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary" style="color:white; border-color:white">search</button>
        </div>
        </li>

        <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-artworkss" class="form-control rounded" placeholder="Artwork title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary" style="color:white; border-color:white;">search</button>
        </div> 
        <br>
        <hr>`;

    // get the bootstrap shade of blue to use 
    const blueColor = $('#logout').css('color')

    //Note: use 'function()' syntax to maintain access to $(this)

    // Set event handler for click on 'create' link
    $('#create-link').click(function () {

        // disable create link from being clicked again and reloading page
        // Change color of create link to indicate which menu currently on 
        $('#gallery-link').css('color', blueColor);
        $('#gallery-link').prop('disabled', false);

        $(this).prop('disabled', true);
        $(this).css('color', '#00FF00');

        // update the menu options in the HTML
        $('#nav-menu').html(navCreateMenu).fadeIn();


        // Populate the portfolio tiles for the save dropdown form
        fetch('/api/user-portfolio-titles')
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    data.message.forEach((pair) => {
                        let element = `<option id=${pair[1]} value=${pair[0]}>${pair[0]}</option>`
                        $('#options').before(element);
                   });
                }
            });

        // update the HTML with the canvas and canvas features
        $('#content-area').html(artCanvas.canvasHTML);

        //instantiate fabric.js canvas on html camvas id
        const myCanvas = new fabric.Canvas('c', {
            width: 800,
            height: 800,
            selectionFullyContained: true
        });

        //Call functions from art-canvas.js to interact with the created canvas 
        activateBtnClick(myCanvas);
    });



    // Set event handler for click on 'gallery' link
    $('#gallery-link').click(function () {

        // disable gallery link from being clicked again and reloading page
        // Change color of gallery link to indicate which menu currently on 
        $('#create-link').css('color', blueColor);
        $('#create-link').prop('disabled', false);
        $(this).prop('disabled', true);
        $(this).css('color', '#00FF00');

        // update the menu options in the HTML
        $('#nav-menu').html(navGalleryMenu).fadeIn();

        // update the HTML with the gallery and features
        $('#content-area').html(
            `
                <div id="gallery-cards">
                    <p>GALLERY AS CARDS WILL GO HERE!</p>
                </div> `
        );
    });


}); // closing for document.ready