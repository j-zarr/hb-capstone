'use strict';

// function definitions called by activateBtnClick from art-canvas.js
// functions for fetching to server to save artwork to database


{/* <div id="flash-msg" class="alert alert-dark alert-dismissible fade show" role="alert">
{{ msg }}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> */}


// helper function for error messages for validateForm
function displayErrorMessage(errorMessage) {
    $('#save-form').append(
        `<div id="error-message" class="alert alert-danger alert-dismissible fade show" role="alert">
            ${errorMessage}
        </div>`
    );
    setTimeout(() => {
        $('#error-message').remove();
    }, 2000);
}


// helper function to validate form
function validateForm() {

    //Checks before submitting to server
    //1. Create error message if both portfolio fields filled out and return
    if ($('#portfolio-title').val()
        && $('#new-portfolio-title').val()) {
        displayErrorMessage('Choose only one - a portfolio from the dropdown or a new portfolio!');
        return;
    }
    // 2.Create error message if neither portfolio fields filled out and return
    else if (!$('#portfolio-title').val()
        && !$('#new-portfolio-title').val()) {
        displayErrorMessage('Choose a portfolio to add your artwork to!');
        return;
    }
    //3. Create error message if user attempting to create a portfolio title that already exits
    else if ($('#new-portfolio-title').val()) {
        const portfolioOptions = [...document.querySelectorAll('.portfolio-options')].map((o) => o.value)
        console.log(portfolioOptions)
        for (const title of portfolioOptions) {
            if ($('#new-portfolio-title').val().toLowerCase() == title.toLowerCase()) {
                displayErrorMessage(`Portfolio with title ${$('#new-portfolio-title').val()} already exits!
                                    Select the portfolio from the dropdown 
                                    or create a new portfolio with a unique title.`);
                return;
            }
        }
    }

}


function submitSaveForm(canvas) {

    validateForm()

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
            document.getElementById('save-form').reset()
            $('#save-form').append(
                `<div id="message" class="alert alert-success" role="alert"> ${data.message} </div>`)
            setTimeout(() => {
                $('#message').remove();
                //reload create page 
                $('#create-link').prop('disabled', false);
                $('#create-link').click()
            }, 3000);
        });
}