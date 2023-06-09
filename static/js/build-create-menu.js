'use strict'

//html elements to dynamically add to create-menu when "create" clicked in main user menu
// **** accessed by art-canvas.js *****


// Create updated menu options (for create link click)
const navCreateMenu =
`
<br>
<br>
<li>
    <div class="px-0 align-middle">
        <span class="ms-1 d-none d-sm-inline canvas-modify-option"> White Canvas 
            <input type="checkbox" value="" id="set-canvas-bg" class="form-check-input custom-checkbox">
        </span>
    </div>
</li>

<br>

<li>
    <a href="#" class="nav-link px-0 align-middle  canvas-modify-option" id="clear">
    <span class="ms-1 d-none d-sm-inline canvas-modify-option">Clear</span></a>
</li>
<li>
    <a href="#" class="nav-link px-0 align-middle  canvas-modify-option" id="restore">
    <span class="ms-1 d-none d-sm-inline canvas-modify-option">Restore</span></a>
</li>

<li>
    <div class="dropdown nav-link px-0 align-middle">
     <a href="#" class="d-flex align-items-center align-middle text-decoration-none dropdown-toggle canvas-modify-option" 
            id="dropdown-save" data-bs-toggle="dropdown" aria-expanded="false">
     <span class="ms-1 d-none d-sm-inline  canvas-modify-option">Save</span></a>

     <form action="/api/save-artwork" method="post" id="save-form">
        <ul class="dropdown-menu" aria-labelledby="dropdown-save">
            
            
                <li style="margin: 20px">
                    <label for="artwork-title">Artwork title: </label>
                    <input type="text" name="artwork-title" id="artwork-title" placeholder="untitled" minlength="1" maxlength="75">
                </li>
                <li style="margin: 20px">
                    <label for="portfolio-title">Choose your portfolio: </label>
                    <select name="porfolios" id="portfolio-title">
                        <option class="options" value="">--Choose an option--</option>
                    </select>
                </li>
                <li style="margin: 20px">
                     <label for="new-portfolio-title">Create a new portfolio: </label>
                    <input type="text" name="new-portfolio-title" id="new-portfolio-title" minlength="1" maxlength="75">
                </li>

                <li>
                    <hr class="dropdown-divider">
                </li>
                <li style=" display: flex; justify-content: center; align-items: center;">
                    <input type="submit"  value="submit" class="btn btn-outline-light" id="submit-save">                                             
                </li>
          
            </ul>
        </form>

    </div>
</li> `;

