'use strict'

//html elements to dynamically add to gallery-menu when "gallery" clicked in main user menu
// **** accessed by art-canvas.js *****


// Create updated menu options (for gallery link click)
const navGalleryMenu =
`<li>
<a href="#" class="nav-link px-0 align-middle" id="all-portfolios">
    <span class="ms-1 d-none d-sm-inline" style="color:#7B68EE;">Portfolios</span></a>
</li>
<li>
<a href="#" class="nav-link px-0 align-middle" id="all-artworks">
    <span class="ms-1 d-none d-sm-inline" style="color:#7B68EE;">Artworks</span></a>
</li>
<br>
 <li>
<div class="input-group input-group-sm mb-3">
    <input type="search" id="search-portfolios-input" class="form-control rounded" placeholder="Portfolio title" aria-label="Search" aria-describedby="search-addon" />
    <button type="button" id="search-portfolios-btn" class="btn btn-outline-primary" style="color:#7B68EE; border-color:#7B68EE">search</button>
</div>
</li>

<li>
<div class="input-group input-group-sm mb-3">
    <input type="search" id="search-artworks-input" class="form-control rounded" placeholder="Artwork title" aria-label="Search" aria-describedby="search-addon" />
    <button type="button" id="search-artworks-btn" class="btn btn-outline-primary" style="color:#7B68EE; border-color:#7B68EE;">search</button>
</div> 
<br>
<hr>`;