'use strict';

//html elements to dynamically add to main page body when "gallery" clicked in main user menu
// **** accessed by art-canvas.js *****

const galleryHTML = {

    galleryWall: `<div class="parallax"> </div>`,

    cardContainer:
        
      
        // `<div class="parallax">
       ` <div class="cardsContainer" style="text-align: center; padding: 50px 50px 50px 250px;">
                
            <div id="card-to-add"> </div>
                
        </div>`,

       // </div>`,


    portfolioCard:
        `<div class="card" id="added-card" style="
                margin: 25px;
                display: inline-block;
                width: 300px; 
                height: 250px;
                background-color: rgba(0,0,0, 0.8);
                border-radius: 10px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.9);
                border: 2px solid rgba(7, 7, 7, 0.12);
                font-size: 16px;   
                cursor: pointer;">
 <br>
 <h5>
     <a href="#" id="p-artworks" style="text-decoration:none; 
                                 color:rgb(38, 151, 226); 
                                 border: 1px solid rgb(38, 151, 226);
                                 border-radius: 15px;
                                 padding: 5px;
                                 text-align: center;
                                 font-family: Bradley Hand, cursive;"> 
         
     </a>
 </h5>
 <br>

 <div class="card-options">
     <a href="#" class="d-flex align-items-center align-middle text-decoration-none dropdown-toggle"
         data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-update" style="color: white; 
             justify-content:center;">
         <span class="ms-1 d-none d-sm-inline" style="color: white;">UPDATE</span></a>
     <ul class="dropdown-menu" aria-labelledby="dropdown-update" style="border: none; 
                 text-align:center; 
                 width:100%;
                 background-color:rgba(0,0,0, 0.5);">
         <form action="/api/update-portfolio-title" method="post" id="update-portfolio-form">

             <li>
                 <input type="text" placeholder="Update title" name="update-p-title" id="update-p-title"
                     minlength="1" maxlength="75">
                     <span>
                     <input type="submit" value="SAVE" id="submit-portfolio-update">
                 </span>    
             </li>
         </form>

            <li>
                 <input type="button" value="DELETE PORTFOLIO" id="delete-portfolio">
             </li>
     </ul>
 </div>

</div>`,

    artworkCard:
        `
         <div class="card" id="added-card" style="
                    margin: 25px 25px 125px 25px;
                    display: inline-block;
                    width: 250px; 
                    height: 300px;
                    background-color:transparent;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.7);
                    border: 2px solid rgba(7, 7, 7, 0.12);
                    font-size: 14px;">
                    
            <div id="card-img" style="height:300px;"></div>

            
            <div id=artwork-info>
                <div class="card-options dropup">           
                            <a href="#" class="d-flex align-items-center align-middle text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-update" 
                                    style="color: #404040; font-size:25px; justify-content:center;">  </a>
                                <span style="margin-right: 5px;"> TITLE: </SPAN><h5 id="current-title"> </h5> <br>
                                <span style="margin-right: 5px;"> PORTFOLIO: </span>  <h6 id="current-portfolio"> </h6>
                              
                              
                        
                    <ul class="dropdown-menu" aria-labelledby="dropdown-update">
                            
                         <form action="/api/update-artwork" method="post" id="update-artwork-form">

                            <li>
                                <input type="text" placeholder="Update title" name="update-a-title" id="update-a-title" minlength="1" maxlength="75">
                            </li>
                            <li>
                                 <select name="update-p-title" id="update-p-title" class="p-options">
                                     <option id="options-placeholder" value="">--Update portfolio--</option>
                                </select>
                             </li>
                             <li>
                                <input type="text" placeholder="New portfolio" name="update-new-p-title" id="update-new-p-title" minlength="1"
                                        maxlength="75">
                            </li>
                            <br><br>
                            <li>
                                <button aria-labelledby="DELETE ARTWORK" id="delete-artwork">DELETE</button>
                            </li>
                            <br>
                            <li>
                                 <button type="submit" value="SAVE"  id="submit-artwork-update"><i class="bi bi-check-circle"></i></button>
                            </li>

                        </form>
                    </ul> 
                 </div>
                 
                 </div>

                </div>
                      
        </div> `


}