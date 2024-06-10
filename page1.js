<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

console.log("Hello");

$(document).ready(function () {
  let selectedData = {};
  // Define the object to save in localStorage
  let propertyData = {
    field: "PRICE",
    explain: "true",
    marketingType: "RENT",
    propertyType: "",
    furnished: "false",
    lat: "", // Y , e.g 46.24658
    lng: "", // X, e.g 5.98264
    surface: "",
    floor: "",
    constructionYear: "",
    generalState: "",
    energyConsumptionLetter: "",
    firstName: "",
    lastName: "",
    email: "",
    mobilePhoneNumber: "",
    roomCount: "",
    floorCount: "",
    balconyCount: "",
    cellarCount: "",
    parkingCount: "",
    gardenCount: "",
    address: "",
    zip: "",
    city: "",
  };

  console.log(propertyData);
  if (localStorage.getItem("propertyData") != null) {
    propertyData = JSON.parse(localStorage.getItem("propertyData"));
    $('#lp-pom-form-126 input[name="adresse"]').val(propertyData.address);
    $('#lp-pom-form-126 input[name="code_postal"]').val(propertyData.zip);
    $('#lp-pom-form-126 input[name="ville"]').val(propertyData.city);
    $("#type_de_bien_").val(propertyData.propertyType);
    $("#étage_géneralé_du_bien_").val(propertyData.generalState);
    var propertyType = propertyData.propertyType;
    if (propertyType === "APARTMENT") {
      propertyType = "Appartement";
    } else if (propertyType === "HOUSE") {
      propertyType = "Maison";
    }
    $("#type_de_bien_").val(propertyType);

    // Convert generalState values
    var generalState = propertyData.generalState;
    if (generalState === "NORMAL") {
      generalState = "À rafraîchir ";
    } else if (generalState === "VERY_GOOD") {
      generalState = "Neuf";
    } else if (generalState === "GOOD") {
      generalState = "Bon état";
    } else if (generalState === "NEW") {
      generalState = "Refait à neuf";
    }
    $("#étage_géneralé_du_bien_").val(generalState);
  } else {
    localStorage.setItem("propertyData", JSON.stringify(propertyData));
  }

  //   }else{
  //      localStorage.setItem("propertyData", JSON.stringify(propertyData))

  //   }
  // Function to save propertyData to localStorage
  //function savePropertyData() {
  // localStorage.setItem("propertyData", JSON.stringify(propertyData));
  //}

  console.log(localStorage.getItem("propertyData"));
  $("#lp-pom-button-127").click(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var errors = false;

    var address = $('#lp-pom-form-126 input[name="adresse"]').val() || "";
    var zip = $('#lp-pom-form-126 input[name="code_postal"]').val() || "";
    var city = $('#lp-pom-form-126 input[name="ville"]').val() || "";
    var propType = $("#type_de_bien_").val() || "";
    var generalState = $("#étage_géneralé_du_bien_").val() || "";

    //    if(address.length <= 0){
    //      $('#lp-pom-form-126 input[name="adresse"]').css('border', '1px solid red');
    //     errors = true
    //    }
    //  if(zip.length <= 0){
    //      $('#lp-pom-form-126 input[name="code_postal"]').css('border', '1px solid red');
    //     errors = true
    //   }
    // if(city.length <= 0){
    //      $('#lp-pom-form-126 input[name="ville"]').css('border', '1px solid red');
    //     errors = true
    //    }
    //if(propType.length <= 0){
    //     $("#type_de_bien_").css('border', '1px solid red');
    //     errors = true
    //   }
    //if(generalState.length <= 0){
    //      $("#étage_géneralé_du_bien_").css('border', '1px solid red');
    //      errors = true
    //  }

    //  if(errors == true){
    //   alert('Please fill in required fields')
    //    return;
    //  }
    console.log($('#lp-pom-form-126 input[name="adresse"]').val());
    console.log($('#lp-pom-form-126 input[name="code_postal"]').val());
    console.log($('#lp-pom-form-126 input[name="ville"]').val());
    console.log($("#type_de_bien_").val());
    console.log($("#étage_géneralé_du_bien_").val());

    var formData = {
      Valeur: String($('#lp-pom-form-126 input[name="adresse"]').val()),
      Pays: "FR",
      Cnt: parseInt("3"),
      AvecCAdrs: true,
    };

    console.log(JSON.stringify(formData));

    $.ajax({
      type: "POST",
      url: "https://hook.eu2.make.com/jbrw6njnlogf7ses3m5847qfqiqk29a9",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        console.log("Data successfully sent to the server.");
        console.log(result);

        // Check and parse the result if necessary
        if (typeof result === "string") {
          result = JSON.parse(result);
        }

        // Create and populate the modal content
        var selectOptions = "";
        if (Array.isArray(result)) {
          result.forEach(function (item) {
            selectOptions +=
              '<option value="' + item.Id + '">' + item.Adresse + "</option>";
          });
        } else {
          console.error("Result is not an array");
        }

        var x = document.querySelector("#resultModal");
        if (x) x.remove();
        var modalContent =
          `
                    <div id="resultModal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h2>Results</h2>
                            <select id="resultSelect">` +
          selectOptions +
          `</select>
                        </div>
                    </div>
                `;

        // Insert the modal content into the placeholder
        $("body").append(modalContent);

        // Show the modal
        var modal = $("#resultModal");
        modal.show();

        // Close the modal when the close button is clicked
        $(".close").click(function () {
          modal.hide();
        });

        // Close the modal when the user clicks outside of it
        $(window).click(function (event) {
          if (event.target == modal[0]) {
            modal.hide();
          }
        });

        // Listen for changes on the select element
        $("#resultSelect").change(function () {
          // Get the selected option
          var selectedOption = $(this).children("option:selected");
          // Extract data from the selected option
          var id = selectedOption.val();
          var address = selectedOption.text();
          // Split the address into components
          var addressComponents = address.split(", ");
          var code_postal = address.match(/\d{5}/)[0]; // Extract the first 5-digit number
          var ville = addressComponents.pop().replace(/\d+/g, ""); // Remove all numbers from ville
          var newObject = {
            Id: id,
            adresse: addressComponents.join(", "),
            code_postal: code_postal,
            ville: ville,
          };
          // Update the form with the new object data
          $('#lp-pom-form-126 input[name="adresse"]').val(newObject.adresse);
          $('#lp-pom-form-126 input[name="code_postal"]').val(
            newObject.code_postal
          );
          $('#lp-pom-form-126 input[name="ville"]').val(newObject.ville);
          var sendData = {
            Id: id,
            adresse: address,
            zip: newObject.code_postal,
            ville: newObject.ville,
          };

          // Close the modal after selecting an address
          modal.hide();

          // Save the selected data for later use
          selectedData = sendData;

          // Show the send button and hide the search button
          $("#lp-pom-button-127").hide();
          $("#newButton").show();
        });

        // Listen for changes in the form fields
        $("#lp-pom-form-126 input").on("input", function () {
          // Show the search button and hide the send button if fields are changed
          $("#lp-pom-button-127").show();
          $("#newButton").hide();
        });
      },
      error: function (error) {
        console.log("An error occurred:");
        console.log(error);
      },
    });
  });

  // Attach click event listener to the new button
  $("#newButton").click(function (e) {
    // Use the selected data from the previous selection
    var dataToSend = selectedData;

    // Send data to another API - change to redirect to page 2
    $.ajax({
      type: "POST",
      url: "https://hook.eu2.make.com/jbrw6njnlogf7ses3m5847qfqiqk29a9",
      contentType: "application/json",
      data: JSON.stringify(dataToSend),
      success: function (response) {
        console.log("Data successfully sent to another API.");
        console.log(response);

        // Parse the response and update localStorage
        if (1 === 1) {
          var res = JSON.parse(response); // Assuming the first object is what we need
          console.log(res);
          var resultData = res[0];
          var propertyData = JSON.parse(localStorage.getItem("propertyData"));
          var propertyType = String($("#type_de_bien_").val());
          if (propertyType === "Appartement") {
            propertyType = "APARTMENT";
          }
          if (propertyType === "Maison") {
            propertyType = "HOUSE";
          }
          var generalState = String($("#étage_géneralé_du_bien_").val());
          if (generalState === "À rafraîchir") {
            generalState = "NORMAL";
          } else if (generalState === "Neuf") {
            generalState = "VERY_GOOD";
          } else if (generalState === "Bon état") {
            generalState = "GOOD";
          } else if (generalState === "Refait à neuf") {
            generalState = "NEW";
          }

          // Update the propertyData object
          propertyData.lat = resultData.Y;
          propertyData.lng = resultData.X;

          console.log(resultData);

          propertyData.propertyType = propertyType;
          propertyData.address = dataToSend.adresse;
          propertyData.zip = dataToSend.zip;
          propertyData.city = dataToSend.ville;
          propertyData.generalState = generalState;

          // Save the updated object back to localStorage
          localStorage.setItem("propertyData", JSON.stringify(propertyData));
          console.log("LocalStorage updated with new lat and lng.");
          console.log(localStorage.getItem("propertyData"));
          window.location.href = "https://lp.sergic.com/nile-test-lp-2/";
        }
      },
      error: function (error) {
        console.log("An error occurred:");
        console.log(error);
      },
    });
  });

  // Initialize by hiding the new button
  $("#newButton").hide();
});
