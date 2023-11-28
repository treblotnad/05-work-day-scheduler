//changes how many hour blocks based on how long of a day is specified
const dayLength = 9;
//jquery wrapped to make sure all elements display before running stuff
$(function () {
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));
  renderCalendar();
  $("button").click(saveAgenda);
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
  var index = $(this).parent().attr("id").slice(-1);
  var agenda = $("#hour-" + index)
    .children("textarea")
    .val();
  if (agenda == "") {
    return;
  }
  localStorage.setItem(index, agenda);
}
