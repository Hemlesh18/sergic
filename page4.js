<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

let estimation = JSON.parse(localStorage.getItem("estimation"));

$(document).ready(function () {
  if (estimation != null) {
    showEstimation();
  } else {
    window.location.href = "https://lp.sergic.com/nile-test-lp/";
  }
});

const showEstimation = () => {
  var finalData = {
    estimation: "",
    percentiles: "",
    reliability: "",
  };

  finalData["estimation"] = estimation["estimation"]["value"];
  finalData["percentiles"] =
    estimation["estimation"]["percentiles"]["25.0"].toFixed(2) +
    " - " +
    estimation["estimation"]["percentiles"]["75.0"].toFixed(2);
  finalData["reliability"] = estimation["reliability"]["score"];

  $("#estimation").html(finalData["estimation"]);
  $("#percentiles").html(finalData["percentiles"]);
  $("#reliability").html(finalData["reliability"]);
  console.log("Done");
  console.log(finalData);
  localStorage.clear();
};

$(document).on("click", "#lp-pom-button-308", function () {
  window.location.href = "https://lp.sergic.com/nile-test-lp/";
});
