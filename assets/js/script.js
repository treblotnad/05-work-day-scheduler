const dayLength = 9;
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

  renderCalendar();
});

function renderCalendar() {
  for (let i = 0; i < dayLength; i++) {
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
      $("<textarea>").attr("rows", "3").addClass("col-8 col-md-10 description")
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
