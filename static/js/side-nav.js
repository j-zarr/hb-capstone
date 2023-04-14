$(document).ready(() => {

    // Insert main user menu as side bar
    const navCreateMenu =
        `<li>
            <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Save</span></a>
        </li> 
        <li>
             <a href="#" class="nav-link px-0 align-middle" id="clear">
             <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Clear</span></a>
        </li>
        <li>
             <a href="#" class="nav-link px-0 align-middle" id="restore">
             <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Restore</span></a>
        </li>
        <br>
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

    // Update menu options (for gallery link click)
    const navGalleryMenu =
        `<li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Portfolios</span></a>
        </li>
        <li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Artworks</span></a>
        </li>
        <br>
         <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-portfolios" class="form-control rounded" placeholder="Portfolio title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary" style="color:#98FB98; border-color:#98FB98">search</button>
        </div>
        </li>

        <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-artworkss" class="form-control rounded" placeholder="Artwork title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary" style="color:#98FB98; border-color:#98FB98;">search</button>
        </div> 
        <br>
        <hr>`;

    // get the bootstrap shade of blue to use 
    const blueColor = $('#logout').css('color')

    //Note: use 'function()' syntax to maintain access to $(this)

    // Set event handler for click on 'create' link
    $('#create-link').click(function () {

        $('#gallery-link').css('color', blueColor);
        $('#gallery-link').prop('disabled', false);

        $(this).prop('disabled', true);
        $(this).css('color', '#00FF00');

        // update the menu options in the HTML
        $('#nav-menu').html(navCreateMenu).fadeIn();

        // update the HTML with the canvas and canvas features
        $('#content-area').html(artCanvas.canvasHTML);

        //instantiate fabric.js canvas on html camvas id
        const myCanvas = new fabric.Canvas('c', {
            width: 800,
            height: 800,
            selectionFullyContained: true,
        });

        
        //Call functions from art-canvas.js to interact with the created canvas 
        activateBtnClick(myCanvas);
        
        // set event handler for click on 'clear' to clear the canvas 
        $('#clear').click(function () {
            myCanvas.clear();
        });

        //let savedPosition = myCanvas.toJSON();
        // $('#restore').click(function(){
        //     myCanvas.loadFromJSON(savedPosition,myCanvas.renderAll.bind(myCanvas) )
        // })

    });

    // Set event handler for click on 'gallery' link
    $('#gallery-link').click(function () {

        $('#create-link').css('color', blueColor);
        $('#create-link').prop('disabled', false);

        $(this).prop('disabled', true);
        $(this).css('color', '#00FF00');

        // update the menu options in the HTML
        $('#nav-menu').html(navGalleryMenu).fadeIn();

        // updtae the HTML with the gallery and features
        $('#content-area').html(
            `
            <div id="gallery-cards">
                 <p>GALLERY AS CARDS WILL GO HERE!</p>
            </div> `
        );
    });


}); // closing for document.ready