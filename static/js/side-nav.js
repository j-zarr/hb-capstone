$(document).ready(() => {

    const navCreateMenu =
        `<li>
            <a href="#" class="nav-link px-0 align-middle">
            <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Save</span></a>
        </li> 
        <li>
             <a href="#" class="nav-link px-0 align-middle">
             <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Clear</span></a>
        </li>
        <li>
             <a href="#" class="nav-link px-0 align-middle">
             <span class="ms-1 d-none d-sm-inline" style="color:#98FB98;">Restore</span></a>
        </li>
        <br>
        <hr>`;
       

        //update and delete should only be available on the gallery cards 
        // <li>
        //      <a href="#" class="nav-link px-0 align-middle">
        //      <span class="ms-1 d-none d-sm-inline">Update</span></a>
        // </li>
        // <li>
        //     <a href="#" class="nav-link px-0 align-middle">
        //         <span class="ms-1 d-none d-sm-inline">Delete</span></a>
        // </li>
        // <hr> `;
        
    
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
        
        
    const blueColor = $('#logout').css('color')


    $('#create-link').click(() => {
       
        $('#gallery-link').css('color', blueColor);
        $('#gallery-link').prop('disabled', false); 

        $('#create-link').prop('disabled', true);  
        $('#create-link').css('color', '#55DD33');
        
    
        $('#nav-menu').html(navCreateMenu).fadeIn();
            
        $('#content-area').html(
            `
              <div class="col py-3" id="art-canvas">
                 <p>CANVAS WILL GO HERE!</p>
             </div> `
               );
            
        });
        

     $('#gallery-link').click(() => {   
        
        $('#create-link').css('color', blueColor);
        $('#create-link').prop('disabled', false); 
        
        $('#gallery-link').prop('disabled', true); 
        $('#gallery-link').css('color', '#55DD33');
        
           
        $('#nav-menu').html(navGalleryMenu).fadeIn();
            
        $('#content-area').html(
             `
            <div class="col py-3" id="gallery-cards">
                 <p>GALLERY AS CARDS WILL GO HERE!</p>
            </div> `
            );
        });


}); // closing for document.ready