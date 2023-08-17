// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  $(".time-block").on( "click", function(event) {
    
    event.preventDefault();
    // console.log(event.target);
    // console.log(event.currentTarget);

    var timeBlockEl = event.currentTarget;
    var hour = Number(timeBlockEl.getAttribute("id").at(5));

    if (hour!=9) {
      hour = Number(hour)*10+Number(timeBlockEl.getAttribute("id").at(6));
      console.log(hour);
    }

    var taskText = timeBlockEl.children[1].value;
    console.log(taskText);

    var taskLine = {
      hour: hour,
      taskText: taskText,
    };

    localStorage.setItem("taskLines", JSON.stringify(taskLine));
    
    // Number(hour.at(6));
    // $("hou-11").children[1].value;
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //
  // TODO: Add code to display the current date in the header of the page.
  //
  setInterval(function () {

    var today = dayjs();
    switch (dayjs().date()) {

      case 1:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      case 2:
        $('#currentDay').text(today.format('dddd, MMMM D[nd], YYYY'));
      case 3:
        $('#currentDay').text(today.format('dddd, MMMM D[rd], YYYY'));
      case 21:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      case 22:
        $('#currentDay').text(today.format('dddd, MMMM D[nd], YYYY'));
      case 23:
        $('#currentDay').text(today.format('dddd, MMMM D[rd], YYYY'));
      case 31:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      default:
        $('#currentDay').text(today.format('dddd, MMMM D[th], YYYY'));
    }

  }, 1000);




});
