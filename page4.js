<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>;

console.log("Hello");

$(document).ready(function () {
  if (localStorage.getItem("estimation") != null) {
    var estimation = JSON.parse(localStorage.getItem("estimation"));
    console.log(estimation);
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
  }

  console.log("After Done");

  $("#lp-pom-button-308").click(function () {
    localStorage.clear();
    console.log("LocalStorage cleared.");
  });
});
