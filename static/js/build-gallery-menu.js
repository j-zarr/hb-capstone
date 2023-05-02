'use strict'

//html elements to dynamically add to gallery-menu when "gallery" clicked in main user menu
// **** accessed by art-canvas.js *****


// Create updated menu options (for gallery link click)
const navGalleryMenu =
`
<br><br>
<div>
    <li>
        <a href="#" class="nav-link px-0 align-middle" id="all-portfolios" 
                        style="color:rgba(255,255,255,0.8); 
                        border: 1px solid;
                        text-align: center;
                        margin-bottom:20px;
                        margin-top:20px;">
            <span class="ms-1 d-none d-sm-inline";">Portfolios</span></a>
    </li>
       
    <li>
        <a href="#" class="nav-link px-0 align-middle" id="all-artworks" 
                        style="color:rgba(255,255,255,0.8);
                        border: 1px solid;
                        text-align: center;
                        margin-bottom:20px;
                        margin-top:20px;">
            <span class="ms-1 d-none d-sm-inline";">Artworks</span></a>
    </li>
   

</div>

<br><br>

<div>

    <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-portfolios-input" class="form-control rounded" placeholder="Search portfolios" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" id="search-portfolios-btn" class="btn btn-outline-light"
                                style="color:rgba(255,255,255,0.8);
                                border: 1px solid;">
                                <i class="bi bi-search"></i></button>
        </div>
    </li>
        
    <li>
        <div class="input-group input-group-sm mb-3">
            <input type="search" id="search-artworks-input" class="form-control rounded" placeholder="Search artworks" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" id="search-artworks-btn" class="btn btn-outline-light" 
                                style="color:rgba(255,255,255,0.8);
                                border: 1px solid;">
                                <i class="bi bi-search"></i></button>
        </div> 
    </li>

</div>`;

