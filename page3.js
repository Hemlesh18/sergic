<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

let propertyData = JSON.parse(localStorage.getItem("propertyData"));
const apiURL = `https://hook.eu2.make.com/jbrw6njnlogf7ses3m5847qfqiqk29a9`;

$(document).ready(function () {
  if (propertyData != null) {
    populateForm();
  } else {
    window.location.href = "https://lp.sergic.com/nile-test-lp/";
  }
});

const populateForm = () => {
  $('#lp-pom-form-126 input[id="prénom"]').val(propertyData.firstName);
  $('#lp-pom-form-126 input[id="nom"]').val(propertyData.lastName);
  $('#lp-pom-form-126 input[id="email"]').val(propertyData.email);
  $('#lp-pom-form-126 input[id="numéro_de_téléphone"]').val(
    propertyData.mobilePhoneNumber
  );
};

$(document).on("submit", "#lp-pom-form-126 form", function (event) {
  propertyData.firstName = $('#lp-pom-form-126 input[name="prénom"]').val();
  propertyData.lastName = $('#lp-pom-form-126 input[id="nom"]').val();
  propertyData.email = $('#lp-pom-form-126 input[id="email"]').val();
  propertyData.mobilePhoneNumber = $(
    '#lp-pom-form-126 input[id="numéro_de_téléphone"]'
  ).val();

  if (propertyData.propertyType === "Appartement") {
    propertyData.propertyType = "APARTMENT";
  } else if (propertyData.propertyType === "Maison") {
    propertyData.propertyType = "HOUSE";
  }

  if (propertyData.generalState === "À rafraîchir") {
    propertyData.generalState = "NORMAL";
  } else if (propertyData.generalState === "Neuf") {
    propertyData.generalState = "VERY_GOOD";
  } else if (propertyData.generalState === "Bon état") {
    propertyData.generalState = "GOOD";
  } else if (propertyData.generalState === "Refait à neuf") {
    propertyData.generalState = "NEW";
  }

  event.preventDefault();

  localStorage.setItem("propertyData", JSON.stringify(propertyData));
  console.log("LocalStorage updated with new lat and lng.");
  console.log(localStorage.getItem("propertyData"));

  $.ajax({
    type: "POST",
    url: apiURL,
    contentType: "application/json",
    data: JSON.stringify(propertyData),
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

$(document).on("click", ".buttons button", function () {
  window.location.href = "https://lp.sergic.com/nile-test-lp-2/"; // Replace with your desired URL
});
