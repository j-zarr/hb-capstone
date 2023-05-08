'use strict';

// function definitions called by activateBtnClick from art-canvas.js
// functions for fetching to server to save artwork to database


// helper function for error messages for validateForm
function displayErrorMessage(errorMessage) {
    $('.coloring-options').after(
        `<div id="error-message" class="alert alert-danger alert-dismissible fade show" role="alert">
            ${errorMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    );
}


// helper function to validate form
function validateForm() {

    //Checks before submitting to server

    //1. Title is not "0"  --> would be overriden with no value on update portfolio from gallery
    if ($('#artwork-title').val() === '0'){
        displayErrorMessage('Cannot use "0" for title');
        return false;
    }

    //2. Create error message if both portfolio fields filled out and return
    if ($('#portfolio-title').val()
        && $('#new-portfolio-title').val()) {
        displayErrorMessage('Choose only one - a portfolio from the dropdown or a new portfolio!');
        return false;
    }
    // 3.Create error message if neither portfolio fields filled out and return
    else if (!$('#portfolio-title').val()
        && !$('#new-portfolio-title').val()) {
        displayErrorMessage('Choose a portfolio to add your artwork to!');
        return false;
    }
    //4. Create error message if user attempting to create a portfolio title that already exits
    else if ($('#new-portfolio-title').val()) {
        const portfolioOptions = [...document.querySelectorAll('.portfolio-options')].map((opt) => opt.value)
       
        for (const title of portfolioOptions) {
            if ($('#new-portfolio-title').val().toLowerCase() == title.toLowerCase()) {
                displayErrorMessage(`Portfolio with title ${$('#new-portfolio-title').val()} already exits!
                                    Select the portfolio from the dropdown 
                                    or create a new portfolio with a unique title.`);
                return false;
            }
        }
    }
    return true;
}


function submitSaveForm(canvas) {

    // check if form valid
    if(!validateForm()){
        return;
    }


    // Set data to send in request body
    const formInputData = {
        //artwork title or "untitled"
        "artwork-title": ($('#artwork-title').val() != '') ? $('#artwork-title').val() : 'untitled',
        //canvas as dataURL with png format
        "artwork-dataURL": canvas.toDataURL({format: 'png'}),
    }

    // Add chosen existing portfolio title (+ portfolio id) or the new portfolio title to send to the server
    if ($('#portfolio-title').val()) {
        formInputData['portfolio-title'] = $('#portfolio-title').val();
        formInputData['portfolio-id'] = $('#portfolio-title')
                                            .children(':selected')
                                            .attr('id');

    } else if ($('#new-portfolio-title').val()) {
        formInputData['new-portfolio-title'] = $('#new-portfolio-title').val();
    }

   
    fetch('/api/save-artwork', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputData),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('save-form').reset();
            $('.coloring-options').after(
                `<div id="message" class="alert alert-success" role="alert"> ${data.message} </div>`);
            setTimeout(() => {
                $('#message').remove();
                //reload create page 
                $('#create-link').prop('disabled', false);

                $('#create-link').click(); //reload canvas

                // Reset selectedColor, selectedOpacity, selectedWidth to default values 
                selectedColor =  "#4c00ff";
                selectedOpacity = 1;
                selectedWidth = 10;
            }, 1500);

            //reset portfolio options -- needed if new portfolio created 
            portfolios_arr = [];
            userPortfolios();//resets portfolios_arr // fn def in artwork-card.js
        });

}