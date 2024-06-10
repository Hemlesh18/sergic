<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

<script>
  let propertyData = JSON.parse(localStorage.getItem("propertyData"));

  $(document).ready(function () {
    console.log(JSON.stringify(propertyData));

    if (propertyData != null) {
      populateForm();
    } else {
       window.location.href = "https://lp.sergic.com/nile-test-lp/";
    }
  });


  $(document).on("click", "#previous", function(){
    window.location.href = "https://lp.sergic.com/nile-test-lp";
  });


  $(document).on("click", '.btnSubmit', function(e){
    e.preventDefault(); // Prevent the default form submission
    propertyData.surface = $('input[name="surface"]').val();
    propertyData.floor = $('input[name="etage"]').val();
    propertyData.constructionYear = $('input[name="annee"]').val();
    propertyData.energyConsumptionLetter = $("#dpe").val();
    propertyData.roomCount = $('input[name="pieces"]').val();
    propertyData.balconyCount = $('input[name="balcon-switch"]').is(":checked") ? "1" : "0";
    propertyData.gardenCount = $('input[name="jardin-switch"]').is(":checked") ? "1" : "0";
    propertyData.cellarCount = $('input[name="cave-switch"]').is(":checked") ? "1" : "0";
    propertyData.parkingCount = $('input[name="parking-switch"]').is(":checked") ? "1" : "0";
    propertyData.floorCount = $('input[name="pieces"]').val();

    console.log(propertyData);
    localStorage.setItem("propertyData", JSON.stringify(propertyData));
    console.log(JSON.parse(localStorage.getItem("propertyData")));
    window.location.href = "https://lp.sergic.com/nile-test-lp-3";
  });


  const populateForm = () => {      
    $('input[name="surface"]').val(propertyData.surface);
    $('input[name="etage"]').val(propertyData.floor);
    $('input[name="annee"]').val(propertyData.constructionYear);
    $("#dpe").val(propertyData.energyConsumptionLetter);
    $('input[name="pieces"]').val(propertyData.roomCount);
    $('input[name="etages"]').val(propertyData.floorCount);

    
    //Invert
    if ($('input[name="balcon-switch"]').is(":checked")) { propertyData.balconyCount === "1" };
    if ($('input[name="jardin-switch"]').is(":checked")) { propertyData.gardenCount === "1" };
    if ($('input[name="cave-switch"]').is(":checked")) { propertyData.cellarCount === "1" };
    if ($('input[name="parking-switch"]').is(":checked")) { propertyData.parkingCount === "1" };
  };
</script>
