<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

$(document).ready(function () {
  console.log(localStorage.getItem("propertyData"));
  const listenForm = () => {
    console.log("loaded");

    // Check if propertyData exists in localStorage
    let propertyData = JSON.parse(localStorage.getItem("propertyData")) || {};

    // Initialize form fields with propertyData if it exists
    if (propertyData) {
      document.querySelector('input[name="surface"]').value =
        propertyData.surface || "";
      document.querySelector('input[name="etage"]').value =
        propertyData.floor || "";
      document.querySelector('input[name="annee"]').value =
        propertyData.constructionYear || "";
      document.querySelector("#dpe").value =
        propertyData.energyConsumptionLetter || "";
      document.querySelector('input[name="pieces"]').value =
        propertyData.floorCount || "";
      document.querySelector('input[name="balcon-switch"]').checked =
        propertyData.balconyCount === "1";
      document.querySelector('input[name="jardin-switch"]').checked =
        propertyData.gardenCount === "1";
      document.querySelector('input[name="cave-switch"]').checked =
        propertyData.cellarCount === "1";
      document.querySelector('input[name="parking-switch"]').checked =
        propertyData.parkingCount === "1";
    }

    const form = document.querySelector("#propertyData");
    console.log(form);
    console.log(localStorage.getItem("propertyData"));

    // Add event listener on form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission

      let propertyData = {
        surface: document.querySelector('input[name="surface"]')?.value,
        floor: document.querySelector('input[name="etage"]')?.value,
        constructionYear: document.querySelector('input[name="annee"]')?.value,
        energyConsumptionLetter: document.querySelector("#dpe").value,
        floorCount: document.querySelector('input[name="pieces"]')?.value,
        balconyCount: document.querySelector('input[name="balcon-switch"]')
          ?.checked
          ? "1"
          : "0",
        gardenCount: document.querySelector('input[name="jardin-switch"]')
          ?.checked
          ? "1"
          : "0",
        cellarCount: document.querySelector('input[name="cave-switch"]')
          ?.checked
          ? "1"
          : "0",
        parkingCount: document.querySelector('input[name="parking-switch"]')
          ?.checked
          ? "1"
          : "0",
        roomCount: document.querySelector('input[name="pieces"]')?.value,
      };

      console.log(propertyData);
      localStorage.setItem("propertyData", JSON.stringify(propertyData));
      console.log(localStorage.getItem("propertyData"));

      window.location.href = "https://lp.sergic.com/nile-test-lp-3";
    });
  };

  // Handle "Précédent" button click
  document
    .querySelector('button[type="button"]')
    .addEventListener("click", () => {
      window.location.href = "https://lp.sergic.com/nile-test-lp";
    });

  // Call the function when the page loads
  listenForm();
});
