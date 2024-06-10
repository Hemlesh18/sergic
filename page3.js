<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

console.log("Hello");

$(document).ready(function () {
  let selectedData = {};
  if (localStorage.getItem("propertyData") != null) {
    propertyData = JSON.parse(localStorage.getItem("propertyData"));
    $('#lp-pom-form-126 input[id="prénom"]').val(propertyData.firstName);
    $('#lp-pom-form-126 input[id="nom"]').val(propertyData.lastName);
    $('#lp-pom-form-126 input[id="email"]').val(propertyData.email);
    $('#lp-pom-form-126 input[id="numéro_de_téléphone"]').val(
      propertyData.mobilePhoneNumber
    );
  } else {
    localStorage.setItem("propertyData", JSON.stringify(propertyData));
  }

  $("#lp-pom-button-127").click(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = {
      firstName: String($('#lp-pom-form-126 input[name="prénom"]')?.val()),
      lastName: String($('#lp-pom-form-126 input[id="nom"]')?.val()),
      email: String($('#lp-pom-form-126 input[id="email"]')?.val()),
      mobilePhoneNumber: $(
        '#lp-pom-form-126 input[id="numéro_de_téléphone"]'
      )?.val(),
    };

    console.log(JSON.stringify(formData));

    var propertyData = JSON.parse(localStorage.getItem("propertyData"));

    propertyData.firstName = formData.firstName;

    propertyData.lastName = formData.lastName;
    propertyData.email = formData.email;
    propertyData.mobilePhoneNumber = formData.mobilePhoneNumber;

    localStorage.setItem("propertyData", JSON.stringify(propertyData));
    console.log("LocalStorage updated with new lat and lng.");
    console.log(localStorage.getItem("propertyData"));

    const sendToMake = propertyData;

    // Send data to another API
    $.ajax({
      type: "POST",
      url: "https://hook.eu2.make.com/jbrw6njnlogf7ses3m5847qfqiqk29a9",
      contentType: "application/json",
      data: JSON.stringify(sendToMake),
      success: function (result) {
        console.log("Data successfully sent to another API.");
        console.log(result);

        let estimationResponse = result;
        localStorage.setItem("estimation", estimationResponse);
        console.log(localStorage.getItem("estimation"));
        window.location.href = "https://lp.sergic.com/nile-test-lp-4/";
      },
      error: function (error) {
        console.log("An error occurred:");
        console.log(error);
      },
    });
  });

  $(".buttons button").click(function () {
    window.location.href = "https://lp.sergic.com/nile-test-lp-2/"; // Replace with your desired URL
  });
});
