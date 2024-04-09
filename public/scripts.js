const cardList = [
    {
        title: "Aston Martin",
        image: "images/aston_martin.jpeg",
        link: "About Car 1",
        description: "Demo description about Car 1"
    },
    {
        title: "Porche",
        image: "images/ferarri.jpeg",
        link: "About Car 2",
        description: "Demo description about Car 2"
    },
    {
        title: "Ferarri",
        image: "images/porche.jpeg",
        link: "About Car 3",
        description: "Demo description about Car 3"
    }
];

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

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.color = $('#Color').val();
    formData.path = $('#Path').val();
    formData.description = $('#Description').val();
    console.log("Form Data Submitted: ", formData);
};

$('#clickMeButton').click(function() {
    $('#formSection').toggle(); // Toggle the visibility of the form
});

$(document).ready(function () {
    $('.modal').modal(); // Initialize modal
});


$('#carForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    $('#modalForm').modal('close'); // Close the modal
    
    // Call your function to handle form submission
    submitForm();
});

const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    });
};

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    addCards(cardList);
    $('.modal').modal();
});
