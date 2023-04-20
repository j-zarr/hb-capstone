'use strict'

//html elements to dynamically add to gallery-menu when "gallery" clicked in main user menu
// **** accessed by art-canvas.js *****


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