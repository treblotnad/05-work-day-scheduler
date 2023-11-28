const dayLength = 9;
$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  renderCalendar();
  $("button").click(function () {
    var index = $(this).parent().attr("id").slice(-1);
    var agenda = $("#hour-" + index)
      .children("textarea")
      .val();
    console.log(agenda);
    localStorage.setItem(index, agenda);
  });
});
//function that creates hour blocks and formats content to display correctly
function renderCalendar() {
  for (let i = 0; i < dayLength; i++) {
    var storedText = localStorage.getItem(i) || "";
    var hour = i + dayLength;
    var hourStatus = "past";
    if (dayjs().hour() > hour) {
      hourStatus = "future";
    }
    if (dayjs().hour() == hour) {
      hourStatus = "present";
    }
    var hourToBeAdded = $("<div>")
      .attr("id", "hour-" + i)
      .addClass("row time-block " + hourStatus);

    hourToBeAdded.append(
      $("<div>" + dayjs().hour(hour).format("hA") + "</div>").addClass(
        "col-2 col-md-1 hour text-center py-3"
      )
    );
    hourToBeAdded.append(
      $("<textarea>" + storedText + "</textarea>")
        .attr("rows", "3")
        .addClass("col-8 col-md-10 description")
    );
    hourToBeAdded.append(
      $("<button>")
        .attr("aria-label", "save")
        .addClass("btn saveBtn col-2 col-md-1")
        .append($("<i>").attr("aria-hidden", "true").addClass("fas fa-save"))
    );
    $("#schedule").append(hourToBeAdded);
  }
}
//function that saves content to local storage based on index of clicked button
function saveAgenda() {
  console.log("test");

  var index = $(this).parent().attr("id").slice(-1);
  var agenda = $("#hour-" + index)
    .children("textarea")
    .text();
  localStorage.setItem(index, agenda);
}
