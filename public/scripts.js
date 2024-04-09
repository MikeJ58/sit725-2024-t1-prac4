const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#Image').val(); // Add image field
    formData.link = $('#Link').val(); // Add link field
    formData.description = $('#Description').val();
    
    // AJAX POST request to submit form data
    $.post('/submit-form', formData, function(response) {
        console.log("Form Data Submitted: ", formData);
        // Add the new card to the card section
        addCards([formData]);
    }).fail(function(error) {
        console.error("Error submitting form data: ", error);
    });
};

$(document).ready(function () {
    $('.modal').modal(); // Initialize modal

    $('#clickMeButton').click(function() {
        $('#formSection').toggle(); // Toggle the visibility of the form
    });

    $('#carForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        $('#modalForm').modal('close'); // Close the modal
        submitForm(); // Call the function to handle form submission
    });
});
