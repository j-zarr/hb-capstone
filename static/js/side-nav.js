$(document).ready(() => {

    const navCreateMenu =
        `<li>
            <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline">Save</span></a>
        </li>
        <li>
             <a href="#" class="nav-link px-0 align-middle">
             <span class="ms-1 d-none d-sm-inline">Update</span></a>
        </li>
        <li>
            <a href="#" class="nav-link px-0 align-middle">
                <span class="ms-1 d-none d-sm-inline">Delete</span></a>
        </li>
        <hr> `;
        
    
    const navGalleryMenu =
        `<li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline">Portfolios</span></a>
        </li>
        <li>
        <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline">Artworks</span></a>
        </li>
        <br>
         <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-portfolios" class="form-control rounded" placeholder="Portfolio title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary">search</button>
        </div>
        </li>

        <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-artworkss" class="form-control rounded" placeholder="Artwork title" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary">search</button>
        </div> 
        <br>
        <hr> `;
        
        
    const blueColor = $('#logout').css('color')


    $('#create-link').click(() => {
       
        $('#create-link').prop('disabled', true); 
        $('#create-link').css('color', '#7FFF00');
        $('#gallery-link').css('color', blueColor);

        $('#nav-menu').html(navCreateMenu).fadeIn();
            
        $('#content-area').html(
            `
              <div class="col py-3" id="art-canvas">
                 <p>CANVAS WILL GO HERE!</p>
             </div> `
               );
            
        });
        

     $('#gallery-link').click((e) => {    
        
         $(e.target).prop('disabled', true); 
         $(e.target).css('color', '#7FFF00');
         $('#create-link').css('color', blueColor);
           
        $('#nav-menu').html(navGalleryMenu).fadeIn(2000);
            
        $('#content-area').html(
             `
            <div class="col py-3" id="gallery-cards">
                 <p>GALLERY AS CARDS WILL GO HERE!</p>
            </div> `
            );
        });


}); // closing for document.ready